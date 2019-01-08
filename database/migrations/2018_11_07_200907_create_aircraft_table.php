<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAircraftTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aircraft', function (Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->string('registration');
			$table->string('manufacturer');
			$table->string('icao');
			$table->string('model');
			$table->string('type'); // aircraft / ftd / atd / ffs // sim
			$table->string('category');
			$table->boolean('complex');
			$table->boolean('constant_speed_prop');
			$table->boolean('retractable_flaps');
			$table->boolean('retractable_landing_gear');
			$table->boolean('tailwheel');
			$table->boolean('high_performance');
			$table->string('engine_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aircraft');
    }
}
