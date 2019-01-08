import * as Yup from 'yup';

const MESSAGES = {
	Required: 'Required',
	Min: 'Too short',
	Max: 'Too long',
	Number: 'Must be a number',
	Date: 'Must be a date',
	TimeMin: 'Must be at least 0.01',
	Integer: 'Must be an integer',
	QtyMin: 'Must be at least 1',
	Positive: 'Must be a positive integer'
}

const FlightTimes = Yup.object().shape({
	total_time: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.required(MESSAGES.Required)
		.min(0.01, MESSAGES.TimeMin),
	pic: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	cross_country: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	dual_recieved: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	night: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	actual_instrument: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	simulated_instrument: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	solo: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	sic: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	dual_given: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
	simulator: Yup.number()
		.typeError(MESSAGES.Number)
		.positive()
		.min(0.01, MESSAGES.TimeMin),
});

  export default FlightTimes;