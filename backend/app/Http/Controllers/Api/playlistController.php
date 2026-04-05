<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Playlist;
use Illuminate\Http\Request;

class playlistController extends Controller
{
    public function createPlaylist(Request $request){
        $request->validate([
            'user_id'=>'required|exists:users,id',
            'name'=>'required|string|max:255',
        ]);
        $playlist=Playlist::create([
            'user_id'=>$request->user_id,
            'name'=>$request->name,
        ]);
        return response()->json([
            'message'=>'Playlist created successfully',
            'playlist'=>$playlist
        ]);
    }

    public function getUserPlaylists(Request $request){
        $user=auth('sanctum')->user();
        $playlists=$user->playlists;
        return response()->json([
            'playlists'=>$playlists
        ]);
    }
}
