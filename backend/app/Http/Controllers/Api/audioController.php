<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Audios;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class audioController extends Controller
{
    public function addAudio(Request $request)
    {
        set_time_limit(300); // 5 minutes
        $request->validate([
            "playlist_id" => 'required|exists:playlists,id',
            "title" => 'required|string',
            "duration" => 'nullable|integer',
            "audio_url" => 'required|url',
        ]);

        $url = $request->audio_url;
        $uniqueId = uniqid('audio_');
        $folder = 'app/public/audio';
        
        // Ensure the directory exists
        if (!file_exists(storage_path($folder))) {
            mkdir(storage_path($folder), 0777, true);
        }

        // Use a unique name to easily find the file later
        $storage_path_template = storage_path($folder . '/' . $uniqueId . '.%(ext)s');
        
        $escapedUrl = escapeshellarg($url);
        $command = "yt-dlp --js-runtimes node -f bestaudio -o \"$storage_path_template\" $escapedUrl 2>&1";
        
        $output = [];
        $returnCode = 0;
        exec($command, $output, $returnCode);

        // Find the downloaded file (it might have different extensions like .webm, .m4a)
        $files = glob(storage_path($folder . '/' . $uniqueId . '.*'));
        
        if (empty($files) || $returnCode !== 0) {
            $errorOutput = implode("\n", $output);
            Log::error("yt-dlp download failed. Return code: $returnCode. Output: $errorOutput");
            
            return response()->json([
                'message' => 'Failed to download audio. Please check the URL or try again later.',
                'debug' => config('app.debug') ? $errorOutput : null,
            ], 500);
        }

        $latestFile = $files[0];

        // upload to cloudinary
        $cloudinary = new CloudinaryService();
        $audio_url = $cloudinary->uploadAudio($latestFile);

        unlink($latestFile);

        if (!$audio_url) {
            return response()->json([
                'message' => 'Failed to upload audio to Cloudinary storage.',
            ], 500);
        }

        // save to database only if upload succeeded
        $audio = Audios::create([
            'playlist_id' => $request->playlist_id,
            'title' => $request->title,
            'duration' => $request->duration ?? 0,
            'audio_url' => $audio_url,
        ]);

        return response()->json([
            'message' => 'Audio added successfully',
            'audio' => $audio,
        ]);
    }

    public function getAudios($playlist_id){
        $audios=Audios::where('playlist_id',$playlist_id)->get();
        return response()->json([
            'audios'=>$audios
        ]);
    }

    public function uploadAudioFile(Request $request){
        $request->validate([
            "playlist_id" => 'required|exists:playlists,id',
            "title" => 'required|string',
            "duration" => 'nullable|integer',
            "audio_file"=>'required|file|mimes:mp3,wav,m4a,aac,ogg,flac,webm'
        ]);
        // upload to cloudinary
        $cloudinary=new CloudinaryService();
        $audio_url=$cloudinary->uploadAudio($request->file('audio_file')->getRealPath());
        if(!$audio_url){
            Log::error('Failed to upload audio to Cloudinary storage.');
            return response()->json([
                'message'=>"Failed to upload audio"
            ],500);
        }
        // save to database
        $audio=Audios::create([
            'playlist_id'=>$request->playlist_id,
            'title'=>$request->title,
            'duration'=>$request->duration ?? 0,
            'audio_url'=>$audio_url,
        ]);
        return response()->json([
            'message'=>"Audio added successfully",
            'audio'=>$audio,
        ]);
    }
}
