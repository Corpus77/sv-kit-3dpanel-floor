<script>
	import { fillPlintus } from '$lib/logic/functions.js';
	import { onMount } from 'svelte';

	onMount(() => {
		const thisPlintus = 'plintusUp';

		
		fillPlintus(thisPlintus);
	});
</script>

<div class=" plintusUp" />
<!-- //plintus -->
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
</style>
