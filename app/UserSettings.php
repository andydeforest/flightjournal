<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model {
	
	protected $table = 'user_settings';
	
	protected $fillable = ['display_total_time', 'display_pic', 'display_sic', 'display_dual_given', 'display_dual_received', 'display_solo', 'display_simulator', 'display_actual_instrument', 'display_simulated_instrument', 'display_night', 'display_cross_country', 'display_holds', 'display_appraches', 'display_landings', 'display_departure', 'display_arrival', 'display_category', 'display_type', 'display_registration', 'display_date'];
}
