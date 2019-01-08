import axios from 'axios'

const URL = 'http://flightjournal.local/';

const Flight = {
	all: () => {
		return axios.get(URL + 'api/flights');
	},
	get: id => {
		return axios.get(URL + 'api/flight/' + id);
	},
	create: data => {
		return axios.post(URL + 'api/flight/create', data);
	},
	update: data => {
		return axios.post(URL + 'api/flight/update', data);
	}
}

const User = {
	get: () => {
		return axios.get(URL + 'api/user');
	},
	time: () => {
		return axios.get(URL + 'api/user/time');
	},
	map_data: () => {
		return axios.get(URL + 'api/user/map');
	}
}

const Settings = {
	get: () => {
		return axios.get(URL + 'api/settings');
	},
	update: data => {
		return axios.post(URL + 'api/settings', data);
	}
}

const Aircraft = {

}

const Goal = {

}

export default {
	URL,
	Flight,
	User,
	Settings,
	Aircraft,
	Goal
}