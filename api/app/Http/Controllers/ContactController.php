<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Contact;

// CUSTOM HELPER - uploadFile
use App\Helpers\Helper;

use Response;

use Mail;
use Input;
use Validator;
use Redirect;
use Session;
use File;

class ContactController extends Controller {

	protected $model;

	public function __construct(Contact $model)
	{
		$this->middleware('UserAuth', ['except' => ['allRegistries', 'getRegistry', 'getRegistriesByPage', 'saveRegistry']]);
		$this->model = $model;
	}

	public function allRegistries()
	{
		$registries = $this->model->allRegistries();
		if(!$registries){
			return Response::json( ['response' => 'Does not have registries.'], 400 );
		}
		return Response::json( $registries, 200 );
	}

	public function getRegistry($id)
	{
		$registry = $this->model->getRegistry($id);
		if(!$registry){
			return Response::json( ['response' => 'Registries not found.'], 400 );	
		}
		return Response::json( $registry, 200 );
	}

	public function getRegistriesByPage($page)
	{
		$registries = $this->model->getRegistriesByPage($page);
		if(!$registries){
			return Response::json( ['response' => 'Does not have registries'], 400 );
		}
		return Response::json( $registries, 200 );
	}

	public function saveRegistry()
	{
		$data = $input = Input::all();

		Mail::send('emails.welcome', $data, function ($message) use ($data){
			$message->from( $data['email'], $data['nome'] );
			$message->to('marlon.barcarol@gmail.com')->subject('Contact form - '.$data['nome']);
		});

		$registry = $this->model->saveRegistry();

		return Response::json( $registry , 200 );
	}

	/*public function updateRegistry($id)
	{
		$registry = $this->model->updateRegistry($id);

		if(!$registry){
			return Response::json( ['response' => 'Falha ao atualizar registro.'], 400 );	
		}

		return Response::json( $registry, 200 );
	}*/

	public function deleteRegistry($id)
	{
		$registry = $this->model->deleteRegistry($id);

		if(!$registry){
			return Response::json( ['response' => 'Fail to delete registry.'], 400 );	
		}
		return Response::json( ['response' => 'Registry successfully removed!'], 200 );
	}

}
