<?php

use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/






Route::any('/user/{name}/repos/{page}', [TestController::class, 'getPublicRepositories']);
Route::any('/user/{name}/reposPage', [TestController::class, 'getCountOfPages']);

Route::any('/user/{name}/repos/{page}/{token}', [TestController::class, 'getUserRepositories']);
Route::any('/user/reposPage/{token}', [TestController::class, 'getUserCountOfPages']);


Route::any('/user/{name}/repos/{reponame}/update/{visibility}/{token}', [TestController::class, 'changeVisibility']);
Route::any('/user/{name}/repos/{reponame}/delete/{token}', [TestController::class, 'deleteRepository']);

// Login
Route::any('/user/{name}', [TestController::class, 'getUser']);


