<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import { btnHeaderActive, btnRemoveActive } from '$lib/logic/functions.js';
	import { walls, panel } from '$lib/logic/retSurfaces.js';
	import Buttonplintusup from '$lib/components/Buttonplintusup.svelte';
	import Buttonplintusdown from '$lib/components/Buttonplintusdown.svelte';
	import Plintusup from '$lib/components/Plintusup.svelte';
	import Plintusdown from '$lib/components/Plintusdown.svelte';
	import Instr from '../../lib/components/Instr.svelte';
	import Instrbutton from '../../lib/components/Instrbutton.svelte';
	import {bodyClick} from '$lib/logic/functions'
	let modalVisible = false;
	let fillAllFlag = true;
	let plintusUpFlag = false;
	let plintusDownFlag = false;
	let globalSurface = 'wall';
	let btnHeaderArr;
	let url = '';
	let urlWall = './textures/';
	let instrVisible = false;
	let instruction = "1. Кнопка -На все кирпичи- позволяет разместить кирпичик из выбранной панели на всю стену 2. Кнопка -Одна панель- позволяет помещать кирпичик из выбранной панели в нужное для вас место путём нажатия правой кнопкой мыши в выбранном месте стены. 3. -Плинтус вверх- и -Плинтус вниз- добавляют выбранный плинтус соответсвенно вверх и вниз. 4. -Очистить стену- очищает всю стену."
	//_________________________________________________

	
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
		//TODO: plintus section
		else if (fillAllFlag && globalSurface == 'plintusUp') {
			plintusUpFlag = true;
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusUp').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				});
			});
		} else if (fillAllFlag && globalSurface == 'plintusDown') {
			plintusDownFlag = true;
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusDown').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				});
			});
		}

		modalVisible = false;
		fillAllFlag = false;
	}
	//__________________________________________

	//______________________________________________________
	onMount(() => {
		document.onclick = (e) => {
			instrVisible = bodyClick(e, 'instr', 'instruction');
			
		};
		btnHeaderArr = document.querySelectorAll('.btn-header');
		// add bricks to the wall
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
	}
	);
</script>

<div class="container">
	<header>
		<Buttonall
			buttonText="На все кирпичи"
			on:fillAll={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = true;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				globalSurface = 'wall';
				plintusDownFlag = plintusUpFlag = false;
			}}
		/>
		<Buttonone
			buttonText="Один кирпич"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = false;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				globalSurface = 'wall';
				plintusDownFlag = plintusUpFlag = false;
			}}
		/>
		<!-- TODO:  Plintus section-->
		<Buttonplintusup
			buttonText="Плинтус верх"
			on:plintusup={function (event) {
				if (event.detail.classList.contains('non-activeapp')) {
					modalVisible = !modalVisible;
					fillAllFlag = true;
					globalSurface = 'plintusUp';
					//btnHeaderActive(event.detail);
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				} else {
					plintusUpFlag = false;
					btnRemoveActive(btnHeaderArr);
				}
			}}
		/>

		<Buttonplintusdown
			buttonText="Плинтус вниз"
			on:plintusdown={function (event) {
				if (event.detail.classList.contains('non-activeapp')) {
					modalVisible = !modalVisible;
					fillAllFlag = true;
					globalSurface = 'plintusDown';
					//btnHeaderActive(event.detail);
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				} else {
					plintusDownFlag = false;
					btnRemoveActive(btnHeaderArr);
				}
			}}
		/>

		<Buttonclear
			buttonText="Очистить стену"
			on:clearAll={(event) => {
				panel().forEach((item) => {
					item.style.background = 'none';
				});
			}}
		/>
		<Instrbutton bind:instrVisible bgcolor = 'rgb(85, 77, 195)' color = 'wheat'></Instrbutton>
		
	</header>
	<div class="wall">
		{#if plintusUpFlag}
			<Plintusup />
		{/if}
		{#if plintusDownFlag}
			<Plintusdown />
		{/if}
	</div>
	{#if instrVisible}
		<Instr instrText = {instruction}></Instr>
	{/if}
	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	header {
		min-height: 10%;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 99vw;
		height: 91vh;
		background: grey;
		border: 1px solid grey;
	}
	.wall {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		width: 80%;
		height: 75%;
		margin-top: 1%;
		border: 1px solid black;
		background: lightgrey;
		box-shadow: 15px 16px 4px black;
		overflow: hidden;
	}
	
</style>
