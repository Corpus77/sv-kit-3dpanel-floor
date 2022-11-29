<script>
	import Modal from '$lib/components/Modal.svelte';
	import { walls, allPanels, panel, panelSize } from '$lib/logic/retSurfaces.js';

	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import { initWallPanelAdd, styleCommonPanels, removePanels } from '$lib/logic/functions';

	//----------------------------------------
	let modalVisible = false;
	let fillAllFlag = true;
	let globalSurface = 'wall';
	let btnHeaderArr;
	let blockFlag = false;
	let url = '';
	let urlWall = './textures/';
	//----------------------------------
	let wall_1_panels;
	let wall_2_panels;
	//----------------------------------
	let proportionValue = 50;
	function wall_1Ret() {
		return document.querySelector('.wall_1');
	}
	//__________________________________________
	function wallSeperateVars() {
		wall_1_panels = Array.from(document.getElementsByClassName('wall_1')[0].children);
		wall_2_panels = Array.from(document.getElementsByClassName('wall_2')[0].children);
	}
	function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && blockFlag && globalSurface == 'wall') {
			fillAll(document.querySelectorAll('.wall_2'));
			url = event.detail;
		} else if (fillAllFlag && !blockFlag && globalSurface == 'wall') {
			fillAll(document.querySelectorAll('.wall_1'));
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'wall') {
			walls().forEach((item) => {
				item.onclick = function (e) {
					url = urlWall + event.detail;
					e.target.style.backgroundImage = `url(${url})`;
				};
			});
		}
		modalVisible = false;
		fillAllFlag = false;
	}
	//__________________________________________________
	function addPanel(wallsArg) {
		wallsArg.forEach((item) => {
			for (let i = 0; i < 165; i++) {
				let panel = document.createElement('div');
				styleCommonPanels(panel);

				panel.classList.add('panel');
				panel.style.backgroundImage = `url(${urlWall}${url}`;
				item.append(panel);
			}
		});
	}
	//________________________________________
	function fillAll(surface) {
		wallSeperateVars();
		if (blockFlag) {
			removePanels(wall_2_panels);
		} else {
			removePanels(wall_1_panels);
		}
		addPanel(surface);
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

	//--------------------------------------------
	function teeth_blockRet() {
		return document.querySelector('.teeth_block');
	}
	//--------------------------------------------
	function bricksRet() {
		return document.querySelectorAll('.brick');
	}
	//--------------------------------------------
	onMount(() => {
		teeth_blockRet().classList.remove('teeth_active');

		btnHeaderArr = document.querySelectorAll('.btn-header');

		//----- initial add panels
		initWallPanelAdd();
		//----- separate array panels of 2 walls, after init.
		wallSeperateVars();
		window.onresize = function () {
			allPanels().forEach((item) => {
				item.style.width = panelSize(walls()) + 'px';
				item.style.height = panelSize(walls()) + 'px';
			});
		};
	});
</script>

<div class="container">
	<div class="header">
		<button class="orientation">Вертикально/Горизонтально</button>
		<div class="btn_wrapper btn_wrapper1">
			<p>Стена 1</p>
			<Buttonall
				buttonText="На всю стену"
				on:fillAll={(event) => {
					modalVisible = !modalVisible;
					fillAllFlag = true;
					blockFlag = false;
					btnHeaderActive(event.detail);
				}}
			/>

			<Buttonclear
				buttonText="Очистить стену"
				on:clearAll={(event) => {
					wallSeperateVars();
					removePanels(wall_1_panels);
					initWallPanelAdd();
				}}
			/>
		</div>
		<Buttonone
			buttonText="Одна панель"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = false;
				btnHeaderActive(event.detail);
			}}
		/>
		<div class="btn_wrapper btn_wrapper2">
			<p>Стена 2</p>
			<Buttonall
				buttonText="На всю стену"
				on:fillAll={(event) => {
					modalVisible = !modalVisible;
					fillAllFlag = true;
					blockFlag = true;
					btnHeaderActive(event.detail);
				}}
			/>

			<Buttonclear
				buttonText="Очистить стену"
				on:clearAll={(event) => {
					wallSeperateVars();
					removePanels(wall_2_panels);
					initWallPanelAdd();
				}}
			/>
		</div>

		<div class="range">
			<span>Пропорция</span>
			<input
				type="range"
				class="proportion"
				min="50"
				max="100"
				bind:value={proportionValue}
				on:input={(wall_1Ret().style.minWidth = proportionValue + '%')}
			/>
		</div>

		<button
			class="teeth"
			on:click={function () {
				bricksRet().forEach((item) => {
					item.remove();
				});
				teeth_blockRet().classList.toggle('teeth_active');
				let counter = 1;
				wallSeperateVars();
				for (let i = 0; i < 40; i++) {
					const tooth = document.createElement('div');
					tooth.style.height = 3 + '%';
					
					tooth.classList.add('brick');
					// tooth.style.border = '1px solid black';
					teeth_blockRet().append(tooth);
					//**********

					if (url) {
						if (counter % 2 == 0) {
							tooth.style.backgroundImage = wall_1_panels[0].style.backgroundImage;
							
							 
						} else {
							tooth.style.backgroundImage = wall_2_panels[0].style.backgroundImage;
							
							
						}
						counter++;
					}
				}
			}}>Зубцы</button
		>
	</div>
	<div class="container-wall">
		<div class="wall wall_1" />
		<div class="teeth_block teeth_active" />
		<div class="wall wall_2" />
	</div>
	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		width: 90vw;
		height: 19%;
		margin-bottom: 1%;
		border: 1px solid black;
		
	}
	.btn_wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;
		height: 30%;
	}
	button {
		padding: 0.2%;
		font-weight: bolder;
		letter-spacing: 0.1em;
		margin: 0.2em;
		border: 2px solid darkgoldenrod;
		cursor: pointer;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		gap: 5px;
		width: 98vw;
		height: 93vh;
		background-color: darkgrey;
	}
	.container-wall {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 90vw;
		height: 79%;
		border: 1px solid black;
	}

	.horizontal {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.wall {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 50%;
		height: 100%;
		background-size: 20%;
		/* border: 1px solid black; */
		overflow: hidden;
	}

	.teeth_block {
		display: none;
		max-width: 3%;
		height: 100%;

		/* border: 1px solid black; */
	}
	.teeth_active {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 3vw;
		height: 100%;
		/* border: 1px solid black; */
		flex-shrink: 0;
	}
	

	

	.proportion {
		margin-left: 3%;
	}
	.range {
		display: flex;
		margin: 10px;
		font-size: 1.3vw;
		color: darkred;
	}
	input {
		cursor: pointer;
	}
	/* webcommon-------------------- */
	.choiceAppear {
		display: flex !important;
		flex-wrap: wrap;
		justify-content: center;
		overflow: scroll;
	}
	.winChoice {
		display: none;
		position: absolute;
		width: 60%;
		height: 80%;
		right: 2%;
		top: 15%;
		background-color: blanchedalmond;
		border: 1px solid black;
	}
	.example_container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 2%;
		width: 25%;
		height: auto;
		cursor: pointer;
	}
	.item_paragr {
		color: black;
		font-size: 1em;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* media request */
	@media screen and (max-width: 830px) {
		.item_paragr,
		span {
			font-size: 0.7em;
		}
	}
</style>
