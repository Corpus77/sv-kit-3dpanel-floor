<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';

	import { walls, panel } from '$lib/logic/retSurfaces.js';
	let modalVisible = false;
	let fillAllFlag = true;
	let globalSurface = 'wall';
	let btnHeaderArr;
	let url = '';
	let urlWall = './textures/';
	//_________________________________________________

	//--------------------------------------------------
	function fillAll() {
		panel().forEach((item) => {
			item.style.background = `url(${urlWall}${url}`;
		});
	}
	//-------------------------------------------------
	function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && globalSurface == 'wall') {
			fillAll(walls());
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'wall') {
			walls().forEach((item) => {
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
	//__________________________________________
	function btnHeaderActive(event) {
		setTimeout(function () {
			if (modalVisible) {
				event.classList.remove('non-activeapp');
			} else {
				event.classList.add('non-activeapp');
			}
			btnHeaderArr.forEach((item) => {
				if (item != event) {
					item.classList.add('non-activeapp');
				}
			});
		}, 10);
	}
	//______________________________________________________
	onMount(() => {
		btnHeaderArr = document.querySelectorAll('.btn-header');
		//add bricks to the wall
		for (let i = 0; i < 400; i++) {
			let brick = document.createElement('div');
			brick.className = 'panel';
			brick.style.position = 'relative';
			brick.style.width = 4.6 + 'vw';
			brick.style.height = 'auto';
			brick.style.border = '1px solid rgb(114, 91, 91)';
			brick.style.overflow = 'hidden';

			walls()[0].appendChild(brick);
		}
		//move parity rows
		let row = 0;
		for (let i = 0; i < 400; i++) {
			if (i % 32 == 0) {
				for (let row = 0; row < 16; row++) {
					walls()[0].children[i + row].style.left = 3 + '%';
				}
			}
		}
	});
</script>

<div class="container">
	<header>
		<Buttonall
			buttonText="На все стены"
			on:fillAll={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = true;
				btnHeaderActive(event.detail);
			}}
		/>
		<Buttonone
			buttonText="Одна панель"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = false;
				btnHeaderActive(event.detail);
			}}
		/>

		<Buttonclear
			buttonText="Очистить стены"
			on:clearAll={(event) => {
				panel().forEach((item) => {
					item.style.background = 'none';
				});
			}}
		/>
	</header>
	<div class="wall" />
	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 99vw;
		height: 98vh;
		background: grey;
		border: 1px solid grey;
	}
	.wall {
		display: flex;
		flex-wrap: wrap;
		width: 80%;
		height: 70%;
		margin-top: 1%;
		border: 1px solid black;
		background: lightgrey;
		box-shadow: 15px 16px 4px black;
		overflow: hidden;
	}
</style>
