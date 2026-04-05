<?php

use App\Http\Controllers\Api\audioController;
use App\Http\Controllers\Api\authController;
use App\Http\Controllers\Api\playlistController;
use Illuminate\Support\Facades\Route;

Route::post('/register',[authController::class,'register'])->name("register");
Route::post('/login',[authController::class,'login'])->name("login");

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/checkAuth',[authController::class,'checkAuth'])->name("checkAuth");
    Route::post('/downloadAudio', [audioController::class, 'downloadAudio']);
    Route::post('/logout',[authController::class,'logout'])->name("logout");

    //playlists routes
    Route::post('/playlist/create',[playlistController::class,'createPlaylist'])->name('createPlaylist');
    Route::get('/playlists',[playlistController::class,'getUserPlaylists'])->name('getUserPlaylists');
});
