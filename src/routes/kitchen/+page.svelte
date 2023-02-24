<script>
	import Modal from './../../lib/components/Modal.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Buttonall from '../../lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import { btnHeaderActive } from '$lib/logic/functions.js';

	import { onMount } from 'svelte';
	let btnHeaderArr = [];
	let modalVisible = false;
	let globalSurface = 'wall';
	let url = '';
	let surface;
	let fillAllFlag = false;
	function fartuk() {
		return document.querySelector('.fartuk');
	}
	function fartukSize() {
		return fartuk().offsetHeight / 2 - 1 + 'px';
	}
	function panelChoice(event) {
		url = event.detail;
		modalVisible = !modalVisible;
		if (fillAllFlag) {
			fartuk().childNodes.forEach((item) => {
				item.style.backgroundImage = `url(./textures/${url})`;
			});
			fillAllFlag = false;
		}
		console.log(url);
	}
	onMount(() => {
		let rotateFlag = true;
		document.body.onresize = function () {
			document.querySelectorAll('.panel').forEach((item) => {
				item.style.minWidth = fartukSize();
				item.style.minHeight = fartukSize();
				console.log();
			});
		};
		surface = document.querySelector('.kitchenContainer');
		surface.onclick = function (e) {
			e.target.style.backgroundImage = `url(./textures/${url})`;
		};
		surface.ondblclick = function (e) {
			e.target.style.backgroundImage = 'none';
		};
		surface.oncontextmenu = function (e) {
			e.preventDefault();
			if (rotateFlag) {
				e.target.style.transform = 'rotate(90deg)';
				rotateFlag = false;
			} else {
				e.target.style.transform = 'rotate(0deg)';
				rotateFlag = true;
			}
		};
		for (let i = 0; i < 30; i++) {
			const panel = document.createElement('div');
			panel.classList.add('panel');
			panel.style.backgroundSize = 'contain';
			panel.style.minWidth = fartukSize();
			panel.style.minHeight = fartukSize();
			// panel.style.position = 'relative';
			panel.style.transition = '1s';
			// panel.style.border = '1px solid red';
			fartuk().append(panel);
		}
	});
</script>

<div class="container">
	<header>
		<Buttonall
			buttonText="На всю стену"
			on:fillAll={(e) => {
				modalVisible = !modalVisible;
				fillAllFlag = true;
			}}
		/>
		<Buttonclear
			buttonText="Очистить стену"
			on:clearAll={(event) => {
				fartuk().childNodes.forEach((item) => {
					item.style.backgroundImage = 'none';
				});
			}}
		/>
		<Buttonone
			buttonText="Одна панель"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;

				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
			}}
		/>
	</header>
	<div class="kitchenContainer">
		<div class="mebel-container">
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
		</div>
		<!-- ----- -->
		<div class="fartuk" />
		<!-- ------------- -->
		<div class="mebel-container">
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
			<div class="mebel-item">
				<div class="mebel_itemdoor"><div class="handle" /></div>
				<div class="mebel_itemdoor"><div class="handle" /></div>
			</div>
		</div>
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
		/* width: 98.5vw; */
		height: 91vh;
	}
	header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 10%;
		background: rgb(168, 125, 6);
		border: 1px solid black;
		z-index: 10;
	}
	.kitchenContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 89%;
		border: 1px solid black;
		/* background-size: auto 25%; */
	}
	.mebel-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 30%;
		border: 1px solid black;
		box-shadow: 0px 5px 15px;
		z-index: 1;
	}
	.mebel-item {
		display: flex;
		height: 100%;
		min-width: 25%;
		padding: 1%;
		border: 1px solid black;
		z-index: 2;
		background: white;
		background-size: auto 95%;
	}
	.mebel_itemdoor {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 99%;
		height: 99%;
		z-index: 3;
		outline: 2px solid;
		background: white;
		background-size: contain;
	}
	.handle {
		margin-right: 3%;

		width: 4%;
		height: 25%;
		border: 1px solid;
		background: white;
		z-index: 10;
	}

	.fartuk {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
		height: 40%;
		background-size: 6px 6px;
		background: grey;
		overflow: hidden;
	}
</style>
