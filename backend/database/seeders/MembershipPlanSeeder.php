<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MembershipPlan;
use App\Models\MembershipBenefit;

class MembershipPlanSeeder extends Seeder
{
    public function run(): void
    {
        // Bersihkan data lama
        MembershipBenefit::query()->delete();
        MembershipPlan::query()->delete();

        // Monthly
        $monthly = MembershipPlan::create([
            'name' => 'Monthly',
            'original_price' => 180000,
            'sale_price' => 180000,
            'display_monthly_price' => 180000,
            'duration_days' => 30,
            'badge' => 'Starter',
            'description' => 'Perfect for beginners',
            'is_active' => true,
        ]);

        foreach ([
            'Unlimited Gym Access',
            'Free consultation',
            'Free Drinking Water',
        ] as $benefit) {
            MembershipBenefit::create([
                'membership_plan_id' => $monthly->id,
                'benefit_text' => $benefit,
            ]);
        }

        // 3 Months
        $threeMonths = MembershipPlan::create([
            'name' => '3 Months',
            'original_price' => 540000,
            'sale_price' => 380000,
            'display_monthly_price' => 126000,
            'duration_days' => 90,
            'badge' => 'Most Popular',
            'description' => 'Best balance between price and commitment',
            'is_active' => true,
        ]);

        foreach ([
            'Unlimited Gym Access',
            'Locker Access',
            'Free consultation',
            'Free Drinking Water',
            'Workout Program',
        ] as $benefit) {
            MembershipBenefit::create([
                'membership_plan_id' => $threeMonths->id,
                'benefit_text' => $benefit,
            ]);
        }

        // Annual
        $annual = MembershipPlan::create([
            'name' => 'Annual',
            'original_price' => 2160000,
            'sale_price' => 990000,
            'display_monthly_price' => 82000,
            'duration_days' => 365,
            'badge' => 'Best Deal',
            'description' => 'Maximum savings for long-term members',
            'is_active' => true,
        ]);

        foreach ([
            'Unlimited Gym Access',
            'Locker Access',
            'Free Drinking Water',
            'Workout Program',
            'Personal Trainer Session',
            'Body Composition Check',
        ] as $benefit) {
            MembershipBenefit::create([
                'membership_plan_id' => $annual->id,
                'benefit_text' => $benefit,
            ]);
        }
    }
}