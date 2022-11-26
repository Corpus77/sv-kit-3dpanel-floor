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
	//__________________________________________
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
		if (blockFlag) {
			removePanels(wall_1_panels);
			console.log(blockFlag);
			console.log(wall_1_panels);

			addPanel(surface);
			// console.log(document.querySelector('.wall_1').childNodes);
		} else {
			removePanels(wall_2_panels);
			console.log(blockFlag);
			console.log(wall_2_panels);

			addPanel(surface);

      // console.log(document.querySelector('.wall_2').childNodes);
		}
		//removePanels(panel());
    
		
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
		initWallPanelAdd()
		//----- separate array panels of 2 walls, after init.
		wall_1_panels = Array.from (document.querySelector('.wall_1').children)
		//Array.from (document.getElementsByClassName('wall_1')[0].children)
		wall_2_panels = Array.from (document.querySelector('.wall_2').children)
		//Array.from (document.getElementsByClassName('wall_2')[0].children);

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
			<Buttonone buttonText="Одна панель" />
			<Buttonclear buttonText="Очистить стену" />
		</div>
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
			<Buttonone buttonText="Одна панель" />
			<Buttonclear buttonText="Очистить стену" />
		</div>

		<div class="range">
			<span>Пропорция</span>
			<input type="range" class="proportion" min="0" max="100" />
		</div>

		<button class="teeth">Зубцы</button>
	</div>
	<div class="container-wall">
		<div class="wall wall_1" />
		<div class="teeth_block" />
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
		/* transform: translateX(-11%); */
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
		width: 100vw;
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
		flex-direction: row;
		flex-wrap: wrap;
		width: 50%;
		height: 100%;
		background-size: 20%;
		border: 1px solid black;
		overflow: hidden;
	}
	.wall_2 {
		background-size: auto;
	}
	.wall_1 {
		flex-direction: row-reverse;
		background-size: auto;
	}
	.teeth_block {
		display: none;
	}
	.teeth_brick {
		width: 100%;
		height: 3%;
	}

	.disp_teeth {
		display: flex;
		flex-direction: column;
		width: 3%;
		height: 100%;
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
