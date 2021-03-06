<?php

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




Route::post('/login', 'API\ApiAuthController@login');
Route::post('/register','API\ApiAuthController@register');
Route::get('/users_list','API\ApiUserController@list');
Route::post('/update_user','API\ApiUserController@update');
Route::get('/common_list','API\ApiCommonController@commonList');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});