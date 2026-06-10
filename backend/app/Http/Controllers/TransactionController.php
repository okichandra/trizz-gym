<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Membership;

class TransactionController extends Controller
{
    public function simulatePayment($id)
    {
        $transaction = Transaction::with(
            'membership.plan'
        )->findOrFail($id);

        $transaction->update([
            'status' => 'paid',
            'paid_at' => now()
        ]);

        $membership = $transaction->membership;

        $membership->update([
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addDays(
                $membership->plan->duration_days
            )
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment simulated'
        ]);
    }
    public function getPendingTransaction($userId)
    {
        $transaction = Transaction::with(
            'membership.plan'
        )
            ->where('user_id', $userId)
            ->where('status', 'pending')
            ->latest()
            ->first();

        if (!$transaction) {
            return response()->json([
                'success' => false
            ]);
        }

        return response()->json([
            'success' => true,
            'transaction' => $transaction
        ]);
    }
    public function cancel($id)
    {
        $transaction = Transaction::findOrFail($id);

        $transaction->status = 'cancelled';
        $transaction->save();

        Membership::where(
            'id',
            $transaction->membership_id
        )->update([
                    'status' => 'cancelled'
                ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction cancelled'
        ]);
    }
}