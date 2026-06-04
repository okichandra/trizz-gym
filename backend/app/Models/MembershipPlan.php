<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipPlan extends Model
{
    protected $table = 'membership_plans';

    protected $fillable = [
        'name',
        'original_price',
        'sale_price',
        'display_monthly_price',
        'duration_days',
        'badge',
        'description',
        'is_active'
    ];

    public function benefits()
    {
        return $this->hasMany(
            MembershipBenefit::class,
            'membership_plan_id'
        );
    }

    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }
}