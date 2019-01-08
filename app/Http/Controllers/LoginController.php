<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {

    public function index() {
		if(Auth::user()) {
			return redirect('app');
		}
		return view('front.login.index');
	}

	public function authenticate(Request $request) {
		$credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials, $request->remember === "on")) {
			return redirect('app');
		}
		return redirect('login')->with('status', 'Credentials Not Found');
	}
}
