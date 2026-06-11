<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipPlanController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AdminController;

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
Route::get(
    '/validate-qr/{token}',
    [MembershipController::class, 'validateQr']
);
Route::get(
    '/member-card/qr/{userId}',
    [MembershipController::class, 'generateQr']
);
Route::get(
    '/membership-plans/{id}',
    [MembershipPlanController::class, 'show']
);
Route::get(
    '/payment-status/{id}',
    [MembershipController::class, 'paymentStatus']
);
Route::get(
    '/payment-status/{id}',
    [MembershipController::class, 'paymentStatus']
);
Route::post(
    '/transactions/{id}/simulate-payment',
    [TransactionController::class, 'simulatePayment']
);
Route::get(
    '/transactions/pending/{userId}',
    [TransactionController::class, 'getPendingTransaction']
);
Route::post(
    '/transactions/{id}/cancel',
    [TransactionController::class, 'cancel']
);
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Tirzz Gym API Running'
    ]);
});
Route::post(
    '/admin/login',
    [AdminController::class, 'login']
);
Route::get(
    '/admin/members',
    [AdminController::class, 'members']
);
Route::get(
    '/admin/members',
    [AdminController::class, 'members']
);

Route::get(
    '/admin/members/{id}',
    [AdminController::class, 'member']
);

Route::put(
    '/admin/members/{id}',
    [AdminController::class, 'updateMember']
);

Route::delete(
    '/admin/members/{id}',
    [AdminController::class, 'deleteMember']
);

Route::get(
    '/admin/transactions',
    [AdminController::class, 'transactions']
);

Route::post(
    '/admin/membership-plans',
    [AdminController::class, 'storePlan']
);

Route::put(
    '/admin/membership-plans/{id}',
    [AdminController::class, 'updatePlan']
);

Route::delete(
    '/admin/membership-plans/{id}',
    [AdminController::class, 'deletePlan']
);
Route::post(
    '/admin/members',
    [AdminController::class, 'createMember']
);