<?php

namespace App\Http\Controllers;

use App\Models\MembershipPlan;

class MembershipPlanController extends Controller
{
    public function index()
    {
        $plans = MembershipPlan::with('benefits')
            ->where('is_active', true)
            ->get();

        return response()->json($plans);
    }
}