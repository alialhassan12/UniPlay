<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Log;

class CloudinaryService
{
    protected $cloudinary;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->cloudinary = new Cloudinary(
            "cloudinary://"
            . env('CLOUDINARY_API_KEY') . ":"
            . env('CLOUDINARY_API_SECRET') . "@"
            . env('CLOUDINARY_CLOUD_NAME')
        );
        // $this->cloudinary=new Cloudinary(env('CLOUDINARY_URL'));
        // $this->cloudinary = new Cloudinary([
        //     'cloud'=>[
        //         'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
        //         'api_key' => env('CLOUDINARY_API_KEY'),
        //         'api_secret' => env('CLOUDINARY_API_SECRET'),
        //     ]
        // ]);
    }

    public function uploadAudio($filePath)
    {
        try {
            $result = $this->cloudinary->uploadApi()->upload($filePath, [
                'folder' => 'UniPlay',
                'resource_type' => 'video',
                'chunk_size' => 6000000, // 6MB chunks
            ]);
            return [
                'url'=>$result['secure_url'],
                'public_id'=>$result['public_id'],
                'duration'=>$result['duration'] ?? 0,
            ];
        } catch (\Exception $e) {
            Log::error('Cloudinary upload error: ' . $e->getMessage());
            Log::error('File path: ' . $filePath);
            if (file_exists($filePath)) {
                Log::error('File size: ' . filesize($filePath) . ' bytes');
            }
            return null;
        }
    }
    public function deleteAudio($public_id){
        try{
            $this->cloudinary->uploadApi()->destroy($public_id, [
                'resource_type' => 'video',
            ]);
            return true;
        }catch(\Exception $e){
            Log::error('Cloudinary delete error: ' . $e->getMessage());
            return false;
        }
    }
}
