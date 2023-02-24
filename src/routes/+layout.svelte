<script>
	import { onMount } from 'svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import {linear} from 'svelte/easing'
	let linksVisible = false;
	let title = '';
	function burgerClick() {
		linksVisible = !linksVisible;
		if (linksVisible) {
			setTimeout(() => {
				let links = document.querySelectorAll('a');
				links.forEach((item) => {
					item.style.color = 'black';
					item.onclick = function () {
						linksVisible = false;
						links.forEach((item) => {
							item.style.color = 'black';
						});
						this.style.color = 'red';
						title = this.innerText;
					};
				});
			});
		}
	}

	onMount(() => {});
</script>

<nav>
	
	<span>Click to open menu =></span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img src="./burger.png" alt="" on:click={burgerClick} title = 'Menu' />
	
	{#if linksVisible}
		<div
			class="menu"
			in:slide={{ delay: 100, duration: 500, easing: linear }}
			out:slide={{ delay: 100, duration: 1000, easing: linear }}
		>
		<a href="/" transition:fly={{ delay: 0, x: 250, duration: 250 }}>Начало</a>
		<a href="/frames" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Плинтус дизайн </a>
		<!-- <a href="/onewall"> Одна стена</a> -->
		<a href="/twoparts" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Две части стены</a>
		<a href="/roombrick" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> По кирпичику </a>
		<a href="/laminat" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Самоклеющийся ламинат </a>
		<a href="/kitchen" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Кухня </a>
		<a href="/floorwalls" transition:fly={{ delay: 0, x: 250, duration: 250 }}
			>Потолок,стены,пол</a
		>
		</div>
	{/if}

	<p class="title">{title}</p>
</nav>
<slot />

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	nav {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 1%;
		width: 100%;
		height: 6vh;
		gap: 2%;
		background: linear-gradient(to right, #ccccb2, #a5a523, #ccccb2);
	}
	img {
		height: 60%;
		cursor: pointer;
	}
	a {
		text-decoration: none;

		font-size: 2vw;
	}
	a:active {
		transform: translateY(3px);
		text-shadow: 2px 2px 2px rgb(51, 255, 0);
	}
	.menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 50vh;
		background-color: rgba(165, 165, 35, 0.878);
		padding: 5px;
		left: 1vw;
		top: 6vh;
		z-index: 100;
		box-shadow: -3px 3px 3px;
		border: 1px ridge black;
		border-radius: 20% 15% / 10% 40%;
	}
	.title {
		font-size: 2.5vw;
		margin-left: 5%;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bolder;
		color: rgb(130, 36, 2);
	}
	@media only screen and (max-width: 480px) {
		a {
			font-size: 1em;
		}
		.title {
			font-size: 1.5em;
		}
	}
	@media only screen and (max-height: 440px) {
		a {
			font-size: 0.8em;
		}
	}
</style>
