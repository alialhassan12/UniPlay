<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class authController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        try{
            $hashPassword=Hash::make($request->password);
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>$hashPassword,
            ]);
            $token=$user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token,
            ]);
        }catch(Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'User creation failed',
            ],500);
        }
        
    }
    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user){
            return response()->json([
                'message' => 'User not found',
            ],404);
        }
        if(!Hash::check($request->password,$user->password)){
            return response()->json([
                'message' => 'Invalid password',
            ],401);
        }
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function logout(Request $request){
        try{
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'User logged out successfully',
            ],200);
        }catch(Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'User logout failed',
            ],500);
        }
    }

    public function checkAuth(Request $request){
        return response()->json([
            'message' => 'User is authenticated',
            'user' => $request->user(),
        ],200);
    }
}
