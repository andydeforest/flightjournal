<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Airport;

class Flight extends Model {

	protected $table = 'flights';
	
	protected $fillable = ['user_id', 'aircraft_id', 'date', 'departure', 'arrival', 'landings', 'day_fullstop', 'night_fullstop', 'total_time', 'pic', 'sic', 'solo', 'night', 'cross_country', 'actual_instrument', 'simulated_instrument', 'holds', 'approaches', 'dual_given', 'dual_received', 'simulator', 'comment'];
	
	public function aircraft() {
		return $this->belongsTo('App\Aircraft');
	}

	public function approaches() {
		return $this->hasMany('App\Approach', 'flight_id');
	}

	public function departure_airport() {
		// check for a departure airport
		if(strlen($this->departure) === 3) {
			$departure = Airport::where('identifier', $this->departure)->first();
		} else {
			$departure = Airport::where('icao', $this->departure)->first();
		}

		if($departure) {
			return $departure;
		} else {
			return $this->departure;
		}
	}

	public function arrival_airport() {
		// check for a arrival airport
		if(strlen($this->arrival) === 3) {
			$arrival = Airport::where('identifier', $this->arrival)->first();
		} else {
			$arrival = Airport::where('icao', $this->arrival)->first();
		}

		if($arrival) {
			return $arrival;
		} else {
			return $this->arrival;
		}
	}
}
