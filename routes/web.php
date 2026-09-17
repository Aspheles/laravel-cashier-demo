<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/checkout', function (Request $request) {
    $checkout = Auth::user()->newSubscription('basic');

    return $checkout->redirect();
})->name('checkout');

Route::middleware(['auth'])->group(function () {
    Route::post('subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::get('subscriptions/success', [SubscriptionController::class, 'success'])->name('subscriptions.success');
});

require __DIR__.'/settings.php';
