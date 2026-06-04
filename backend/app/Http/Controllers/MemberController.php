<?php

namespace App\Http\Controllers;

use App\Models\User;

class MemberController extends Controller
{
    public function memberCard($id)
    {
        $user = User::with([
            'memberships.plan'
        ])->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        $activeMembership = $user
            ->memberships()
            ->where('status', 'active')
            ->with('plan')
            ->latest()
            ->first();

        return response()->json([
            'success' => true,

            'user' => [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'member_code' => $user->member_code,
                'email' => $user->email,
            ],

            'membership' => $activeMembership
                ? [
                    'status' => 'active',
                    'plan' => $activeMembership->plan->name,
                    'expires_at' => $activeMembership->end_date,
                ]
                : [
                    'status' => 'inactive',
                    'plan' => null,
                    'expires_at' => null,
                ]
        ]);
    }
}