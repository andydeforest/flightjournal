<?php

namespace App\Http\Middleware;

use Closure;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

		if(!$request->user()) {
			return response()->json(['success' => false, 'message' => 'Could not authenticate user']);
		}

        return $next($request);
    }
}
