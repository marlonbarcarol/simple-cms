<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\User;
use Response;

class UserController extends Controller {

	protected $user = null;

	public function __construct(User $user)
	{
		$this->middleware('UserAuth');
		$this->user = $user;
	}

	public function allUsers()
	{
		$user = $this->user->allUsers();
		if(!$user){
			return Response::json( ['response' => 'Não há usuários'], 400 );
		}
		return Response::json( $user, 200 );
	}

	public function getUser($id)
	{
		$user = $this->user->getUser($id);
		if(!$user){
			return Response::json( ['response' => 'Usuário não encontrado'], 400 );	
		}
		return Response::json( $user, 200 );
	}

	public function saveUser()
	{
		return Response::json( $this->user->saveUser(), 200 );
	}

	public function updateUser($id)
	{
		$user = $this->user->updateUser($id);
		if(!$user){
			return Response::json( ['response' => 'Falha ao atualizar usuário'], 400 );	
		}
		return Response::json( $user, 200 );
	}

	public function deleteUser($id)
	{
		$user = $this->user->deleteUser($id);
		if(!$user){
			return Response::json( ['response' => 'Falha ao deletar usuário'], 400 );	
		}
		return Response::json( ['response' => 'Usuário removido com sucesso!'], 200 );
	}

}
