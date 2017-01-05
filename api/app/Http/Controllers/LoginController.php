<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\User;
use Input;
use Hash;
use Response;

class LoginController extends Controller {

	public function doLogin(User $user)
	{
		$user = $user->getUserLogin();
		if( $user == false ){
			return ( Response::json(['response' => "User or password incorrect."], 401) );
		}
		$user->auth = base64_encode($user->user.':'.$user->password);

		return $user;
	}

}
