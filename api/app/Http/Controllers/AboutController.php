<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\About;
use App\AboutFile;

// CUSTOM HELPER - uploadFile
use App\Helpers\Helper;

use Response;

use Input;
use Validator;
use Redirect;
use Session;
use File;

class AboutController extends Controller {

	protected $model;

	public function __construct(About $model, AboutFile $modelFile)
	{
		$this->middleware('UserAuth', ['except' => ['allRegistries', 'getRegistry']]);
		$this->model = $model;
		$this->modelFile = $modelFile;
	}

	public function allRegistries()
	{
		$registries = $this->model->allRegistries();
		if(!$registries){
			return Response::json( ['response' => 'Não há páginas'], 400 );
		}
		return Response::json( $registries, 200 );
	}

	public function getRegistry($id)
	{
		$registry = $this->model->getRegistry($id);
		if(!$registry){
			return Response::json( ['response' => 'Página não encontrado'], 400 );	
		}
		return Response::json( $registry, 200 );
	}

	public function saveRegistry()
	{
		$registry = $this->model->saveRegistry();

		if( isset(Input::all()['files']) ){
			$this->modelFile->deleteRegistries($registry->id);
			$registry['files'] = $this->modelFile->saveRegistry($registry->id);
		}

		return Response::json( $registry , 200 );
	}

	public function updateRegistry($id)
	{
		$registry = $this->model->updateRegistry($id);

		if( isset(Input::all()['files']) ) {
			if( !empty(Input::file('files')) ) {
				if( count($this->modelFile->getRegistries($registry->id)) > 0 ) {
					$this->modelFile->deleteRegistries($registry->id);
				}
			}
			$registry['files'] = $this->modelFile->saveRegistry($registry->id);
		}

		if(!$registry){
			return Response::json( ['response' => 'Falha ao atualizar página'], 400 );	
		}

		return Response::json( $registry, 200 );
	}

	public function deleteRegistry($id)
	{
		if( count($this->modelFile->getRegistries($id)) > 0 ) {
			$this->modelFile->deleteRegistries($id);
		}
		$registry = $this->model->deleteRegistry($id);

		if(!$registry){
			return Response::json( ['response' => 'Falha ao deletar página'], 400 );	
		}
		return Response::json( ['response' => 'Página removida com sucesso!'], 200 );
	}

}
