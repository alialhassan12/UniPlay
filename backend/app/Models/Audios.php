<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audios extends Model
{
    protected $fillable = [
        'playlist_id',
        'title',
        'duration',
        'audio_url',
    ];

    public function playlist(){
        return $this->belongsTo(Playlist::class);
    }
}
