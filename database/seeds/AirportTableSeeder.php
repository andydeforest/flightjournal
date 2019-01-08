<?php

use Illuminate\Database\Seeder;
use App\Airport;

class AirportTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
		// loads and parses the FAA airport data
        if(($handle = fopen(base_path().DIRECTORY_SEPARATOR."database".DIRECTORY_SEPARATOR."seeds".DIRECTORY_SEPARATOR."APT.txt", "r")) !== FALSE) {
			while(($line = fgets($handle)) !== false) {

				// make sure we're parsing airport row
				if(substr($line, 14, 7) === 'AIRPORT') {
					$identifier = trim(substr($line, 27, 4));
					$icao = trim(substr($line, 1210, 4));
					$name = ucwords(strtolower(trim(substr($line, 133, 50))));

					// make sure words after hyphens are capitalized
					$name = explode("-", $name);
					if(count($name) > 1) {
						foreach($name as $i => $w) {
							$name[$i] = ucfirst($w);
						}
						$name = implode("-", $name);
					} else {
						$name = $name[0];
					}
		
					// N176-38-32.9277W635912.9277
					$lat = $this->dmsToDeci(substr($line, 523, 14));
					$lng = $this->dmsToDeci(substr($line, 550, 15));

					if($icao === "") {
						$icao = null;
					}
		
					Airport::create(['name' => $name, 'identifier' => $identifier, 'icao' => $icao, 'latitude' => $lat, 'longitude' => $lng]);
				} else {
					continue;
				}
			}
			fclose($handle);
		}
		// loads and parses supplemental airport data
		if(($handle = fopen(base_path().DIRECTORY_SEPARATOR."database".DIRECTORY_SEPARATOR."seeds".DIRECTORY_SEPARATOR."airports.dat", "r")) !== FALSE) {
			while(($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$name = $data[1];
				$identifier = $data[4];
				$icao = $data[5];
				$latitude = $data[6];
				$longitude = $data[7];
				// first, fill in airports who might have a null identifier
				$qry = Airport::where('identifier', $identifier)->where('icao', '');
				if($qry->count() === 1) {
					$ap = $qry->first();
					// make sure the icao code is valid
					if(strlen($icao) < 4) {
						continue;
					}
					// make sure the coordinates match pretty closely (within 10nm is a safe bet)
					if(App\Helpers::coord_distance($latitude, $longitude, $ap->latitude, $ap->longitude) > 10) {
						continue;
					}
					echo "Updating ".$ap->identifier." with ICAO code ${icao}\n";
					$ap->icao = $icao;
					$ap->save();
					continue;
				}
				// next, add airports that dont exist
				$qry = Airport::where('identifier', $identifier);
				if($qry->count() === 0) {
					if($icao === "\N") {
						$icao = null;
					}
					Airport::create(['name' => $name, 'identifier' => $identifier, 'icao' => $icao, 'latitude' => $lat, 'longitude' => $lng]);
					continue;
				}
			}
			fclose($handle);
		}


	}
	
	private function dmsToDeci($dms) {
		$parse = explode("-", $dms);
		$deg = $parse[0];
		$min = $parse[1];
		$sec = $parse[2];
		// check if last char is N/S or E/W
		$char = substr($sec, strlen($sec) - 1, 1);
		$deg = floatval($deg);
		$min = floatval($min);
		$sec = floatval($sec);
		$coord = $deg+((($min*60)+($sec))/3600);
		// make the coord negative
		if($char == "S" || $char == "W") {
			$coord = $coord - ($coord * 2);
		}
		return $coord;
	}
}
