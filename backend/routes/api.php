<?php

use App\Http\Controllers\Api\audioController;
use App\Http\Controllers\Api\authController;
use App\Http\Controllers\Api\playlistController;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Route;

Route::post('/register',[authController::class,'register'])->name("register");
Route::post('/login',[authController::class,'login'])->name("login");

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/checkAuth',[authController::class,'checkAuth'])->name("checkAuth");
    Route::post('/logout',[authController::class,'logout'])->name("logout");

    //playlists routes
    Route::post('/playlist/create',[playlistController::class,'createPlaylist'])->name('createPlaylist');
    Route::get('/playlists',[playlistController::class,'getUserPlaylists'])->name('getUserPlaylists');
    // audios routes
    Route::post('/audio/add',[audioController::class,'addAudio'])->name('addAudio');
    Route::get('/audio/{playlist_id}',[audioController::class,'getAudios'])->name('getAudios');
    Route::post('/audio/upload',[audioController::class,'uploadAudioFile'])->name('uploadAudioFile');
    Route::post('/audio/move/to/{id}',[audioController::class,'changeAudioPlaylist'])->name('move audio to playlist');
    Route::post('/audio/rename/{id}',[audioController::class,'renameAudio'])->name('rename audio');
});
