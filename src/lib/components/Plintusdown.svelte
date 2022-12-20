<script>
	import { fillPlintus } from '$lib/logic/functions.js';
	import { onMount } from 'svelte';

	onMount(() => {
		// const thisPlintus = 'plintusDown';
		// fillPlintus(thisPlintus);
	});
</script>

<div class="plintusDown">
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
	<div class="panel" ></div>
</div>

<style>
	.plintusDown {
		display: flex;

		position: absolute;
		bottom: 0px;
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
