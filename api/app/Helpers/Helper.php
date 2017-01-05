<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use Input;
use Storage;
use File;
use Image;

class Helper {

	public static function uploadFiles($destinationPath) 
	{
		$uploadedFiles = Input::file('files');
		$files = [];
		foreach($uploadedFiles as $file){
			if (!$file->isValid()) {
				return "Invalid fail: ".$file->getClientOriginalName();
			}
		}

		foreach($uploadedFiles as $i=>$file){
			$name = $file->getClientOriginalName();
			$name = substr($name, 0, strpos($name, "."));
			$extension = $file->getClientOriginalExtension();
			$newName = $name.'-'.rand(11111,99999).'.'.$extension;
			/*$file->move("../uploads/".$destinationPath, $newName);*/
			if(!File::isDirectory("../uploads/".$destinationPath)){
				File::makeDirectory("../uploads/".$destinationPath, 0777, true, true);
			}
			$img = Image::make($file->getRealPath()); 
			$img->widen(1024, function ($constraint) {
				$constraint->aspectRatio();
				$constraint->upsize();
			});
			$img->heighten(1024, function ($constraint) {
				$constraint->aspectRatio();
				$constraint->upsize();
			});
			$img->save("../uploads/".$destinationPath.'/'.$newName);

			$files[$i]['file'] = $newName;
			$files[$i]['path'] = "/uploads/".$destinationPath.'/'.$newName;
		}

		return $files;
	}

	public static function deleteFiles($path, $file) 
	{
		$return = File::delete("../uploads/".$path."/".$file);
		return $return;
	}

}