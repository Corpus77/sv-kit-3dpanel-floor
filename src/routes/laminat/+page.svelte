<script>
	
	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Buttonmoveleft from '$lib/components/Buttonmoveleft.svelte';
	import Buttonmoveup from '$lib/components/Buttonmoveup.svelte';
	import {
		btnHeaderActive,
		panelMove,
		moveParityColumns,
		removePanels
	} from '$lib/logic/functions';
	import { floor, panel } from '$lib/logic/retSurfaces.js';

	let btnHeaderArr;
	let globalSurface = 'laminat';
	let modalVisible = false;
	let fillAllFlag = false;
	{
	}
	let url = '';
	let urlWall = './textures/';
	
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
		if (fillAllFlag && globalSurface == 'laminat' ) {
			fillAll(floor());
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'laminat' ) {
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

		<Buttonmoveleft surface={floor} {moveParityColumns}  {panelMove}  {panel} />
		<Buttonmoveup {moveParityColumns}  {panelMove}  {panel} />
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
	
	
	
	
	.range {
		appearance: none;
		background: rgb(36, 0, 35);
		background: linear-gradient(
			90deg,
			rgb(18, 227, 241) 27%,
			/* rgb(31, 80, 212) 52%, */ rgb(15, 245, 149) 78%,
			rgba(0, 212, 255, 1) 100%
		);
		height: 10%;
		/* border: 1px solid black; */
		border-style: none;
		border-radius: 5px;
		box-shadow: 2px 2px 3px;
	}
</style>
