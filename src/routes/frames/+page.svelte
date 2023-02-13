<script>
	import Modal from '$lib/components/Modal.svelte';
	import { walls, allPanels, panel, panelSize } from '$lib/logic/retSurfaces.js';

	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Buttonplintusup from '$lib/components/Buttonplintusup.svelte';
	import Buttonplintusdown from '$lib/components/Buttonplintusdown.svelte';
	import Plintusup from '$lib/components/Plintusup.svelte';
	import Plintusdown from '$lib/components/Plintusdown.svelte';
	import Instr from '../../lib/components/Instr.svelte';
	import Instrbutton from '../../lib/components/Instrbutton.svelte';
	import Buttonmoveleft from '$lib/components/Buttonmoveleft.svelte';
	import Buttonmoveup from '$lib/components/Buttonmoveup.svelte';
	import {
		initWallPanelAdd,
		styleCommonPanels,
		removePanels,
		btnRemoveActive,
		btnHeaderActive,
		bodyClick
	} from '$lib/logic/functions';
	//----------------------------------------
	let modalVisible = false;
	let instrVisible = false;
	let fillAllFlag = true;
	let plintusUpFlag = false;
	let plintusDownFlag = false;

	let globalSurface = 'wall';
	let btnHeaderArr;

	let side;

	let url = '';
	let urlWall = './textures/';

	let instruction =
		"1. Кнопка -На всю стену- позволяет разместить выбранную панель на всю стену 2. Кнопка -Одна панель- позволяет помещать выбранную панель в нужное для вас место путём нажатия правой кнопкой мыши в выбранном месте стены. При двойном нажатии, появляется возможность помещать плинтус на любую сторону данной панели. Для этого наведите курсор на нужную сторону панели (при этом курсор изменится на '+'). Кликните правой кнопкой мыши и выберите нужный плинтус. При повторном нажатии на появившемся плинтусе, он исчезнет. 3. -Плинтус вверх- и -Плинтус вниз- добавляют выбранный плинтус соответсвенно вверх и вниз. 4. -Очистить стену- очищает всю стену. При клике левой кнопкой мыши на панели она поворачивается на 90 градусов";
	//----------------------------------
	function addPanel(wallsArg) {
		wallsArg.forEach((item) => {
			for (let i = 0; i < 165; i++) {
				let panel = document.createElement('div');
				styleCommonPanels(panel);
				panel.classList.add('panel');
				panel.style.position = 'relative';
				panel.style.backgroundImage = `url(${urlWall}${url}`;
				item.append(panel);
			}
		});
	}
	//________________________________________
	function fillAll(surface) {
		removePanels(panel());
		addPanel(surface);
	}
	//________________________________________
	function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && globalSurface == 'wall') {
			fillAll(walls());
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'wall') {
			walls().forEach((item) => {
				item.onclick = function (e) {
					setTimeout(() => {
						console.log(e.detail);
						//TODO: !!!! this differ 'click' from 'dblclick'!!!! TODO:
						if (e.detail !== 2) {
							url = urlWall + event.detail;
							if (e.target.classList.contains('panel')) {
								e.target.style.backgroundImage = `url(${url})`;
								// console.log(e.target);
							}
							//FIXME: for frame
						} else {
							if (e.target.classList.contains('panel')) {
								e.target.classList.toggle('frame');
								if (e.target.classList.contains('frame')) {
									//add all side plintus
									let top = document.createElement('div');
									let bottom = document.createElement('div');
									let left = document.createElement('div');
									let right = document.createElement('div');
									top.classList.add('top');
									bottom.classList.add('bottom');
									left.classList.add('left');
									right.classList.add('right');
									e.target.append(top, bottom, left, right);
									//
									let counter = 2;
									e.target.childNodes.forEach((item) => {
										item.onclick = (e) => {
											if (counter % 2 == 0) {
												globalSurface = 'frame';
												modalVisible = true;
												side = e.target;
											} else {
												e.target.style.backgroundImage = 'none';
												modalVisible = false;
											}
											counter++;
										};
									});
								}
							}
						}
					}, 100);
				};
			});
		} else if (globalSurface == 'frame') {
			side.style.background = `url('./textures/plintus/${url}')`;
		} else if (fillAllFlag && globalSurface == 'plintusUp') {
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

	//-----------------------------------------
	onMount(() => {
		document.onclick = (e) => {
			instrVisible = bodyClick(e, 'instr', 'instruction');
		};
		btnHeaderArr = document.querySelectorAll('.btn-header');

		//----- initial add panels
		initWallPanelAdd();

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
	<header>
		<div class="buttonWrapper">
			<Buttonall
				buttonText="На всю стену"
				on:fillAll={(event) => {
					modalVisible = !modalVisible;
					fillAllFlag = true;
					globalSurface = 'wall';
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					plintusDownFlag = plintusUpFlag = false;
				}}
			/>
			<Buttonone
				buttonText="Одна панель"
				on:onePanel={(event) => {
					modalVisible = !modalVisible;
					fillAllFlag = false;
					globalSurface = 'wall';
					//btnHeaderActive(event.detail);
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
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
					removePanels(panel());
					initWallPanelAdd();
					plintusDownFlag = plintusUpFlag = false;
				}}
			/>
			<!--! <Buttonmoveleft surface={walls} />
			<Buttonmoveup /> -->
		</div>

		<Instrbutton bind:instrVisible bgcolor="rgba(248, 244, 9, 0.801)" color="black" />
	</header>
	<div class="wallContainer">
		{#if instrVisible}
			<Instr instrText={instruction} />
		{/if}
		<div class="wall">
			{#if plintusUpFlag}
				<Plintusup />
			{/if}
			{#if plintusDownFlag}
				<Plintusdown />
			{/if}
		</div>
	</div>
	{#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>

<style>
	* {
		margin: 0 auto;
		padding: 0;
		box-sizing: border-box;
	}
	:global(.frame) {
		outline: 1px solid black;
	}
	:global(.top) {
		position: absolute;
		height: 10%;
		width: 100%;
		top: 0px;
		cursor: crosshair;

		/* outline: 1px solid black; */
	}
	:global(.bottom) {
		position: absolute;
		height: 10%;
		width: 100%;
		bottom: 0px;

		cursor: crosshair;

		/* outline: 1px solid red; */
	}
	:global(.left) {
		position: absolute;
		height: 100%;
		width: 10%;
		left: 0px;
		background-size: contain;
		cursor: crosshair;
		/* outline: 1px solid black; */
	}
	:global(.right) {
		position: absolute;
		height: 100%;
		width: 10%;
		right: 0px;
		background-size: contain;
		cursor: crosshair;
		/* outline: 1px solid black; */
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* width: 94vw; */
		height: 91vh;
		/* border: 1px solid black; */
	}
	header {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 10px;
		width: 100%;
		height: 10%;
		background-color: rgba(60, 249, 57, 0.507);
		/* border: 1px solid black; */
	}
	.buttonWrapper {
		display: flex;
		justify-content: space-evenly;
		width: 70%;
		height: 60%;
		box-shadow: 3px 3px 5px;
		background-color: rgba(47, 79, 79, 0.507);
		/* border: 1px solid black; */
	}

	.wallContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90%;
		/* border: 1px solid black; */
	}
	.wall {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 90%;
		height: 90%;
		box-shadow: 5px 5px 10px;

		overflow: hidden;
	}
	@media only screen and (max-height: 440px) {
		.buttonWrapper {
			height: 180%;
		}
	}
	@media only screen and (max-width: 480px) {
		.buttonWrapper {
			height: 80%;
		}
	}
</style>
