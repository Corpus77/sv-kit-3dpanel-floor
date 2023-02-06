import { walls, floor, ceil, allPanels, panelSize } from '$lib/logic/retSurfaces.js';

// ----------------------------------------------

function removePanels(surface) {
	surface.forEach((item) => {
		item.remove();
	});
}

function styleCommonPanels(toCreate) {
	toCreate.style.width = panelSize(walls()) + 'px';
	toCreate.style.height = panelSize(walls()) + 'px';
	toCreate.style.backgroundSize = 'contain';
	toCreate.classList.add('allPanels');
	toCreate.style.position = 'relative';
	// ! border for visual check
	// toCreate.style.border = '1px solid black';

	allPanels().forEach((item) => {
		item.style.transition = '1.5s';
		let counter = 2;
		item.oncontextmenu = function (e) {
			e.preventDefault();
			//

			if (counter % 2 == 0) {
				console.log('menu');
				item.style.transform = 'rotate(90deg)';
			} else {
				item.style.transform = 'rotate(0deg)';
			}
			counter++;

			//
		};
	});
}

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

function btnHeaderActive(btn, modal, btnHeaderArr) {
	setTimeout(function () {
		if (modal) {
			btn.classList.remove('non-activeapp');
		} else {
			btn.classList.add('non-activeapp');
		}
		btnHeaderArr.forEach((item) => {
			if (item != btn) {
				item.classList.add('non-activeapp');
			}
		});
	}, 10);
}
function btnRemoveActive(btnHeaderArr) {
	btnHeaderArr.forEach((item) => {
		item.classList.add('non-activeapp');
	});
}
//! For plintus
//* Filling plintus
function fillPlintus(surface) {
	const plintus = document.querySelector(`.${surface}`);
	for (let i = 0; i <= 5; i++) {
		const plintusItem = document.createElement('div');
		plintusItem.classList.add('panel');
		plintusItem.style.width = plintus.offsetWidth / 4 + 'px';

		//  plintusItem.style.border = '1px solid black';

		plintus.append(plintusItem);
	}
}
//! non-visible when click on anything but that modal. problem with parent when body
function bodyClick(e, buttonclass, thisClass) {
	if (
		!e.target.classList.contains(buttonclass) &&
		!e.target.classList.contains(thisClass) &&
		!e.target.parentNode.classList.contains(thisClass)
	) {
		return false;
	} else {
		return true;
	}
}
function panelMove(size) {
	return document.querySelector('.panel')[size] / 2;
}
function moveParityColumns(surface, moveUnit, direction, parity, cycleStart, cycleEnd) {
	for (let item = cycleStart; item < cycleEnd; item++) {
		if (item % parity == 0) {
			surface[item].style[direction] = moveUnit + 'px';
		}
	}
}

export {
	removePanels,
	styleCommonPanels,
	initWallPanelAdd,
	initFloorPanelAdd,
	initCeilPanelAdd,
	fillPlintus,
	btnRemoveActive,
	btnHeaderActive,
	bodyClick,
	panelMove,
	moveParityColumns
};
