<script>
	import { slide, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	// import { wallArray, floorArray, laminatArray, plintusArray }
	//  from '../typesArrays.js';
	import {
		filenamesBrick,
		filenamesDecBrick,
		filenamesBambook,
		filenamesEk,
		filenamesKladka,
		filenamesMramor,
		filenamesStone,
		filenamesWood,
		filenamesVintage,
		filenamesCeil,
		filenamesVinilWall,
		
	} from '../filenames.js';
	import { filenamesPuzzles, filenamesVinil, filenamesPuzzlesButton } from '../filenamesfloor';
	import { filenamesPlintus } from '../filenamesplintus';
	export let globalSurface;
	// -------------------------------------------------
	function active(button, typePanel, surfaceArray) {
		button.classList.toggle('non-active');
		let buttonArr = document.querySelectorAll('button');
		surfaceArray.forEach((item) => {
			if (item.type !== typePanel.type) {
				item.visible = false;
				buttonArr.forEach((butt) => {
					if (button !== butt) {
						butt.classList.add('non-active');
					}
				});
			}
		});
	}
	//  dispatch event target panel
	const dispatch = createEventDispatcher();
	const panelChoice = (url) => {
		dispatch('panelChoice', url);
	};

	// //  Array of object`s panels for walls
	let wallArray = [
		{
			type: 'simpleBrick',
			visible: false,
			title: 'Кирпич',
			imgArr: filenamesBrick
		},
		{
			type: 'decBrick',
			visible: false,
			title: 'Декоративный кирпич',
			imgArr: filenamesDecBrick
		},
		{
			type: 'ekBrick',
			visible: false,
			title: 'Екатеринославский кирпич',
			imgArr: filenamesEk
		},
		{
			type: 'kladka',
			visible: false,
			title: 'Кладка',
			imgArr: filenamesKladka
		},
		{
			type: 'mramor',
			visible: false,
			title: 'Мрамор',
			imgArr: filenamesMramor
		},
		{
			type: 'bambook',
			visible: false,
			title: 'Бамбук',
			imgArr: filenamesBambook
		},
		{ type: 'stone', visible: false, title: 'Камень', imgArr: filenamesStone },
		{ type: 'wood', visible: false, title: 'Дерево', imgArr: filenamesWood },
		{
			type: 'vintage',
			visible: false,
			title: 'Винтаж',
			imgArr: filenamesVintage
		},
		{
			type: 'ceil',
			visible: false,
			title: 'Потолочные',
			imgArr: filenamesCeil
		},
		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinilWall
		}
	];
	// Array of object`s items for floor
	let floorArray = [
		{
			type: 'pazzles',
			visible: false,
			title: 'Пол-пазл',
			imgArr: filenamesPuzzles
		},

		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinil
		}
	];
	let laminatArray = [
		{
			type: 'vinil',
			visible: false,
			title: 'Виниловая плитка',
			imgArr: filenamesVinilWall
		}
	];
	let plintusArray = [
		{
			type: 'gluePlintus',
			visible: false,
			title: 'Самоклеющийся плинтус',
			imgArr: filenamesPlintus
		}
	];
</script>

<div class="container" transition:slide={{ delay: 100, duration: 500 }}>
	<div class="btnContainer" transition:scale={{ delay: 250, duration: 500 }}>
		<!-- "'each' cycle button rendering" -->
		{#if globalSurface == 'wall'}
			{#each wallArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, wallArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
		{:else if globalSurface == 'floor'}
			{#each floorArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, floorArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
			<!--! for laminat -->
			{:else if globalSurface == 'laminat'}
			{#each laminatArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, laminatArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
		{:else if globalSurface == 'ceil'}
			{#each wallArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, wallArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
			<!--! for plintus -->
		{:else if globalSurface == 'plintusUp' || 'plintusDown'}
			{#each plintusArray as item, index}
				<button
					class="btn non-active"
					on:click={(e) => {
						active(e.target, item, plintusArray);
						item.visible = !item.visible;
					}}
					>{item.title}
				</button>
			{/each}
		{/if}

		<!-- --------------------------------  -->
	</div>
	<!-- 'each' cycle panel rendering -->
	{#if globalSurface == 'wall'}
		{#each wallArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/{filename.url}" alt="" loading="lazy" />
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size} mm</span>
					</div>
				{/each}
			{/if}
		{/each}
	{:else if globalSurface == 'floor'}
		{#each floorArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/floor/{filename.url}" alt="" loading="lazy" />
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size} mm</span>
					</div>
				{/each}
			{/if}
		{/each}
		<!--! For laminat  -->
	{:else if globalSurface == 'laminat'}
		{#each laminatArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/floor/{filename.url}" alt="" loading="lazy" />
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size} mm</span>
					</div>
				{/each}
			{/if}
		{/each}
	{:else if globalSurface == 'ceil'}
		{#each wallArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/{filename.url}" alt="" loading="lazy" />
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size} mm</span>
					</div>
				{/each}
			{/if}
		{/each}
		<!--! for plintus -->
	{:else if globalSurface == 'plintusUp' || 'plintusDown' || 'frame'}
		{#each plintusArray as item}
			{#if item.visible}
				{#each item.imgArr as filename}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						transition:scale={{ delay: 200, duration: 500, easing: linear }}
						class="divImg"
						on:click={() => {
							panelChoice(filename.url);
						}}
					>
						<img src="./textures/plintus/{filename.url}" alt="" loading="lazy" />
						<span class="title">{filename.title}</span>
						<span class="size">{filename.size} mm</span>
					</div>
				{/each}
			{/if}
		{/each}
	{/if}

	<!-- --------------------------------------- -->
</div>

<style>
	.container {
		position: absolute;
		right: 2%;
		top: 15%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-around;
		gap: 1em;
		width: 45%;
		height: 80%;
		background-color: grey;
		border: 1px solid black;
		z-index: 20;
		overflow: auto;
	}
	.btnContainer {
		position: sticky;
		top: 0.5em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		gap: 5px;
		padding: 0.5em;
		width: 95%;
		height: auto;
		background-color: rgba(0, 0, 0, 0.274);
		box-shadow: 0.3em 0.3em 1em black;
	}
	.btn {
		padding: 0 1em 0 1em;
		background-color: rgb(186, 235, 97);
		font-weight: bolder;
		font-size: large;
		height: 2rem;
		border-radius: 5px;
	}
	.non-active {
		background-color: white;
	}
	.divImg {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
		min-height: 30%;
		cursor: pointer;
	}
	img {
		width: 90%;
		height: auto;
	}
	.title {
		color: white;
		font-weight: bold;
	}
	.size {
		color: white;
	}
	@media only screen and (max-width: 480px) {
		.container {
			width: 65%;
			font-size: smaller;
			font-weight: lighter;
		}
		.title,
		.size {
			font-weight: lighter;
		}
		.btn {
			font-weight: bold;
			font-size: 0.7em;
		}
	}
	@media only screen and (max-height: 480px) {
		.btn {
			padding: 0 0.3em 0.3em;
			font-weight: bold;
			font-size: smaller;
		}
		.btnContainer {
			justify-content: space-around;
			word-wrap: break-word;
		}
		.container {
			width: 65%;

			font-size: smaller;
		}
	}
</style>
