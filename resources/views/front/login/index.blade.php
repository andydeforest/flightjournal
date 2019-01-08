<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<title>FlightJournal</title>
		<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/app.css') }}">

		<style type="text/css">
			body {
				background-color: #DADADA;
				background: url('{{ URL::asset('images/bg'.rand(1, 3).'.jpg') }}') no-repeat center center fixed; 
				-webkit-background-size: cover;
				-moz-background-size: cover;
				-o-background-size: cover;
				background-size: cover;

			}
			body > .grid {
				height: 100%;
			}
			.logo {
				padding: 10px;
			}
			.column {
				max-width: 450px;
			}
		</style>
	</head>
	<body>
		<div class="ui middle aligned center aligned grid">
			<div class="column">
				<form class="ui large form" action="{{ URL::current() }}" method="POST">
					{{ csrf_field() }}
					<div class="ui stacked segment">

						<img src="{{ URL::asset('images/logo-teal.png') }}" class="image logo">

						@if(session('status'))
							<div class="ui negative message">
								{{ session('status') }}
							</div>
						@endif
						<div class="field">
							<div class="ui left icon input">
								<i class="user icon"></i>
								<input type="text" name="email" placeholder="E-mail address">
							</div>
						</div>
						<div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i>
								<input type="password" name="password" placeholder="Password">
							</div>
						</div>
						<div class="field">
							<div class="ui left icon checkbox">
								<input type="checkbox" name="remember" tabindex="0" class="hidden">
								<label>Remember?</label>
							</div>
						</div>
						<button type="submit" class="ui fluid large teal submit button">Login</button>
					</div>
				</form>
				<div class="ui message">
					New to us? <a href="#">Sign Up</a>
				</div>
			</div>
		</div>
		<script src="{{ URL::asset('js/app.js') }}"></script>
		<script type="text/javascript">
			$('.ui.checkbox').checkbox();
		</script>
	</body>
</html>
