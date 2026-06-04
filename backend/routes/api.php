<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipPlanController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MembershipController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get(
    '/membership-plans',
    [MembershipPlanController::class, 'index']
);
Route::get(
    '/member-card/{id}',
    [MemberController::class, 'memberCard']
);
Route::post(
    '/purchase-membership',
    [MembershipController::class, 'purchase']
);
Route::post(
    '/memberships/{id}/activate',
    [MembershipController::class, 'activate']
);
Route::get(
    '/transactions/{userId}',
    [MembershipController::class, 'transactionHistory']
);