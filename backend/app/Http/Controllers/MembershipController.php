<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Models\MembershipPlan;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            ->get();

        return response()->json([
            'success' => true,
            'transactions' => $transactions
        ]);
    }
}