// Get surface array
function walls() {
	return document.querySelectorAll('.wall');
}
function floor() {
	return document.querySelectorAll('.floor');
}
function ceil() {
	return document.querySelectorAll('.ceil');
}

// Get surface type panels array
function allPanels() {
	return document.querySelectorAll('.allPanels');
}
function panel() {
	return document.querySelectorAll('.panel');
}
function panelFloor() {
	return document.querySelectorAll('.panel-floor');
}
function panelCeil() {
	return document.querySelectorAll('.panel-ceil');
}
// Calculating panel size
function panelSize(surface) {
	return surface[0].offsetHeight / 4 - 0.4;
}

export { walls, floor, ceil, allPanels, panel, panelFloor, panelCeil, panelSize };
