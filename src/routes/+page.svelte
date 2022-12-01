<script>
	import Modal from '$lib/components/Modal.svelte';
	let modalVisible = false;
	let globalSurface;
	function panelChoice() {
		modalVisible = !modalVisible;
	}
</script>

<div class="root">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="img wall"
		on:click={function () {
			modalVisible = !modalVisible;
			globalSurface = 'wall';
		}}
	> <h1 class="title">На стены</h1>  </div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="img floor"
		on:click={function () {
			modalVisible = !modalVisible;
			globalSurface = 'floor';
		}}
	> <h1 class="title">На пол</h1>  </div>
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
	.img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30vw;
		height: 30vh;
		box-shadow: 5px 5px 6px;
		border: 1px solid black;
	}
	.wall {
		background: url('./textures/stonesand.jpg');
	}
	.floor {
		background: url('./textures/floor/f-grass.jpg');
	}
	.title {
		color: white;
	}
</style>
