<?php

Route::post('login', ['uses' => 'LoginController@doLogin']);

Route::group(['prefix' => 'user'], function()
{
	Route::get('', ['uses' => 'UserController@allUsers']);
	Route::get('{id}', ['uses' => 'UserController@getUser']);
	Route::post('', ['uses' => 'UserController@saveUser']);
	Route::post('{id}', ['uses' => 'UserController@updateUser']);
	Route::delete('{id}', ['uses' => 'UserController@deleteUser']);
});

Route::group(['prefix' => 'service'], function()
{
	Route::get('', ['uses' => 'ServiceController@allRegistries']);
	Route::get('{id}', ['uses' => 'ServiceController@getRegistry']);
	Route::get('page/{page}', ['uses' => 'ServiceController@getRegistriesByPage']);
	Route::post('', ['uses' => 'ServiceController@saveRegistry']);
	Route::post('{id}', ['uses' => 'ServiceController@updateRegistry']);
	Route::delete('{id}', ['uses' => 'ServiceController@deleteRegistry']);
});

Route::group(['prefix' => 'about'], function()
{
	Route::get('', ['uses' => 'aboutController@allRegistries']);
	Route::get('{id}', ['uses' => 'aboutController@getRegistry']);
	Route::post('', ['uses' => 'aboutController@saveRegistry']);
	Route::post('{id}', ['uses' => 'aboutController@updateRegistry']);
	Route::delete('{id}', ['uses' => 'aboutController@deleteRegistry']);
});

Route::group(['prefix' => 'contact'], function()
{
	Route::get('', ['uses' => 'ContactController@allRegistries']);
	Route::get('{id}', ['uses' => 'ContactController@getRegistry']);
	Route::post('', ['uses' => 'ContactController@saveRegistry']);
	//Route::post('{id}', ['uses' => 'SendMailController@updateRegistry']);
	Route::delete('{id}', ['uses' => 'ContactController@deleteRegistry']);
});

/*Route::post('sendmail', function () {

    $data = array(
        'name' => "Learning Laravel",
    );

    Mail::send('emails.welcome', $data, function ($message) {
        $message->from('marlon.barcarol@gmail.com', 'Marlon Barcarol');
        $message->to('basillisc@gmail.com')->subject('E-mail de contato');
    });

    return "Your email has been sent successfully";

});*/

Route::get('/', function() {
	return "API";
});

Route::get('teste', ['uses' => 'WelcomeController@index']);
