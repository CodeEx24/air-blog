<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/posts', PostController::class)->withoutMiddleware('auth:api');
Route::get('/posts/slug/{slug}', [PostController::class, 'getBySlug'])->withoutMiddleware('auth:api');
