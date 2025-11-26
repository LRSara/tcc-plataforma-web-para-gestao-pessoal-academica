<?php

use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/delete-account', [AuthController::class, 'deleteAccount'])->middleware('auth:sanctum');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);

Route::get('/user',  function (Request $request) {
    return $request->user();
}) ->middleware('auth:sanctum');

Route::get('/ping', function () {
    return response()->json(['message' => 'API funcionando 🚀']);
});

// Rotas de Tasks
Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);      
    Route::post('/', [TaskController::class, 'store']);     
    Route::get('/{id}', [TaskController::class, 'show']);   
    Route::patch('/{id}', [TaskController::class, 'update']); 
    Route::delete('/{id}', [TaskController::class, 'destroy']);
});

Route::get('/tasks-grouped', [TaskController::class, 'tasksByMonth'])->middleware('auth:sanctum');

// Rotas de Subjects
Route::middleware('auth:sanctum')->prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);      
    Route::post('/', [SubjectController::class, 'store']);     
});

Route::middleware('auth:sanctum')->prefix('notes')->group(function () {
    Route::get('/', [NoteController::class, 'index']);      
    Route::post('/', [NoteController::class, 'store']);
    Route::put('/{id}', [NoteController::class, 'update']); 
    Route::delete('/{id}', [NoteController::class, 'destroy']);
});