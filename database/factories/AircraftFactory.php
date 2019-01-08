<?php

use Faker\Generator as Faker;

$factory->define(App\Aircraft::class, function (Faker $faker) {
	$aircraft = [
		[
			'manufacturer' => 'Cessna',
			'model' => 'C172',
			'icao' => 'C172',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => false,
			'constant_speed_prop' => false,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => false,
			'high_performance' => false,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Cessna',
			'model' => 'C182',
			'icao' => 'C182',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => true,
			'constant_speed_prop' => true,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => false,
			'high_performance' => true,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Piper',
			'model' => 'J-3',
			'icao' => 'J3',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => false,
			'constant_speed_prop' => false,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => true,
			'high_performance' => false,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Beechcraft',
			'model' => 'Super King Air 200',
			'icao' => 'B200',
			'type' => 'Aircraft',
			'category' => 'AMEL',
			'complex' => true,
			'constant_speed_prop' => true,
			'retractable_flaps' => true,
			'retractable_landing_gear' => true,
			'tailwheel' => false,
			'high_performance' => true,
			'engine_type' => 'Turboprop',
		],
		[
			'manufacturer' => 'Piper',
			'model' => 'PA-28',
			'icao' => 'PA28',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => false,
			'constant_speed_prop' => false,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => false,
			'high_performance' => false,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Piper',
			'model' => 'PA-44',
			'icao' => 'PA44',
			'type' => 'Aircraft',
			'category' => 'AMEL',
			'complex' => true,
			'constant_speed_prop' => true,
			'retractable_flaps' => true,
			'retractable_landing_gear' => true,
			'tailwheel' => false,
			'high_performance' => true,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Diamond',
			'model' => 'DA40',
			'icao' => 'DA40',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => false,
			'constant_speed_prop' => false,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => false,
			'high_performance' => false,
			'engine_type' => 'Piston',
		],
		[
			'manufacturer' => 'Cessna',
			'model' => 'C152',
			'icao' => 'C152',
			'type' => 'Aircraft',
			'category' => 'ASEL',
			'complex' => false,
			'constant_speed_prop' => false,
			'retractable_flaps' => true,
			'retractable_landing_gear' => false,
			'tailwheel' => false,
			'high_performance' => false,
			'engine_type' => 'Piston',
		],
	];
	$ac = $aircraft[rand(0, count($aircraft) - 1)];
    return [
		'user_id' => 1,
		'registration' => strtoupper('N'.rand(1, 999).substr(md5(microtime()),rand(0,26),1).chr(rand(65,90))),
		'manufacturer' => $ac['manufacturer'],
		'model' => $ac['model'],
		'icao' => $ac['icao'],
		'type' => $ac['type'],
		'category' => $ac['category'],
		'complex' => $ac['complex'],
		'constant_speed_prop' => $ac['constant_speed_prop'],
		'retractable_flaps' => $ac['retractable_flaps'],
		'retractable_landing_gear' => $ac['retractable_landing_gear'],
		'tailwheel' => $ac['tailwheel'],
		'high_performance' => $ac['high_performance'],
		'engine_type' => $ac['engine_type']
    ];
});