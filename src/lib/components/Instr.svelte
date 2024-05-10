<script>
	import { blur, fly, slide, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	export let instrText = '';
</script>

<div
	class="instruction"
	in:fly={{ delay: 10, duration: 300, x: -500, opacity: 1, easing: linear }}
	out:scale={{ delay: 10, duration: 400, opacity: 0, start: 0, easing: linear }}
>
	<h1 transition:slide={{ delay: 50, duration: 500 }}>Инструкция</h1>
	<p transition:slide={{ delay: 150, duration: 500 }}>{instrText}</p>
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
		z-index: 100;
		overflow: auto;
	}
	.instruction > p {
		padding: 10px;
		font-size: 2vw;
	}
	@media only screen and (max-width: 400px) {
		.instruction > p {
			font-size: 2vh;
		}
	}
</style>
