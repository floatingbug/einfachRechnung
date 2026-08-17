export default {
	primary: {
		color: '{indigo.500}',
		contrastColor: '#ffffff',
		hoverColor: '{indigo.600}',
		activeColor: '{indigo.700}',
	},

	surface: {
		0: '#ffffff',
		50: 'light-dark({zinc.50}, {zinc.950})',
		100: 'light-dark({zinc.100}, {zinc.900})',
		200: 'light-dark({zinc.200}, {zinc.800})',
		300: 'light-dark({zinc.300}, {zinc.700})',
		400: 'light-dark({zinc.400}, {zinc.600})',
		500: 'light-dark({zinc.500}, {zinc.500})',
		600: 'light-dark({zinc.600}, {zinc.400})',
		700: 'light-dark({zinc.700}, {zinc.300})',
		800: 'light-dark({zinc.800}, {zinc.200})',
		900: 'light-dark({zinc.900}, {zinc.100})',
		950: 'light-dark({zinc.950}, {zinc.50})',
	},

	highlight: {
		background: '{primary.color}',
		focusBackground: '{primary.hoverColor}',
		color: '{primary.contrastColor}',
		focusColor: '{primary.contrastColor}',
	},
}
