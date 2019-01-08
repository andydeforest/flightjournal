<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Aircraft;
use App\Airport;
use DB;

class UserController extends Controller {

	public function get(Request $request) {
		$user = $request->user();
		$user->load(['settings']);
		return response()->json([
			'success' => true,
			'user' => $user
		]);	
	}

    public function time(Request $request) {

		$columns = ['total_time', 'pic', 'sic', 'solo', 'night', 'cross_country', 'actual_instrument', 'simulated_instrument', 'dual_given', 'dual_received', 'simulator'];

		$user = $request->user();

		$times = array();

		foreach($columns as $col) {
			$times[$col] = number_format($user->flights->sum($col), 1);
		}

		foreach(Aircraft::categories() as $cat) {
			$times[$cat->category] = number_format(doubleval(DB::select('SELECT SUM(total_time) FROM flights INNER JOIN aircraft on flights.aircraft_id = aircraft.id WHERE flights.user_id = '.$user->id.' AND aircraft.category = \''.$cat->category.'\'')[0]->sum), 1);
		}
		
		return response()->json([
			'success' => true,
			'times' => $times
		]);		
	}

	public function flight_map(Request $request) {
		$flights = $request->user()->flights;

		$citypairs = array();
		$map_data = array();

		foreach($flights as $flight) {
			if(!in_array($flight->departure."".$flight->arrival, $citypairs) && !in_array($flight->arrival."".$flight->departure, $citypairs)) {
				array_push($citypairs, $flight->departure."".$flight->arrival);
				array_push($map_data, ['departure' => $flight->departure_airport(), 'arrival' => $flight->arrival_airport()]);
			}
		}

		return response()->json([
			'success' => true,
			'map_data' => $map_data
		]);
	}

	public function top_airports($x = 5, Request $request) {
		$id = $request->user()->id;
		$top = DB::select('SELECT SUM(count), ap FROM (SELECT COUNT(*), departure AS ap from flights WHERE user_id = '.$id.' GROUP BY ap UNION ALL SELECT COUNT(*), arrival AS ap FROM flights WHERE user_id = '.$id.' GROUP BY ap) AS t GROUP BY ap order by sum DESC limit '.$x);
		$data = array();
		foreach($top as $airport) {
			$airport->sum = intval($airport->sum);
			$ap = Airport::where('icao', $airport->ap)->first();
			if(!$ap) {
				$ap = Airport::where('identifier', $airport->ap)->first();
			}
			if($ap) {
				array_push($data, ['sum' => $airport->sum, 'airport' => $ap, 'apObjFound' => true]);
			} else {
				array_push($data, ['sum' => $airport->sum, 'airport' => $airport->ap, 'apObjFound' => false]);
			}
		}
		// calculate an average coordinate
		$avgLat = 0;
		$avgLng = 0;
		$i = 0;
		foreach($data as $top) {
			if($top['apObjFound']) {
				$avgLat += $top['airport']->latitude;
				$avgLng += $top['airport']->longitude;
				$i++;
			}
		}

		$avgLat /= $i;
		$avgLng /= $i;

		return response()->json([
			'success' => true,
			'airports' => $data,
			'average_coordinate' => ['latitude' => $avgLat, 'longitude' => $avgLng]
		]);
	}
}
