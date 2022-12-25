<script>
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
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Buttonplintusup from '$lib/components/Buttonplintusup.svelte';
	import Buttonplintusdown from '$lib/components/Buttonplintusdown.svelte';
	import Plintusup from '$lib/components/Plintusup.svelte';
	import Plintusdown from '$lib/components/Plintusdown.svelte';
	import Plintusup2 from '../../lib/components/Plintusup2.svelte';
	import Plintusdown2 from '../../lib/components/Plintusdown2.svelte';
	import {
		styleCommonPanels,
		initWallPanelAdd,
		initFloorPanelAdd,
		initCeilPanelAdd,
		removePanels,
		btnHeaderActive,
		btnRemoveActive
	} from '$lib/logic/functions';
	let modalVisible = false;
	let fillAllFlag = true;
	let modalPlintusVisible = false;
	let plintusUpFlag = false;
	let plintusDownFlag = false;
	let plintusUpFlag2 = false;
	let plintusDownFlag2 = false;
	let globalSurface;
	let btnHeaderArr;
	let url = '';
	let urlWall = './textures/';
	let urlFloor = './textures/floor/';

	let wall_1_panels;
	let wall_2_panels;
	// TODO: functions to refactor  ---------------------------
	function consFlags() {
		console.log('plintusUpFlag = ' + plintusUpFlag);
		console.log('plintusDownFlag = ' + plintusDownFlag);
		console.log('plintusUpFlag2 = ' + plintusUpFlag2);
		console.log('plintusDownFlag2 = ' + plintusDownFlag2);
		console.log('____________________________');
	}
	function wallSeperateVars() {
		wall_1_panels = Array.from(document.getElementsByClassName('wall_1')[0].children);
		wall_2_panels = Array.from(document.getElementsByClassName('wall_2')[0].children);
	}
	function allPlintusFalse() {
		plintusUpFlag = plintusDownFlag = plintusUpFlag2 = plintusDownFlag2 = false;
	}
	// TODO: functions to refactor  ---------------------------
	function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && globalSurface == 'wall') {
			fillAll(walls());
			url = event.detail;
		} else if (fillAllFlag && globalSurface == 'floor') {
			fillAll(floor());
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
		} else if (!fillAllFlag && globalSurface == 'floor') {
			floor().forEach((item) => {
				item.onclick = function (e) {
					url = urlFloor + event.detail;
					if (e.target.classList.contains('panel-floor')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
				};
			});
		}
		//------------------------------For ceil
		else if (fillAllFlag && globalSurface == 'ceil') {
			url = event.detail;

			fillAll(ceil());
		} else if (!fillAllFlag && globalSurface == 'ceil') {
			ceil().forEach((item) => {
				item.onclick = function (e) {
					url = urlWall + event.detail;
					if (e.target.classList.contains('panel-ceil')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
				};
			});
		} //TODO: plintus try
		else if (globalSurface == 'plintusUp') {
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusUp').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				}, 100);
			});
			modalPlintusVisible = false;
		} else if (globalSurface == 'plintusDown') {
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusDown').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				}, 100);
			});
			modalPlintusVisible = false;
			//__________ Plintus2 __________________
		} else if (globalSurface == 'plintusUp2') {
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusUp2').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				}, 100);
			});
			modalPlintusVisible = false;
		} else if (globalSurface == 'plintusDown2') {
			url = event.detail;
			setTimeout(() => {
				Array.from(document.querySelector('.plintusDown2').children).forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				}, 100);
			});
			modalPlintusVisible = false;
		}
		modalVisible = false;
		fillAllFlag = false;
	}
	// --------------------------------------------
	function fillAll(surface) {
		if (globalSurface == 'wall') {
			removePanels(panel());
		} else if (globalSurface == 'floor') {
			removePanels(panelFloor());
		} else if (globalSurface == 'ceil') {
			removePanels(panelCeil());
		}

		if (globalSurface == 'wall') {
			addPanel(surface);
		} else if (globalSurface == 'floor') {
			addPanel(surface);
		} else if (globalSurface == 'ceil') {
			addPanel(surface);
		}
	}
	//----------------------------------------------

	function addPanel(wallsArg) {
		wallsArg.forEach((item) => {
			for (let i = 0; i < 165; i++) {
				let panel = document.createElement('div');
				styleCommonPanels(panel);

				if (globalSurface == 'wall') {
					panel.classList.add('panel');
					panel.style.backgroundImage = `url(${urlWall}${url}`;

					item.append(panel);
				} else if (globalSurface == 'floor') {
					panel.classList.add('panel-floor');
					panel.style.backgroundImage = `url(${urlFloor}${url}`;

					item.append(panel);
				} else if (globalSurface == 'ceil') {
					panel.classList.add('panel-ceil');
					panel.style.backgroundImage = `url(${urlWall}${url}`;

					item.append(panel);
				}
			}
		});
	}
	// --------------------------------

	//_______________________________
	onMount(() => {
		btnHeaderArr = document.querySelectorAll('.btn-header');

		//----- initial add panels
		initWallPanelAdd();
		initFloorPanelAdd();
		initCeilPanelAdd();

		//----------------------
		window.onresize = function () {
			allPanels().forEach((item) => {
				item.style.width = panelSize(walls()) + 'px';
				item.style.height = panelSize(walls()) + 'px';
			});
		};
	});
