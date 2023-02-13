<script>
	import { onMount } from 'svelte';
	import { slide, fade, fly } from 'svelte/transition';
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
			in:slide={{ delay: 100, duration: 500 }}
			out:slide={{ delay: 100, duration: 1000 }}
		>
			<a href="/floorwalls" transition:fly={{ delay: 0, x: 250, duration: 250 }}
				>Потолок,стены,пол</a
			>
			<!-- <a href="/onewall"> Одна стена</a> -->
			<a href="/twoparts" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Две части стены</a>
			<a href="/roombrick" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> По кирпичику </a>
			<a href="/frames" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Плинтус дизайн </a>
			<a href="/laminat" transition:fly={{ delay: 0, x: 25,y:25, duration: 250 }}> Самоклеющийся ламинат </a>
			<a href="/" transition:fly={{ delay: 0, x: 250, duration: 250 }}>Начало</a>
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
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 1%;
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
		right: 20px;
		top: 20px;
		z-index: 100;
		box-shadow: -3px 3px 3px;
		border: 1px ridge black;
	}
	.title {
		font-size: 2.5vw;
		margin-left: 35%;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bolder;
		color: rgb(130, 36, 2);
	}
	@media only screen and (max-width: 480px) {
		a {
			font-size: 0.7em;
		}
	}
	@media only screen and (max-height: 440px) {
		a {
			font-size: 0.8em;
		}
	}
</style>
