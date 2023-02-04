<script>
	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { btnHeaderActive, removePanels } from '$lib/logic/functions';
	import { floor, panel } from '$lib/logic/retSurfaces.js';

	let btnHeaderArr;
	let globalSurface = 'floor';
	let modalVisible = false;
	let fillAllFlag = false;
	{
	}
	let url = '';
	let urlWall = './textures/';
	let upDown = 'вверх ';
	let leftRight = 'влево';
	function panelMove(size) {
		return document.querySelector('.panel')[size] / 2;
	}
	function counter() {
		let i = 2;
		return function () {
			return i++;
		};
	}
	let counter1 = counter();
	let counter2 = counter();
	//__________________________________________________
	function fillAll() {
		panel().forEach((item) => {
			item.style.background = `url(${urlWall}${url}`;
			item.style.backgroundSize = '100% 100%';
		});

		floor()[0].style.background = `url(${urlWall}${url}`;
		floor()[0].style.backgroundSize = '10% 10%';
	}
	function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && globalSurface == 'floor') {
			fillAll(floor());
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'floor') {
			floor().forEach((item) => {
				item.onclick = function (e) {
					url = urlWall + event.detail;
					if (e.target.classList.contains('panel')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
				};
			});
		}

		modalVisible = false;
		fillAllFlag = false;
	}

	function initBricks(surface) {
		for (let i = 0; i < 115; i++) {
			let brick = document.createElement('div');
			brick.classList.add('panel');
			brick.style.position = 'relative';
			brick.style.minWidth = 3 + 'vw';
			brick.style.height = 29 + 'vh';
			brick.style.border = '1px solid rgba(200,200,200,0.5)';
			brick.style.overflow = 'hidden';
			brick.style.transition = '0.5s';
			surface[0].appendChild(brick);
		}
	}
	function moveParityColumns(moveUnit, direction, parity, cycleStart, cycleEnd) {
		for (let item = cycleStart; item < cycleEnd; item++) {
			//panel().length - 1
			if (item % parity == 0) {
				panel()[item].style[direction] = moveUnit + 'px';
			}
		}
	}
	onMount(() => {
		// window.onresize = () => {
		// 	moveParityColumns(panelMove());
		// };
		btnHeaderArr = document.querySelectorAll('.btn-header');

		// add bricks to the wall

		setTimeout(() => {
			initBricks(floor());
		}, 500);

		let angle = document.querySelector('#angle');

		angle.oninput = () => {
			floor()[0].style.transform = `rotateX(${angle.value}deg)`;
			console.log('oninput');
		};
	});
</script>

<div class="container">
	<header>
		<Buttonall
			buttonText="На все плитки"
			on:fillAll={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = true;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
			}}
		/>
		<Buttonclear
			buttonText="Очистить пол"
			on:clearAll={(event) => {
				floor()[0].style.background = 'none';
				floor()[0].childNodes.forEach((item) => {
					item.style.background = 'none';
				});
			}}
		/>
		<Buttonone
			buttonText="Одна плитка"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = false;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
			}}
		/>
		<button
			class="parityMove"
			on:click={() => {
				if (counter1() % 2 == 0) {
					moveParityColumns(-panelMove('offsetHeight'), 'top', 2, 0, panel().length - 1);
					upDown = 'вниз\u00A0';
					//console.log('rra');
				} else {
					moveParityColumns(0, 'top', 2, 0, panel().length - 1);
					upDown = 'вверх';
				}
			}}>Сдвиг {upDown}</button
		>
		<button
			class="parityMove"
			on:click={() => {
				if (counter2() % 2 == 0) {
					let rowLength = Math.floor(floor()[0].offsetWidth / panel()[0].offsetWidth);
					moveParityColumns(-panelMove('offsetWidth'), 'left', 1, 0, rowLength);

					moveParityColumns(
						-panelMove('offsetWidth'),
						'left',
						1,
						rowLength + rowLength,
						rowLength * 3
					);
					leftRight = 'вправо';
				} else {
					let rowLength = Math.floor(floor()[0].offsetWidth / panel()[0].offsetWidth);
					moveParityColumns(0, 'left', 1, 0, rowLength);
					moveParityColumns(0, 'left', 1, rowLength + rowLength, rowLength * 3);
					leftRight = 'влево';
				}
			}}>Сдвиг {leftRight}</button
		>

		<input type="range" name="" id="angle" min="0" max="50" value="35" class="range" />
	</header>
	<div class="floorContainer">
		<div class="floor" />
	</div>
	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 98.5vw;
		height: 91vh;
		background-color: rgb(92, 245, 245);
	}
	header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 10%;
		background-color: rgb(161, 249, 161);
	}
	.floorContainer {
		display: flex;
		position: relative;

		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90%;

		perspective: 400px;
		background-color: lightblue;
		border: 1px solid black;
	}
	.floor {
		position: relative;
		display: flex;
		top: 0;
		/* flex-direction: column; */
		flex-wrap: wrap;
		transform-origin: bottom;
		transform-style: preserve-3d;
		transform: rotateX(35deg);
		width: 90%;
		height: 100%;
		background: lightgray;
		overflow: hidden;
		border: 1px solid black;
		box-shadow: 5px 5px 4px black;
	}
	.parityMove {
		position: relative;
		width: 8em;
		padding: 1px;
		font-weight: bold;
		border-style: double;
		border-radius: 5px;
		box-shadow: 2px 2px 1px;
		overflow: hidden;
	}
	.parityMove:hover {
		background-color: rgba(108, 100, 100, 0.326);
	}
	.parityMove:active {
		box-shadow: 0 0 0;
		transform: translateY(2px);
		transition: 0.5s;
	}
	.parityMove:after {
		content: '';
		background: rgba(108, 100, 100, 0.526);
		display: block;
		position: absolute;
		padding-top: 300%;
		padding-left: 350%;
		margin-left: -20px !important;
		margin-top: -120%;
		opacity: 0;
		transition: all 0.5s;
	}
	.parityMove:active:after {
		padding: 0;
		margin: 0;
		opacity: 1;
		transition: 0s;
	}
	.range {
		appearance: none;
		background: rgb(36, 0, 35);
		background: linear-gradient(
			90deg,
			
			rgba(5, 75, 80, 1) 27%,
			rgba(121, 9, 58, 1) 52%,
			rgba(53, 194, 71, 1) 78%,
			rgba(0, 212, 255, 1) 100%
		);
		height: 15%;
		/* border: 1px solid black; */
		border-style: ridge;
		border-radius: 5px;
	}
</style>
