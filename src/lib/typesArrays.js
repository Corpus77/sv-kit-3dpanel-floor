//  Array of object`s panels for walls
import {
	filenamesBrick,
	filenamesDecBrick,
	filenamesBambook,
	filenamesEk,
	filenamesKladka,
	filenamesMramor,
	filenamesStone,
	filenamesWood,
	filenamesVintage,
	filenamesCeil,
	filenamesVinilWall
} from 'filenames.js';
import { filenamesPuzzles, filenamesVinil, filenamesPuzzlesButton } from 'filenamesfloor';
import { filenamesPlintus } from 'filenamesplintus';
const wallArray = [
	{
		type: 'simpleBrick',
		visible: false,
		title: 'Кирпич',
		imgArr: filenamesBrick
	},
	{
		type: 'decBrick',
		visible: false,
		title: 'Декоративный кирпич',
		imgArr: filenamesDecBrick
	},
	{
		type: 'ekBrick',
		visible: false,
		title: 'Екатеринославский кирпич',
		imgArr: filenamesEk
	},
	{
		type: 'kladka',
		visible: false,
		title: 'Кладка',
		imgArr: filenamesKladka
	},
	{
		type: 'mramor',
		visible: false,
		title: 'Мрамор',
		imgArr: filenamesMramor
	},
	{
		type: 'bambook',
		visible: false,
		title: 'Бамбук',
		imgArr: filenamesBambook
	},
	{ type: 'stone', visible: false, title: 'Камень', imgArr: filenamesStone },
	{ type: 'wood', visible: false, title: 'Дерево', imgArr: filenamesWood },
	{
		type: 'vintage',
		visible: false,
		title: 'Винтаж',
		imgArr: filenamesVintage
	},
	{
		type: 'ceil',
		visible: false,
		title: 'Потолочные',
		imgArr: filenamesCeil
	},
	{
		type: 'vinil',
		visible: false,
		title: 'Виниловая плитка',
		imgArr: filenamesVinilWall
	}
];
// Array of object`s items for floor
const floorArray = [
	{
		type: 'pazzles',
		visible: false,
		title: 'Пол-пазл',
		imgArr: filenamesPuzzles
	},

	{
		type: 'vinil',
		visible: false,
		title: 'Виниловая плитка',
		imgArr: filenamesVinil
	}
];
const laminatArray = [
	{
		type: 'vinil',
		visible: false,
		title: 'Виниловая плитка',
		imgArr: filenamesVinilWall
	}
];
const plintusArray = [
	{
		type: 'gluePlintus',
		visible: false,
		title: 'Самоклеющийся плинтус',
		imgArr: filenamesPlintus
	}
];
export { wallArray};
export { floorArray};
export {laminatArray};
export {plintusArray} ;
