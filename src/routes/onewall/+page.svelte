<script>
	import Modal from '$lib/components/Modal.svelte';
	import {
		walls,
		allPanels,
		panel,
		panelSize
	} from '$lib/logic/retSurfaces.js';
		
		
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
					if(e.target.classList.contains('panel')) {
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
					removePanels(panel());
					initWallPanelAdd();
				}}
			/>
		</div>
	</header>
	<div class="wallContainer">
		<div class="wall" />
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
		justify-content: center;
		align-items: center;
		width: 98vw;
		height: 94vh;
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
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 90%;
		height: 90%;
		box-shadow: 5px 5px 10px;

		overflow: hidden;
	}
</style>
