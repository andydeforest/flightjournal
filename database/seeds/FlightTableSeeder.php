<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Flight;
use App\Airport;
use App\Aircraft;
use App\Approach;

class FlightTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$start_icao = 'KRAL';
		$faker = Faker::create();
		$max = rand(100, 120);
		for($x = 0; $x < $max; $x++) {
			$ac = [10, 20, 30, 40, 50];

			$qry = Flight::orderBy('id', 'DESC');
		
			$start_ap = Airport::where('icao', $start_icao)->first();
			$max_dist = 150;
		
			$date = new \DateTime('September '.rand(1, 30).', 2017');
		
			if(Flight::count() > 0) {
				$last_flight = $qry->first();
				$departure = Airport::where('icao', $last_flight->arrival)->first();
				$date = new \DateTime($last_flight->date);
		
			} else {
				$departure = $start_ap;
		
			}
		
			/*
			if($departure->id === $start_ap->id) {
				// fudge the date a lil
				$date->add(new \DateInterval('P'.rand(0, 14).'D'));
				$lat = $start_ap->latitude;
				$lon = $start_ap->longitude;
				// find random airports
				$airport_ids = DB::select('SELECT id FROM (SELECT id, icao, latitude, longitude, SQRT(POW(69.1 * (latitude - '.$lat.'), 2) + POW(69.1 * ('.$lon.' - longitude) * COS(latitude / 57.3), 2)) AS distance FROM airports) as innerSelect WHERE distance <= '.$max_dist.' AND icao != \'\'');
				$arrival = Airport::find($airport_ids[rand(0, count($airport_ids) - 1)]->id);
			} else {
				// we're flying back to kcrq
				$arrival = $start_ap;
			}
			*/
			$date->add(new \DateInterval('P'.rand(0, 14).'D'));


			if($departure->id !== $start_ap->id && rand(1, 5) === 3) {
				$arrival = $start_ap;
			} else {
				$lat = $departure->latitude;
				$lon = $departure->longitude;
				// find random airports
				$airport_ids = DB::select('SELECT id FROM (SELECT id, icao, latitude, longitude, SQRT(POW(69.1 * (latitude - '.$lat.'), 2) + POW(69.1 * ('.$lon.' - longitude) * COS(latitude / 57.3), 2)) AS distance FROM airports) as innerSelect WHERE distance <= '.$max_dist.' AND icao != \'\'');
				$arrival = Airport::find($airport_ids[rand(0, count($airport_ids) - 1)]->id);
			}




		
			$aircraft = Aircraft::find($ac[rand(0, count($ac) - 1)]);
			if($aircraft->high_performance) {
				$speed = 135;
			} else {
				$speed = 80;
			}
			$distance = App\Helpers::distance($departure, $arrival);
		
			$time = $distance / $speed;
		
			$time = $time + ($time * 0.25);
		
			// the nature of the flight (50% training flights, 50% pleasure flights)
			$training = rand(1,2) % 2 === 0;
			// length of the flight (between 0.5 and 2.5 hours)
			$total_time = $time;
			// pilot in command? (not if its a training flight)
			$pic = $training ? 0 : $total_time;
			// second in command? (not usually, but maybe if its not pic)
			$sic = rand(1, 7) === 3 && !$pic ? $total_time : 0;
			// solo time (maybe, as long as youre loggin pic too)
			$solo = $pic > 0 ? $training : 0;
			// a little bit of night
			$night = rand(1, 5) === 3 ? $total_time * (rand(1, 10) / 10) : 0;
			// occassional cross country
			$cc = $distance > 50 ? $total_time : 0;
			// actual instrument time, kind of rare but feasible
			$inst = rand(1, 10) === 3 ? $total_time * (rand(1, 10) / 10) : 0;
			// simulated inst, less rare
			$sinst = rand(1, 8) === 3 ? $total_time * (rand(3, 6) / 10) : 0;
			// holds, throw one in every now and then
			$holds = rand(1, 10) === 3 ? rand(1, 6) : 0;
			// approaches, throw those in at a decent amount
			$apch = rand(1, 7) === 3 ? rand(1, 3) : 0;
			// some dual given here and there
			$dualg = rand(1, 10) === 3 ? $total_time : 0;
			$dualr = $training ? $total_time : 0;
		
			$landings = rand(1, 3);
		
			$day_fullstop = 0;
			$night_fullstop = 0;
		
			if($night === 0) {
				$day_fullstop = rand(0, $landings);
			} else {
				$night_fullstop = rand(0, $landings);
			}

			$flight = new Flight;
			$flight->user_id = 1;
			$flight->aircraft_id = $aircraft->id;
			$flight->date = $date;
			$flight->departure = $departure->icao;
			$flight->arrival = $arrival->icao;
			$flight->landings = $landings;
			$flight->day_fullstop = $day_fullstop;
			$flight->night_fullstop = $night_fullstop;
			$flight->total_time = number_format($total_time, 1);
			$flight->pic = number_format($pic, 1);
			$flight->sic = number_format($sic, 1);
			$flight->solo = number_format($solo, 1);
			$flight->night = number_format($night, 1);
			$flight->cross_country = number_format($cc, 1);
			$flight->actual_instrument = number_format($inst, 1);
			$flight->simulated_instrument = number_format($sinst, 1);
			$flight->holds = $holds;
			$flight->approach_count = $apch;
			$flight->dual_given = number_format($dualg, 1);
			$flight->dual_received = number_format($dualr, 1);
			$flight->simulator = 0;
			$flight->comment = $faker->sentence;
			$flight->save();

			$types = ['ils', 'vor', 'gps', 'loc'];
			for($y = 0; $y < $flight->approach_count; $y++) {
				$approach_type = $types[rand(0, count($types) - 1)];
				// incremement if this approach type already exists for this flight
				$qry = Approach::where('flight_id', $flight->id)->where('type', $approach_type);
				if($qry->count() > 0) {
					$app = $qry->first();
					$app->count++;
					$app->save();
				} else {
					Approach::create(['flight_id' => $flight->id, 'type' => $approach_type, 'count' => 1]);
				}
			}
		}
	}
}