</script>

<div class="container">
	<!-- ! modalPlintusVisible-->
	{#if modalPlintusVisible}
		<div class="modalPlintusVisible">
			<div class="wallButtons wall1Buttons">
				<p>Левая стена</p>
				<Buttonplintusup
					buttonText="Плинтус верх"
					on:plintusup={function (event) {
						//---
						btnHeaderArr = document.querySelectorAll('.btn-header');
						//---
						if (event.detail.classList.contains('non-activeapp')) {
							modalVisible = true;

							globalSurface = 'plintusUp';

							plintusUpFlag = true;
							btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
						} else {
							plintusUpFlag = false;

							modalVisible = false;

							btnRemoveActive(btnHeaderArr);
						}
						// consFlags();
					}}
				/>

				<Buttonplintusdown
					buttonText="Плинтус вниз"
					on:plintusdown={function (event) {
						//---
						btnHeaderArr = document.querySelectorAll('.btn-header');
						//---
						if (event.detail.classList.contains('non-activeapp')) {
							modalVisible = true;

							globalSurface = 'plintusDown';
							plintusDownFlag = true;
							btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
						} else {
							plintusDownFlag = false;

							modalVisible = false;

							btnRemoveActive(btnHeaderArr);
						}
						// consFlags();
					}}
				/>
			</div>
			<div class="wallButtons wall2Buttons">
				<p>Правая стена</p>
				<Buttonplintusup
					buttonText="Плинтус верх"
					on:plintusup={function (event) {
						//---
						btnHeaderArr = document.querySelectorAll('.btn-header');
						//---
						if (event.detail.classList.contains('non-activeapp')) {
							modalVisible = true;
							fillAllFlag = true;
							globalSurface = 'plintusUp2';
							plintusUpFlag2 = true;
							btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
						} else {
							plintusUpFlag2 = false;

							modalVisible = false;

							btnRemoveActive(btnHeaderArr);
						}
						// consFlags();
					}}
				/>

				<Buttonplintusdown
					buttonText="Плинтус вниз"
					on:plintusdown={function (event) {
						//---
						btnHeaderArr = document.querySelectorAll('.btn-header');
						//---
						if (event.detail.classList.contains('non-activeapp')) {
							modalVisible = true;
							fillAllFlag = true;
							globalSurface = 'plintusDown2';
							plintusDownFlag2 = true;
							btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
						} else {
							plintusDownFlag2 = false;

							modalVisible = false;

							btnRemoveActive(btnHeaderArr);
						}
						// consFlags();
					}}
				/>
			</div>
		</div>
	{/if}
	<!-- ! modalPlintusVisible-->
	<header>
		<div class="wallHeader">
			<h4>Стены</h4>
			<button
				class="callPlintus"
				on:click={() => {
					modalPlintusVisible = !modalPlintusVisible;
					console.log('plintus');
				}}>Плинтус</button
			>
			<div class="buttonWrapper">
				<Buttonall
					buttonText="На все стены"
					on:fillAll={(event) => {
						modalVisible = !modalVisible;
						globalSurface = 'wall';
						fillAllFlag = true;
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
				<Buttonclear
					buttonText="Очистить стены"
					on:clearAll={(event) => {
						removePanels(panel());
						initWallPanelAdd();
						allPlintusFalse();
					}}
				/>

				<Buttonone
					buttonText="Одна панель"
					on:onePanel={(event) => {
						modalVisible = !modalVisible;

						globalSurface = 'wall';
						fillAllFlag = false;
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
			</div>
		</div>
		<!-- --------------------------------- -->
		<div class="ceilHeader">
			<h4>Потолок</h4>
			<div class="buttonWrapper">
				<Buttonall
					buttonText="На весь потолок"
					on:fillAll={(event) => {
						modalVisible = !modalVisible;

						globalSurface = 'ceil';
						fillAllFlag = true;

						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
				<Buttonclear
					buttonText="Очистить потолок"
					on:clearAll={(event) => {
						removePanels(panelCeil());
						initCeilPanelAdd();
					}}
				/>

				<Buttonone
					buttonText="Одна панель"
					on:onePanel={(event) => {
						modalVisible = !modalVisible;

						globalSurface = 'ceil';
						fillAllFlag = false;
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
			</div>
		</div>
		<!-- ------------------------------------ -->
		<div class="floorHeader">
			<h4>Полы</h4>
			<div class="buttonWrapper">
				<Buttonall
					buttonText="На весь пол"
					on:fillAll={(event) => {
						modalVisible = !modalVisible;

						globalSurface = 'floor';
						fillAllFlag = true;
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
				<Buttonclear
					buttonText="Очистить пол"
					on:clearAll={(event) => {
						removePanels(panelFloor());
						initFloorPanelAdd();
					}}
				/>
				<Buttonone
					buttonText="Одна плита"
					on:onePanel={(event) => {
						modalVisible = !modalVisible;

						globalSurface = 'floor';
						fillAllFlag = false;
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					}}
				/>
			</div>
		</div>
	</header>

	<div class="roomContainer">
		<div class="ceil" />
		<div class="wall wall_1">
			{#if plintusUpFlag}
				<Plintusup />
			{/if}
			{#if plintusDownFlag}
				<Plintusdown />
			{/if}
		</div>
		<div class="wall wall_2">
			{#if plintusUpFlag2}
				<Plintusup2 />
			{/if}
			{#if plintusDownFlag2}
				<Plintusdown2 />
			{/if}
		</div>
		<div class="floor" />
	</div>

	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		/* width: 98vw; */
		height: 92vh;
		background-color: black;
		overflow: hidden;
	}
	header,
	header > * {
		display: flex;
	}
	header {
		justify-content: space-around;
		align-items: center;
		width: 95%;
		min-height: 15%;
		height: auto;
		gap: 0.5em;
		background-color: rgb(56, 52, 52);
	}
	.wallHeader,
	.floorHeader,
	.ceilHeader {
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: white;
		width: 45%;
		height: 90%;
		background-color: rgb(83, 78, 78);
	}
	h4 {
		color: wheat;
	}
	.buttonWrapper {
		display: flex;
		width: 99%;

		justify-content: space-around;
	}
	.modalPlintusVisible {
		position: absolute;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 40%;
		height: 15%;
		left: 10%;
		top: 15%;
		background-color: aquamarine;
		z-index: 100;
	}
	.wallButtons {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 90%;
		width: 45%;
		background-color: rgb(54, 246, 182);
		/* border: 1px solid black; */
	}

	.roomContainer {
		position: relative;
		perspective: 1250px;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 83%;
		border-top: 2px solid white;
		overflow: hidden;
	}
	.ceil {
		position: absolute;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		top: -6%;
		left: -9%;
		width: 120%;
		height: 75%;
		background-color: black;
		transform: rotateX(-45deg);

		z-index: 3;
	}
	.wall_1,
	.wall_2 {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		top: 25%;
		width: 55%;
		height: 60%;
		background-color: rgb(245, 224, 185);
		border-top: 1px solid black;
		overflow: hidden;

		z-index: 5;
	}

	.wall_1 {
		transform: skewY(-25deg);
		align-items: flex-start;
		border-right: 1px solid black;
	}
	.wall_2 {
		transform: skewY(25deg);
		border-left: 1px solid black;
	}

	.floor {
		position: absolute;
		display: flex;
		flex-direction: row;

		flex-wrap: wrap;
		bottom: -45%;
		left: 0;
		width: 110%;
		height: 110%;
		transform: skewY(-25deg);
		background-color: rgb(128, 121, 107);

		z-index: 0;
	}

	@media (max-height: 940px) {
		.roomContainer {
			width: 80%;
		}
	}
	@media (max-height: 755px) {
		.roomContainer {
			width: 70%;
		}
	}
	@media only screen and (max-width: 480px) {
		.buttonWrapper {
			flex-direction: column;
		}
	}
</style>
