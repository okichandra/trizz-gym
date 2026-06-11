<?php

namespace App\Http\Controllers;

use App\Models\MembershipPlan;
use App\Models\Transaction;

class MembershipPlanController extends Controller
{
    public function index()
    {
        $plans = MembershipPlan::with(
            'benefits'
        )->get();

        return response()->json([
            'success' => true,
            'plans' => $plans
        ]);
    }

    public function show($id)
    {
        $plan = MembershipPlan::with('benefits')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'plan' => $plan
        ]);
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