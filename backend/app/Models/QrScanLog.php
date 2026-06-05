<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrScanLog extends Model
{
    protected $fillable = [
        'user_id',
        'scanned_at',
        'status'
    ];
}
