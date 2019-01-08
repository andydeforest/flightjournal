<?php

namespace App;
use App\Airport;

class Helpers {

	/**
	 * Calculates and returns the nautical mile distance between two airports
	 *
	 * @param Airport $dep Departure airport
	 * @param Airport $arr Arrival airport
	 * @return double Distance between both airports
	 */
	public static function distance(Airport $dep, Airport $arr) {
		return Helpers::coord_distance($dep->latitude, $dep->longitude, $arr->latitude, $arr->longitude);
	}

    public static function coord_distance($lat1, $lon1, $lat2, $lon2) {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        return $miles * 0.868976;
    }

}
