<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Input;

// CUSTOM HELPER - uploadFile
use App\Helpers\Helper;

class ServiceFile extends Model {

	public function allRegistries()
	{
		$registries = self::all();
		if(empty($registries)){
			return false;
		}

		return $registries;
	}

	public function getRegistry($id)
	{
		$registry = self::find($id);
		if(is_null($registry)){
			return false;
		}
		return $registry;
	}

	public function getRegistries($id_foreign)
	{
		$registry = self::where('service_id', $id_foreign)->get();
		if(is_null($registry)){
			return false;
		}
		return $registry;
	}

	public function saveRegistry($id_foreign)
	{
		$registries = [];
		$subtitle = Input::get('subtitles');
		$input = Input::all();
		if( isset($input['files'][0]) && array_key_exists('id', $input['files'][0]) ) {
			foreach(Input::all()['files'] as $i=>$file){
				$registry = $this->getRegistry($file['id']);
				$registry->subtitle = (isset($subtitle[$i])) ? $subtitle[$i] : "";
				$registry->save();
				$registries[] = $registry;
			}
		}else {
			$files = Helper::uploadFiles('service');
			foreach(Input::file('files') as $i=>$file){
				$registry = new self();
				$registry->file = $files[$i]['file'];
				$registry->path = $files[$i]['path'];
				$registry->subtitle = (isset($subtitle[$i])) ? $subtitle[$i] : "";
				$registry->service_id = $id_foreign;
				$registry->save();
				$registries[] = $registry;
			}
		}
		
		return $registries;
	}

	public function deleteRegistries($id_foreign)
	{
		$registries = $this->getRegistries($id_foreign);
		self::where('service_id', $id_foreign)->delete();
		foreach($registries as $i=>$registry){
			$files = Helper::deleteFiles('service', $registry->file);
		}
		
		return $registries;
	}

}
