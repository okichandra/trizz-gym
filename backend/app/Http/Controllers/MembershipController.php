<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Models\User;
use App\Models\MembershipPlan;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\QrScanLog;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class MembershipController extends Controller
{
    public function purchase(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'membership_plan_id' => 'required|exists:membership_plans,id'
        ]);

        $existingMembership = Membership::where(
            'user_id',
            $validated['user_id']
        )
            ->whereIn('status', [
                'pending',
                'active'
            ])
            ->first();

        if ($existingMembership) {

            if ($existingMembership->status === 'active') {

                return response()->json([
                    'success' => false,
                    'type' => 'active_membership',
                    'message' => 'Membership masih aktif'
                ], 400);

            }

            if ($existingMembership->status === 'pending') {

                $transaction = Transaction::where(
                    'membership_id',
                    $existingMembership->id
                )->first();

                return response()->json([
                    'success' => false,
                    'type' => 'pending_payment',
                    'transaction_id' => $transaction->id,
                    'message' => 'Anda memiliki pembayaran yang belum selesai'
                ], 400);
            }
        }

        $plan = MembershipPlan::findOrFail(
            $validated['membership_plan_id']
        );

        $membership = Membership::create([
            'user_id' => $validated['user_id'],
            'membership_plan_id' => $plan->id,
            'status' => 'pending'
        ]);

        $transaction = Transaction::create([
            'user_id' => $validated['user_id'],
            'membership_id' => $membership->id,

            'payment_gateway' => null,
            'payment_method' => null,

            'transaction_code' =>
                'TRX-' . strtoupper(Str::random(10)),

            'amount' => $plan->sale_price,

            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction created',

            'membership_id' => $membership->id,

            'transaction' => [
                'id' => $transaction->id,
                'transaction_code' => $transaction->transaction_code,
                'amount' => $transaction->amount,
                'status' => $transaction->status
            ]
        ]);
    }

    public function activate($membershipId)
    {
        $membership = Membership::with('plan')
            ->findOrFail($membershipId);

        $membership->update([
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addDays(
                $membership->plan->duration_days
            )
        ]);

        Transaction::where(
            'membership_id',
            $membership->id
        )->update([
                    'status' => 'paid',
                    'paid_at' => now()
                ]);

        return response()->json([
            'success' => true,
            'message' => 'Membership activated'
        ]);
    }

    public function transactionHistory($userId)
    {
        $transactions = Transaction::with([
            'membership.plan'
        ])
            ->where('user_id', $userId)
            ->latest()
            ->get()
            ->map(function ($transaction) {

                return [
                    'id' => $transaction->id,

                    'transaction_code' =>
                        $transaction->transaction_code,

                    'plan_name' =>
                        $transaction->membership?->plan?->name,

                    'amount' =>
                        $transaction->amount,

                    'status' =>
                        $transaction->status,

                    'paid_at' =>
                        $transaction->paid_at,

                    'created_at' =>
                        $transaction->created_at,
                    'formatted_amount' =>
                        'Rp ' . number_format(
                            $transaction->amount,
                            0,
                            ',',
                            '.'
                        ),
                ];
            });

        return response()->json([
            'success' => true,
            'transactions' => $transactions
        ]);
    }
    public function validateQr($qrToken)
    {
        $user = User::where(
            'qr_token',
            $qrToken
        )->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'QR tidak valid'
            ], 404);
        }

        $membership = Membership::with('plan')
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->latest()
            ->first();

        if (!$membership) {
            QrScanLog::create([
                'user_id' => $user->id,
                'scanned_at' => now(),
                'status' => 'failed'
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Membership tidak aktif'
            ]);
        }

        QrScanLog::create([
            'user_id' => $user->id,
            'scanned_at' => now(),
            'status' => 'success'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Access Granted',

            'user' => [
                'full_name' => $user->full_name,
                'member_code' => $user->member_code
            ],

            'membership' => [
                'plan' => $membership->plan->name,
                'expires_at' => $membership->end_date
            ]
        ]);

    }
    public function generateQr($userId)
    {
        $user = User::findOrFail($userId);

        $qr = QrCode::size(300)
            ->backgroundColor(0, 0, 0, 0)
            ->color(163, 163, 163)
            ->style('dot')
            ->generate($user->qr_token);

        return response($qr)
            ->header('Content-Type', 'image/svg+xml');
    }
    public function paymentStatus($transactionId)
    {
        $transaction = Transaction::with(
            'membership.plan'
        )->findOrFail($transactionId);

        return response()->json([
            'success' => true,

            'transaction' => [
                'id' => $transaction->id,
                'transaction_code' => $transaction->transaction_code,
                'amount' => $transaction->amount,
                'status' => $transaction->status,
                'paid_at' => $transaction->paid_at
            ]
        ]);
    }
}