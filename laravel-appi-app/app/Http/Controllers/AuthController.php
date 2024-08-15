<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $fields = $request->validate([
            "name" => ["required", "max:255"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "confirmed"],
        ]);
        $user = User::query()->create($fields);
        $token = $user->createToken($request->name);
        return [
            "user" => $user,
            "token" => $token->plainTextToken
        ];
    }
    public function login(Request $request)
    {
        $request->validate([

            "email" => ["required", "email", "exists:users,email"],
            "password" => ["required"],
        ]);
        $user = User::query()->where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(
                ["email" => "the provided credentials are incorrect"]
            );
        }
        $token = $user->createToken($user->name);
        return [
            "user" => $user,
            "token" => $token->plainTextToken
        ];
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return ["message" => "you are logged out"];
    }
}
