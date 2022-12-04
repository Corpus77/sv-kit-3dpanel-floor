<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	let modalVisible = false;
	let globalSurface;
	let url;
	let urlWall = '/textures/';
	let urlFloor = '/textures/floor/';
	function divRet(surface) {
		return document.querySelector(`.${surface}`)
	}
	function squareMake() {
		divRet('wall').style.height = divRet('wall').offsetWidth +'px'
		divRet('floor').style.height = divRet('wall').offsetWidth +'px'
	}
	function panelChoice(event) {
		modalVisible = !modalVisible;
		url = event.detail;
		if(globalSurface == 'wall') {
			divRet('wall').firstChild.setAttribute('src', `${urlWall}${url}` )
			
		} else {
			divRet('floor').firstChild.setAttribute('src', `${urlFloor}${url}` )
		}
			
	}
	onMount(() => {
		squareMake();
		window.onresize = () => {
			squareMake(); 
		}
	})	
</script>

<div class="root">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="imgContainer wall"
		
		on:click={function () {
			modalVisible = !modalVisible;
			globalSurface = 'wall';
			
		}}
	> <img src="/textures/stonesand.jpg" alt="">
		<h1 class="title">На стены или потолок</h1>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="imgContainer floor"
		on:click={function () {
			modalVisible = !modalVisible;
			globalSurface = 'floor';
		}}
	>
	<img src="/textures/floor/f-grass.jpg" alt="">
		<h1 class="title">На пол</h1>
	</div>
</div>
{#if modalVisible}
	<Modal {globalSurface} on:panelChoice={panelChoice} />
{/if}

<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: grey;
		gap: 3vw;
		height: 94vh;
	}
	.imgContainer {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: center;
		width: 30vw;
		background-size:cover;
		
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		box-shadow: 8px 8px 16px;
	}
		
	
	.title {
		color: white;
		text-shadow: 2px 2px 4px black;;
	}

	@media only screen and (max-height: 500px) {
		.title {
			font-size: 1em;
		}
	}
	@media only screen and (max-width: 500px) {
		.title {
			font-size: 1em;
		}
	}
</style>
