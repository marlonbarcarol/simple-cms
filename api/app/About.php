<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use Input;

use App\AboutFile;

class About extends Model {

	protected $fillable = ['title', 'identification', 'description', 'created_at', 'updated_at'];

	protected $month =  array(
		'Jan' => 'January',
		'Feb' => 'Fabruary',
		'Mar' => 'March',
		'Apr' => 'April',
		'May' => 'May',
		'Jun' => 'June',
		'Jul' => 'July',
		'Aug' => 'August',
		'Nov' => 'November',
		'Sep' => 'September',
		'Oct' => 'Octuber',
		'Dec' => 'December'
	);

	public function allRegistries()
	{
		$registries = self::orderBy('created_at', 'desc')->get();

		foreach($registries as $i=>$registry) {
			$day = $registry->created_at->format('d');
			$month = $registry->created_at->format('M');
			$year = $registry->created_at->format('Y');
			$time = $registry->created_at->format('H:i');

			$registries[$i]['created'] = $day.', '.$this->month[$month].', '.$year.' - '.$time;
		}
		
		if(empty($registries)){
			return false;
		}

		return $registries;
	}

	public function getRegistry($id)
	{
		$modelFile = new AboutFile;
		$registry = self::find($id);
		$registry['files'] = $modelFile->getRegistries($id);

		$day = $registry->created_at->format('d');
		$month = $registry->created_at->format('M');
		$year = $registry->created_at->format('Y');
		$time = $registry->created_at->format('H:i');

		$registry->created = $day.', '.$this->month[$month].', '.$year.' - '.$time;

		if(is_null($registry)){
			return false;
		}

		return $registry;
	}

	public function saveRegistry()
	{
		$input = Input::all();
		$registry = new self();
		$registry->fill($input);
		$registry->save();

		return $registry;
	}

	public function updateRegistry($id)
	{
		$registry = self::find($id);
		if(is_null($registry)){
			return false;
		}
		$input = Input::all();
		$registry->fill($input);
		$registry->save();

		return $registry;
	}

	public function deleteRegistry($id)
	{
		$registry = self::find($id);
		if(is_null($registry)){
			return false;
		}

		return $registry->delete();
	}

}
