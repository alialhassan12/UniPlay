<?php

use App\Http\Controllers\Api\audioController;
use Illuminate\Support\Facades\Route;

Route::post('/downloadAudio', [audioController::class, 'downloadAudio']);