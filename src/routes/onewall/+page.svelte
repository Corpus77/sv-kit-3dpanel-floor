<script>
    import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
	import Buttonclear from '$lib/components/Buttonclear.svelte';
</script>

<div class="container">
	<header>
        <Buttonall buttonText = 'На все стены'/>
        <Buttonone buttonText = 'Одна панель ' />
        <Buttonclear buttonText = 'Очистить стену' />
    </header>    
	<div class="wallContainer">
		<div class="wall" />
	</div>
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
		border: 1px solid black;
	}
    header {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 10%;
        border: 1px solid black;
    }
    .wallContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 90%;
        border: 1px solid black;
    }
    .wall {
        width: 90%;
        height: 90%;
        border: 1px solid black;
    }
</style>
