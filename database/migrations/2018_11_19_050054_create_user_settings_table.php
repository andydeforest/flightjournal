<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_settings', function (Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->boolean('display_total_time')->default(true);
			$table->boolean('display_pic')->default(true);
			$table->boolean('display_sic')->default(true);
			$table->boolean('display_dual_given')->default(true);
			$table->boolean('display_dual_received')->default(true);
			$table->boolean('display_solo')->default(true);
			$table->boolean('display_simulator')->default(true);
			$table->boolean('display_actual_instrument')->default(true);
			$table->boolean('display_simulated_instrument')->default(true);
			$table->boolean('display_night')->default(true);
			$table->boolean('display_cross_country')->default(true);
			$table->boolean('display_holds')->default(true);
			$table->boolean('display_approach_count')->default(true);
			$table->boolean('display_landings')->default(true);
			$table->boolean('display_departure')->default(true);
			$table->boolean('display_arrival')->default(true);
			$table->boolean('display_category')->default(true);
			$table->boolean('display_type')->default(true);
			$table->boolean('display_registration')->default(true);
			$table->boolean('display_date')->default(true);
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
        Schema::dropIfExists('user_settings');
    }
}
