<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
            $table->integer('aircraft_id')->unsigned();
			$table->foreign('aircraft_id')->references('id')->on('aircraft');
			$table->date('date')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->string('departure');
			$table->string('arrival');
			$table->integer('landings');
			$table->integer('day_fullstop')->default(0);
			$table->integer('night_fullstop')->default(0);
			$table->double('total_time');
			$table->double('pic')->default(0);
			$table->double('sic')->default(0);
			$table->double('solo')->default(0);
			$table->double('night')->default(0);
			$table->double('cross_country')->default(0);
			$table->double('actual_instrument')->default(0);
			$table->double('simulated_instrument')->default(0);
			$table->integer('holds')->default(0);
			$table->integer('approach_count')->default(0);
			$table->double('dual_given')->default(0);
			$table->double('dual_received')->default(0);
			$table->double('simulator')->default(0);
			$table->longText('comment')->nullable();
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
        Schema::dropIfExists('flights');
    }
}
