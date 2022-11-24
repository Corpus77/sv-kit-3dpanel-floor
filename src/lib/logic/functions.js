import {
	walls,
	floor,
	ceil,
	allPanels,
	panel,
	panelFloor,
	panelCeil,
	panelSize
} from '$lib/logic/retSurfaces.js';

// ----------------------------------------------


// function panelChoice(event) {
// 	url = event.detail;
// 	if (fillAllFlag && globalSurface == 'wall') {
// 		fillAll(walls());
// 		url = event.detail;
// 	} else if (fillAllFlag && globalSurface == 'floor') {
// 		fillAll(floor());
// 		url = event.detail;
// 	} else if (!fillAllFlag && globalSurface == 'wall') {
// 		walls().forEach((item) => {
// 			item.onclick = function (e) {
// 				url = urlWall + event.detail;
// 				e.target.style.backgroundImage = `url(${url})`;
// 			};
// 		});
// 	} else if (!fillAllFlag && globalSurface == 'floor') {
// 		floor().forEach((item) => {
// 			item.onclick = function (e) {
// 				url = urlFloor + event.detail;
// 				e.target.style.backgroundImage = `url(${url})`;
// 			};
// 		});
// 	}
// 	//------------------------------For ceil
// 	else if (fillAllFlag && globalSurface == 'ceil') {
// 		url = event.detail;

// 		fillAll(ceil());
// 	} else if (!fillAllFlag && globalSurface == 'ceil') {
// 		ceil().forEach((item) => {
// 			item.onclick = function (e) {
// 				url = urlWall + event.detail;
// 				e.target.style.backgroundImage = `url(${url})`;
// 			};
// 		});
// 	}
// 	modalVisible = false;
// 	fillAllFlag = false;
// }
// // --------------------------------------------
// function fillAll(surface) {
// 	if (globalSurface == 'wall') {
// 		removePanels(panel());
// 	} else if (globalSurface == 'floor') {
// 		removePanels(panelFloor());
// 	} else if (globalSurface == 'ceil') {
// 		removePanels(panelCeil());
// 	}

// 	if (globalSurface == 'wall') {
// 		addPanel(surface);
// 	} else if (globalSurface == 'floor') {
// 		addPanel(surface);
// 	} else if (globalSurface == 'ceil') {
// 		addPanel(surface);
// 	}
// }
// //----------------------------------------------
// function removePanels(surface) {
// 	surface.forEach((item) => {
// 		item.remove();
// 	});
// }

function styleCommonPanels(toCreate) {
	toCreate.style.width = panelSize(walls()) + 'px';
	toCreate.style.height = panelSize(walls()) + 'px';
	toCreate.style.backgroundSize = 'contain';
	toCreate.classList.add('allPanels');
	

	allPanels().forEach((item) => {
		item.style.transition = '1.5s';
		let counter = 2;
		item.oncontextmenu = function (e) {
			e.preventDefault();

			if (counter % 2 == 0) {
				console.log('menu');
				item.style.transform = 'rotate(90deg)';
			} else {
				item.style.transform = 'rotate(0deg)';
			}
			counter++;
		};
	});
}

// function addPanel(wallsArg) {
// 	wallsArg.forEach((item) => {
// 		for (let i = 0; i < 165; i++) {
// 			let panel = document.createElement('div');
// 			styleCommonPanels(panel);

// 			if (globalSurface == 'wall') {
// 				panel.classList.add('panel');
// 				panel.style.backgroundImage = `url(${urlWall}${url}`;

// 				item.append(panel);
// 			} else if (globalSurface == 'floor') {
// 				panel.classList.add('panel-floor');
// 				panel.style.backgroundImage = `url(${urlFloor}${url}`;

// 				item.append(panel);
// 			} else if (globalSurface == 'ceil') {
// 				panel.classList.add('panel-ceil');
// 				panel.style.backgroundImage = `url(${urlWall}${url}`;

// 				item.append(panel);
// 			}
// 		}
// 	});
// }
// --------------------------------
// function btnHeaderActive(event) {
// 	setTimeout(function () {
// 		if (modalVisible) {
// 			event.classList.remove('non-activeapp');
// 		} else {
// 			event.classList.add('non-activeapp');
// 		}
// 		btnHeaderArr.forEach((item) => {
// 			if (item != event) {
// 				item.classList.add('non-activeapp');
// 			}
// 		});
// 	}, 10);
// }

function initWallPanelAdd() {
	walls().forEach((item) => {
		for (let i = 0; i < 165; i++) {
			let panel = document.createElement('div');
			styleCommonPanels(panel);

			panel.classList.add('panel');

			item.append(panel);
		}
	});
}
function initFloorPanelAdd() {
	floor().forEach((item) => {
		for (let i = 0; i < 165; i++) {
			let panel = document.createElement('div');
			styleCommonPanels(panel);

			panel.classList.add('panel-floor');

			item.append(panel);
		}
	});
}
function initCeilPanelAdd() {
	ceil().forEach((item) => {
		for (let i = 0; i < 165; i++) {
			let panel = document.createElement('div');
			styleCommonPanels(panel);

			panel.classList.add('panel-ceil');

			item.append(panel);
		}
	});
}
export {
	// panelChoice,
	// fillAll,
	// removePanels,
	styleCommonPanels,
	// addPanel,
	// btnHeaderActive,
	initWallPanelAdd,
	initFloorPanelAdd,
	initCeilPanelAdd,
  // btnHeader
};
