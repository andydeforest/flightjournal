<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Approach extends Model {

	protected $table = 'approaches';
	
	protected $fillable = ['flight_id', 'type', 'count'];

}
