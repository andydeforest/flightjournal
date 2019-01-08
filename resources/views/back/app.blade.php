<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>FlightJournal</title>
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" name="viewport" />
		<meta name="csrf-token" content="{{ csrf_token() }}">
		@yield('top_scripts')
	</head>
	<body>
		<div id="app"></div>
		<script src="{{ URL::asset('js/client.js') }}" type="text/javascript"></script>
		@yield('bottom_scripts')
	</body>
</html>