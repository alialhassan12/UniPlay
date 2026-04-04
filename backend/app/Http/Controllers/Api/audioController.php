<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class audioController extends Controller
{
    public function downloadAudio(Request $request){
        $request->validate([
            'url' => 'required|url',
        ]);
        $url = $request->url;
        $storage_path=storage_path('app/public/audio/%(title)s.%(ext)s');
        $command="yt-dlp -x --audio-format mp3 -o $storage_path $url";
        $output=shell_exec($command);
        return response()->json([
            'message' => 'Audio downloaded successfully',
            'audio' => $output,
        ]);
    }
}
