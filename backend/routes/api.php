<?php

use App\Http\Controllers\Api\audioController;
use App\Http\Controllers\Api\authController;
use Illuminate\Support\Facades\Route;

Route::post('/register',[authController::class,'register'])->name("register");
Route::post('/login',[authController::class,'login'])->name("login");

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/checkAuth',[authController::class,'checkAuth'])->name("checkAuth");
    Route::post('/downloadAudio', [audioController::class, 'downloadAudio']);
    Route::post('/logout',[authController::class,'logout'])->name("logout");
});
