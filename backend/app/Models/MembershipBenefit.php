<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipBenefit extends Model
{
    protected $table = 'membership_benefits';

    protected $fillable = [
        'membership_plan_id',
        'benefit_text'
    ];

    public function plan()
    {
        return $this->belongsTo(
            MembershipPlan::class,
            'membership_plan_id'
        );
    }
}