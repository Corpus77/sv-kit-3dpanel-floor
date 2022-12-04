<script>
	import Modal from '$lib/components/Modal.svelte';
	import { walls, allPanels, panel, panelSize, wall_1Ret } from '$lib/logic/retSurfaces.js';

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
	let horizontalFlag = false;
	let url = '';
	let urlWall = './textures/';
	//----------------------------------
	let wall_1_panels;
	let wall_2_panels;
	//----------------------------------
	let proportionValue = '50';

	//__________________________________________
	function wallSeperateVars() {
		wall_1_panels = Array.from(document.getElementsByClassName('wall_1')[0].children);
		wall_2_panels = Array.from(document.getElementsByClassName('wall_2')[0].children);
	}
	function panelChoice(event) {
		teeth_blockRet().classList.remove('teeth_active');

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
					if (e.target.classList.contains('panel')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
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
	//___________________________________________

	//--------------------------------------------
	function teeth_blockRet() {
		return document.querySelector('.teeth_block');
	}
	//--------------------------------------------
	function bricksRet() {
		return document.querySelectorAll('.brick');
	}
	//--------------------------------------------
	function contWallRet() {
		return document.querySelectorAll('.container-wall');
	}
	//--------------------------------------------
	onMount(() => {
		// remove classes to toggle
		teeth_blockRet().classList.remove('teeth_active');
		walls().forEach((item) => {
			item.classList.remove('wall_horizontal');
		});

		contWallRet()[0].classList.remove('horizontal');
		//-----------------------------------------
		document.querySelector('.orientation').onclick = () => {
			horizontalFlag = !horizontalFlag;
			contWallRet()[0].classList.toggle('horizontal');
			walls().forEach((item) => {
				item.classList.toggle('wall_horizontal');
			});
			teeth_blockRet().classList.remove('teeth_active');
		};
		//-------------------------------------------

		btnHeaderArr = document.querySelectorAll('.btn-header');

		//----- initial add panels
		initWallPanelAdd();
		//----- separate array panels of 2 walls, after init.
		wallSeperateVars();
		window.onresize = function () {
			if (!horizontalFlag) {
				allPanels().forEach((item) => {
					item.style.width = panelSize(walls()) + 'px';
					item.style.height = panelSize(walls()) + 'px';
				});
			} else {
				allPanels().forEach((item) => {
					item.style.width = panelSize(contWallRet()) + 'px';
					item.style.height = panelSize(contWallRet()) + 'px';
				});
			}
		};
	});
</script>

<div class="container">
	<div class="header">
		<button class="orientation">Положение</button>
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
					teeth_blockRet().classList.remove('teeth_active');
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
					teeth_blockRet().classList.remove('teeth_active');
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
				on:input={function () {
					if (!horizontalFlag) {
						wall_1Ret().style.minWidth = proportionValue + '%';
					} else {
						wall_1Ret().style.minHeight = proportionValue + '%';
					}
				}}
			/>
		</div>

		<button
			class="teeth"
			on:click={function () {
				if (!horizontalFlag) {
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
				}
			}}>Зубцы</button
		>
	</div>
	<div class="container-wall horizontal">
		<div class="wall wall_1 wall_horizontal" />
		<div class="teeth_block teeth_active " />
		<div class="wall wall_2 wall_horizontal" />
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
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 91vh;
		background-color: darkgrey;
	}

	.container-wall {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 90vw;
		height: 75%;
		box-shadow: -2px 2px 3px;
		/* border: 1px solid black; */
	}
	.header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		width: 90vw;
		height: 19%;
		padding: 0.5%;
		margin-bottom: 1%;
		background-color: rgb(136, 136, 126);
		/* border: 1px solid black; */
	}
	.btn_wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		height: auto;
		box-shadow: 2px 2px 2px;
		background-color: rgb(104, 103, 103);
		/* border: 1px solid black; */
	}
	p {
		font-size: 1.7vw;
		font-weight: bold;
	}
	button {
		padding: 0.2%;
		font-weight: bolder;

		letter-spacing: 0.1em;
		margin: 0.2em;
		z-index: 10;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	

	.horizontal {
		flex-direction: column;
		/* justify-content: center;
		align-items: center; */
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
	.wall_horizontal {
		flex-direction: row;

		width: 100%;
		height: 50%;
	}
	.teeth_block {
		display: none;
		max-width: 3%;
		height: 100%;
		flex-shrink: 0;

		/* border: 1px solid black; */
	}

	.teeth_active {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 3vw;
		height: 100%;
		/* border: 1px solid black; */
	}

	.proportion {
		margin-left: 3%;
		z-index: 10;
	}
	.range {
		display: flex;
		/* margin: 10px; */
		font-size: 1.7vw;
		/* color: darkred; */
	}
	input {
		cursor: pointer;
	}

	/* media request */
	@media only screen and (max-width: 538px) {
		.header {
			flex-direction: column;
		}
		p {
			font-size: 0.7em;
		}
	}
</style>
