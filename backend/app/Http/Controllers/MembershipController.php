<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Models\User;
use App\Models\MembershipPlan;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            return response()->json([
                'success' => false,
                'message' => 'Anda masih memiliki membership aktif atau menunggu pembayaran'
            ], 400);
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
            'membership' => $membership,
            'transaction' => $transaction
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
            return response()->json([
                'success' => false,
                'message' => 'Membership tidak aktif'
            ]);
        }

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
}