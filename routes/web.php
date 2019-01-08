<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['auth']], function () {
	Route::view('app/{path?}', 'back.app')->where('path', '.*')->name('react');

	Route::get('logout', function() {
		Auth::logout();
		return redirect('login');
	});
});

Route::get('login', 'LoginController@index')->name('login'); // name needs to be kept for the auth middleware
Route::post('login', 'LoginController@authenticate');