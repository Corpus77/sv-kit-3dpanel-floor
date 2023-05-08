<script>
	import { onMount } from 'svelte';
	import Instr from './Instr.svelte';
	export let instrVisible;
	export let bgcolor;
	export let color;
	
	onMount(() => {
		document.querySelector('.instr').style.background = bgcolor;
		document.querySelector('.instr').style.color = color;
	});
</script>

<button
	class="instr"
	on:click={() => {
		
    instrVisible = !instrVisible;
	}}>Инструкция</button
>

<style>
	.instr {
		border-radius: 5px;
		border-style: none;
		font-weight: bolder;
		font-size: 100%;
	}
	@media only screen and (max-height: 440px) {
		.instr {
			font-size: .6em;
			
		}
	}
	@media only screen and (max-width: 480px) {
		.instr {
			font-size: .6em;
			
		}
	}
</style>
