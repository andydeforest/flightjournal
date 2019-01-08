<?php

use Illuminate\Http\Request;

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

Route::group(['middleware' => ['auth:api', 'checkUser']], function () {

	Route::get('flights', 'API\FlightController@all');
	Route::get('flight/{id}', 'API\FlightController@get');
	Route::post('flight/update', 'API\FlightController@update');


	Route::get('settings', 'API\SettingsController@get');
	Route::post('settings', 'API\SettingsController@update');


	Route::get('user', 'API\UserController@get');
	Route::get('user/time', 'API\UserController@time');

	Route::get('user/map', 'API\UserController@flight_map');
	Route::get('user/top_airports', 'API\UserController@top_airports');
	Route::get('user/top_airports/{x}', 'API\UserController@top_airports');


});