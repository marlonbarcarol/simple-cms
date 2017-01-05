<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Service;
use App\ServiceFile;

// CUSTOM HELPER - uploadFile
use App\Helpers\Helper;

use Response;

use Input;
use Validator;
use Redirect;
use Session;
use File;

class ServiceController extends Controller {

	protected $model;

	public function __construct(Service $model, ServiceFile $modelFile)
	{
		$this->middleware('UserAuth', ['except' => ['allRegistries', 'getRegistry', 'getRegistriesByPage']]);
		$this->model = $model;
		$this->modelFile = $modelFile;
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
			return Response::json( ['response' => 'Registry not found.'], 400 );	
		}
		return Response::json( $registry, 200 );
	}

	public function getRegistriesByPage($page)
	{
		$registries = $this->model->getRegistriesByPage($page);
		if(!$registries){
			return Response::json( ['response' => 'Page not found.'], 400 );
		}
		return Response::json( $registries, 200 );
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
			return Response::json( ['response' => 'Fail to update.'], 400 );	
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
			return Response::json( ['response' => 'Fail to delete registry'], 400 );	
		}
		return Response::json( ['response' => 'Registry successfully removed!'], 200 );
	}

}
