<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserSettings;

class SettingsController extends Controller {
	
	public function get(Request $request) {
		return response()->json([
			'success' => true,
			'settings' => $request->user()->settings
		]);	
	}

	public function update(Request $request) {
		$settings = UserSettings::find($request->id);

		if($settings) {
			if($settings->user_id !== $request->user()->id) {
				return response()->json([
					'success' => false,
					'message' => 'User settings belong to a different user'
				]);
			}
			$settings->fill($request->all());
			$settings->save();
			return response()->json([
				'success' => true,
				'settings' => $settings
			]);
		} else {
			return response()->json([
				'success' => false,
				'message' => 'User settings not found'
			]);
		}
	}


}
