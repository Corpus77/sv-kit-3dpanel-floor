<script>
	import { fillPlintus } from '$lib/logic/functions.js';
	import { onMount } from 'svelte';

	onMount(() => {
		// const thisPlintus = 'plintusUp';
		// fillPlintus(thisPlintus);
	});
</script>

<div class="plintusUp">
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
</div>

<style>
	.plintusUp {
		display: flex;
		align-items: stretch;
		position: absolute;
		top: 0px;
		width: 100%;
		height: 3%;
		/* border: 1px solid black; */
		z-index: 10;
	}
	.panel {
		width: 30%;
		/* border: 1px solid black; */
	}
</style>
