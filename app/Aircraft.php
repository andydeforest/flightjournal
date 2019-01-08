<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Aircraft extends Model {

	protected $table = 'aircraft';
	
	protected $fillable = ['user_id', 'registration', 'manufacturer', 'icao', 'model', 'type', 'category', 'complex', 'constant_speed_prop', 'retractable_flaps', 'retractable_landing_gear', 'tailwheel', 'high_performance', 'engine_type'];

	public static function categories() {
		return DB::select('SELECT DISTINCT category FROM aircraft');
	}

}
