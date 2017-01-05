<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Input;
Use Hash;

class User extends Model {

	protected $hidden = ['password'];

	protected $fillable = ['user', 'user', 'password', 'name', 'email', 'type', 'created_at', 'updated_at'];

	public function allUsers()
	{
		$user = self::all();
		if(is_null($user)){
			return false;
		}

		return $user;
		
	}

	public function getUser($id)
	{
		$user = self::find($id);
		if(is_null($user)){
			return false;
		}
		return $user;
	}

	public function getUserLogin()
	{
		$this->hidden = null;
		$input = Input::all();
		$matchThese = [ 'user' => $input['user'] ];
		$user = User::where($matchThese)->first();

		if( $user == false || !Hash::check($input['password'], $user->password) ) {
			return false;
		}

		return $user;
	}

	public function saveUser()
	{
		$input = Input::all();
		$input['password'] = Hash::make($input['password']);
		$user = new User();
		$user->fill($input);
		$user->save();
		return $user;
	}

	public function updateUser($id)
	{
		$user = self::find($id);
		if(is_null($user)){
			return false;
		}
		$input = Input::all();
		if(isset($input['password']))
		{
			$input['password'] = Hash::make($input['password']);
		}
		$user->fill($input);
		$user->save();
		return $user;
	}

	public function deleteUser($id)
	{
		$user = self::find($id);
		if(is_null($user)){
			return false;
		}

		return $user->delete();
		
	}

}
