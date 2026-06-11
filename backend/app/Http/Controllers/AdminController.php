<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminSetting;
use App\Models\User;
use App\Models\Membership;
use App\Models\Transaction;
use App\Models\MembershipPlan;
use App\Models\MembershipBenefit;
use App\Models\QrScanLog;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $setting = AdminSetting::first();

        if (
            $request->admin_code !==
            $setting->admin_code
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Admin code salah'
            ], 401);
        }

        return response()->json([
            'success' => true
        ]);
    }
    public function members()
    {
        $members = User::with([
            'memberships.plan'
        ])
            ->get();

        $data = $members->map(function ($member) {

            $membership = $member->memberships
                ->where('status', 'active')
                ->first();

            return [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'username' => $member->username,
                'email' => $member->email,
                'member_code' => $member->member_code,

                'membership_status' =>
                    $membership
                    ? 'Active'
                    : 'Inactive',

                'membership_plan' =>
                    $membership?->plan?->name
            ];
        });

        return response()->json([
            'success' => true,
            'members' => $data
        ]);
    }
    public function member($id)
    {
        $member = User::with([
            'memberships.plan'
        ])->findOrFail($id);

        return response()->json([
            'success' => true,
            'member' => $member
        ]);
    }
    public function updateMember(Request $request, $id)
    {
        $member = User::findOrFail($id);

        $member->update([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'email' => $request->email
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Member updated'
        ]);
    }
    public function deleteMember($id)
    {
        $member = User::findOrFail($id);

        // hapus scan logs
        QrScanLog::where(
            'user_id',
            $member->id
        )->delete();

        // ambil membership user
        $memberships = Membership::where(
            'user_id',
            $member->id
        )->get();

        foreach ($memberships as $membership) {

            Transaction::where(
                'membership_id',
                $membership->id
            )->delete();

            $membership->delete();
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Member deleted successfully'
        ]);
    }
    public function transactions()
    {
        $transactions = Transaction::with([
            'user',
            'membership.plan'
        ])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'transactions' => $transactions
        ]);
    }
    public function storePlan(Request $request)
    {
        $plan = MembershipPlan::create([

            'name' => $request->name,

            'original_price' =>
                $request->original_price,

            'sale_price' =>
                $request->sale_price,

            'display_monthly_price' =>
                $request->display_monthly_price,

            'duration_days' =>
                $request->duration_days,

            'badge' =>
                $request->badge,

            'description' =>
                $request->description,

            'is_active' => true
        ]);

        foreach (
            $request->benefits
            as $benefit
        ) {
            MembershipBenefit::create([
                'membership_plan_id' =>
                    $plan->id,

                'benefit_text' =>
                    $benefit
            ]);
        }

        return response()->json([
            'success' => true,
            'plan' => $plan
        ]);
    }
    public function updatePlan(
        Request $request,
        $id
    ) {
        $plan = MembershipPlan::findOrFail($id);

        $plan->update([

            'name' => $request->name,

            'original_price' =>
                $request->original_price,

            'sale_price' =>
                $request->sale_price,

            'display_monthly_price' =>
                $request->display_monthly_price,

            'duration_days' =>
                $request->duration_days,

            'badge' =>
                $request->badge,

            'description' =>
                $request->description
        ]);

        MembershipBenefit::where(
            'membership_plan_id',
            $plan->id
        )->delete();

        foreach (
            $request->benefits
            as $benefit
        ) {
            MembershipBenefit::create([
                'membership_plan_id' =>
                    $plan->id,

                'benefit_text' =>
                    $benefit
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
    public function deletePlan($id)
    {
        $used = Membership::where(
            'membership_plan_id',
            $id
        )->exists();

        if ($used) {
            return response()->json([
                'success' => false,
                'message' =>
                    'Plan sudah digunakan member'
            ], 400);
        }
        $plan = MembershipPlan::findOrFail($id);

        MembershipBenefit::where(
            'membership_plan_id',
            $plan->id
        )->delete();

        $plan->delete();

        return response()->json([
            'success' => true
        ]);
    }
}