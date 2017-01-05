<?php namespace App\Http\Middleware;

use Illuminate\Http\Response;
use Closure;
use App\User;

class UserAuth {

	public function __construct(User $user)
	{
		$this->user = $user;
	}


	public function handle($request, Closure $next)
	{
		if( empty($_SERVER['PHP_AUTH_USER']) || empty($_SERVER['PHP_AUTH_PW']) ){
			return ( new Response(['response' => "Unauthorized"], 401) );
		}

		$matchThese = ['user' => $_SERVER['PHP_AUTH_USER']];
		$this->user = User::where($matchThese)->first();

		if( $this->user == false || $_SERVER['PHP_AUTH_PW'] != $this->user->password ) {
			return ( new Response(['response' => "Unauthorized"], 401) );
		}

		return $next($request);
	}

}
