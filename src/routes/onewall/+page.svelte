<script>
	import Modal from '$lib/components/Modal.svelte';
	import {
		walls,
		allPanels,
		panel,
		panelSize
		// plintusUp,
		// plintusDown
	} from '$lib/logic/retSurfaces.js';

	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
	import Buttonplintusup from '$lib/components/Buttonplintusup.svelte';
	import Buttonplintusdown from '$lib/components/Buttonplintusdown.svelte';
	import Plintusup from '$lib/components/Plintusup.svelte';
	import Plintusdown from '$lib/components/Plintusdown.svelte';
	import {
		initWallPanelAdd,
		styleCommonPanels,
		removePanels,
		btnRemoveActive,
		btnHeaderActive,
		
	} from '$lib/logic/functions';
	//----------------------------------------
	let modalVisible = false;
	let fillAllFlag = true;
	let plintusUpFlag = false;
	let plintusDownFlag = false;
	let globalSurface = 'wall';
	let btnHeaderArr;
	let url = '';
	let urlWall = './textures/';

	//----------------------------------
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
					url = urlWall + event.detail;
					if (e.target.classList.contains('panel')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
				};
			});
		}
		//TODO:
		else if (fillAllFlag && globalSurface == 'plintusUp') {
			plintusUpFlag = true;
			url = event.detail;
			setTimeout(() => {
				document.querySelector('.plintusUp').childNodes.forEach((item) => {
					item.style.backgroundImage = `url('./textures/plintus/${url}')`;
				});
			});
		} else if (fillAllFlag && globalSurface == 'plintusDown') {
			plintusDownFlag = true;
			url = event.detail;
			setTimeout(() => {
				document.querySelector('.plintusDown').childNodes.forEach((item) => {
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
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr );
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
					btnHeaderActive(event.detail, modalVisible, btnHeaderArr );
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
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr );
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
						btnHeaderActive(event.detail, modalVisible, btnHeaderArr );
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
		</div>
	</header>
	<div class="wallContainer">
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
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 10%;
		background-color: rgba(47, 79, 79, 0.507);
		/* border: 1px solid black; */
	}
	.buttonWrapper {
		display: flex;
		justify-content: space-evenly;
		width: 70%;
		height: 40%;
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
</style>
