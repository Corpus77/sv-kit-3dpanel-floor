<script>
	import {blur,fly, slide} from "svelte/transition";
	import { linear } from 'svelte/easing';
	export let instrText = '';
</script>

<div class="instruction" in:fly = {{delay: 100, duration: 300, x: -500,  opacity: 1, easing: linear}}  out:blur = {{delay: 100, duration: 600, opacity: 1, easing: linear, amount: 10}}
>
	<h1 transition:slide = {{delay: 250, duration: 500,}}>Инструкция</h1>
	<p transition:slide = {{delay: 550, duration: 500,}}>{instrText}</p>
</div>

<style>
	.instruction {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 50%;
		height: 80%;
		left: 20px;
		top: 20px;
		padding: 10px;
		background-color: chocolate;
		border-radius: 8px;
		box-shadow: 5px 5px 4px;
		z-index: 10;
		overflow: auto;
	}
	.instruction > p {
		padding: 10px;
		font-size: 2vw;
	}
	@media  only screen and (max-width: 400px) {
		.instruction > p{
			font-size: 2vh;
		}
	}
</style>
