import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './dashboard'
import Logbook from './logbook'
import Preferences from './preferences'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

ReactDOM.render((
	<BrowserRouter>
		<AppLayout>
			<Route exact path="/app" component={Dashboard} />
			<Route exact path="/app/logbook" component={Logbook} />
			<Route exact path="/app/preferences" component={Preferences} />
		</AppLayout>
	</BrowserRouter>
  ), document.getElementById('app'));