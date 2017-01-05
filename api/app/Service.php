<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;

use Input;

use App\ServiceFile;

class Service extends Model {

	protected $fillable = ['title', 'summary', 'description', 'created_at', 'updated_at'];

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

	public function files()
    {
        return $this->hasMany('App\ServiceFile', 'service_id');
    }

	public function allRegistries()
	{
		$registries = self::orderBy('created_at', 'desc')->get();

		foreach($registries as $i => $registry) {
			$registries[$i]['files'] = $registry->files;

			$day = $registry->created_at->format('d');
			$month = $registry->created_at->format('M');
			$year = $registry->created_at->format('Y');
			$time = $registry->created_at->format('H:i');

			$registries[$i]['created'] = $day.' de '.$this->month[$month].' de '.$year.' - '.$time;
		}
		
		if(empty($registries)){
			return false;
		}

		return $registries;
	}

	public function getRegistry($id)
	{
		$modelFile = new ServiceFile;
		$registry = self::find($id);
		$registry['files'] = $modelFile->getRegistries($id);

		$day = $registry->created_at->format('d');
		$month = $registry->created_at->format('M');
		$year = $registry->created_at->format('Y');
		$time = $registry->created_at->format('H:i');

		$registry->created = $day.' de '.$this->month[$month].' de '.$year.' - '.$time;

		if(is_null($registry)){
			return false;
		}

		return $registry;
	}

	public function getRegistriesByPage($page) {
		$totalPerPage = 10;

		Paginator::currentPageResolver(function() use ($page) {
			return $page;
		});

		$registries = self::orderBy('created_at', 'desc')->paginate($totalPerPage);

		foreach($registries as $i => $registry) {
			$registries[$i]['files'] = $registry->files;
			$day = $registry->created_at->format('d');
			$month = $registry->created_at->format('M');
			$year = $registry->created_at->format('Y');
			$time = $registry->created_at->format('H:i');

			$registries[$i]['created'] = $day.', '.$this->month[$month].', '.$year.' - '.$time;
		}
		
		return $registries;
	}

	public function saveRegistry()
	{
		$input = Input::all();
		$registry = new self();
		$registry->fill($input);
		$registry->slug = str_slug($input['title']);
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
		$registry->slug = str_slug($input['title']);
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
