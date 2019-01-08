<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Flight;
use App\Airport;
use App\Helpers;

class FlightController extends Controller {
	
	public function all(Request $request) {
		return response()->json([
			'success' => true,
			'flights' => $request->user()->flights()->with(['aircraft', 'approaches'])->orderBy('date', 'DESC')->get()
		]);
	}

	public function update(Request $request) {
		$flight = Flight::find($request->id);
		$flight->load(['aircraft', 'approaches']);

		if($flight) {
			if($flight->user_id !== $request->user()->id) {
				return response()->json([
					'success' => false,
					'message' => 'Flight belongs to a different user'
				]);
			}
			$flight->fill($request->all());
			$flight->save();
			return response()->json([
				'success' => true,
				'flight' => $flight
			]);
		} else {
			return response()->json([
				'success' => false,
				'message' => 'Flight not found'
			]);
		}
	}

	public function get($id, Request $request) {

		$flight = Flight::find($id);
		$flight->load(['aircraft', 'approaches']);

		// check for a departure airport
		if(strlen($flight->departure) === 3) {
			$departure = Airport::where('identifier', $flight->departure)->first();
		} else {
			$departure = Airport::where('icao', $flight->departure)->first();
		}

		if($departure) {
			$flight->departure = $departure;
		}

		// and also an arrival
		if(strlen($flight->arrival) === 3) {
			$arrival = Airport::where('identifier', $flight->arrival)->first();
		} else {
			$arrival = Airport::where('icao', $flight->arrival)->first();
		}

		if($arrival) {
			$flight->arrival = $arrival;
		}

		if($departure && $arrival) {
			$flight->distance = Helpers::distance($departure, $arrival);
			$flight->full_data = true;
		} else {
			$flight->full_data = false;
		}

		if($flight->user_id === $request->user()->id) {
			return response()->json([
				'success' => true,
				'flight' => $flight
			]);
		}
	}

}
