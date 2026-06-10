<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'membership_id',
        'payment_gateway',
        'payment_method',
        'transaction_code',
        'amount',
        'status',
        'paid_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function membership()
    {
        return $this->belongsTo(
            Membership::class
        );
    }
}