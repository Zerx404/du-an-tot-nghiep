<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;

Route::prefix('v1')->group(function () {
    Route::apiResource('categories', CategoryController::class);
});
Route::get('/categories-test', function () {
    return view('categories-test');
});
