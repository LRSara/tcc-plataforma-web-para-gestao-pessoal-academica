<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Verifica se o usuário já existe
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Já existe um usuário com este e-mail.'
            ], 409); // 409 = conflito
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response([], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('access_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    public function logout(Request $request)
    {
        // Remove o token atual do usuário
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user(); // pega o usuário logado

        if (!$user) {
            return response()->json([
                'message' => 'Usuário não autenticado.'
            ], 401);
        }

        $user->tokens()->delete();

        // Deleta o usuário
        $user->delete();

        return response()->json([
            'message' => 'Conta deletada com sucesso.'
        ]);
    }
}
