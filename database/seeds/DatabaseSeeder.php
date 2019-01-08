<?php

use Illuminate\Database\Seeder;
use App\Approach;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
		//$this->call(AirportTableSeeder::class);
		$this->call(UserTableSeeder::class);

		factory(App\Aircraft::class, 100)->create();

		$this->call(FlightTableSeeder::class);

    }
}
