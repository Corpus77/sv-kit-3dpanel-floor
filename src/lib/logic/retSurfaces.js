export default {
	// Get surface array
   walls() {
		return document.querySelectorAll('.wall');
	},
	 floor() {
		return document.querySelectorAll('.floor');
	},
	 ceil() {
		return document.querySelectorAll('.ceil');
	},

	// Get surface type panels array
	 allPanels() {
		return document.querySelectorAll('.allPanels');
	},
	 panel() {
		return document.querySelectorAll('.panel');
	},
	 panelFloor() {
		return document.querySelectorAll('.panel-floor');
	},
	panelCeil () {
		return document.querySelectorAll('.panel-ceil');
	},
	// Calculating panel size
	panelSize(surface) {
		return surface[0].offsetHeight / 4 - 0.4;
	}
}