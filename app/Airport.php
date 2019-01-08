<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model {

	protected $table = 'airports';
	
	protected $fillable = ['name', 'identifier', 'icao', 'latitude', 'longitude'];
	
}
