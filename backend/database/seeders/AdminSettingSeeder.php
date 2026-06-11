<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminSetting;

class AdminSettingSeeder extends Seeder
{
    public function run(): void
    {
        AdminSetting::create([
            'admin_code' => 'TIRZZ-ADMIN-2026'
        ]);
    }
}