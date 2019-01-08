<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		/*
        Schema::create('airports', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->string('identifier');
			$table->string('icao')->nullable();
			$table->double('latitude');
			$table->double('longitude');
            $table->timestamps();
		});
		*/
		echo 'Airport table migrations disabled\n';
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('airports');
    }
}
