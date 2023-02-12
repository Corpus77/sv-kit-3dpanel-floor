<script>
	import { onMount } from 'svelte';

	onMount(() => {
		let links = document.querySelectorAll('a');
		links.forEach((item) => {
			item.style.color = 'black';
			item.onclick = function () {
				links.forEach((item) => {
					item.style.color = 'black';
					
				});
				this.style.color = 'red';
				
			};
		});
	});
</script>

<nav>
	<a href="/">Начало</a>
	<a href="/floorwalls">Потолок/стены/пол</a>
	<!-- <a href="/onewall"> Одна стена</a> -->
	<a href="/twoparts"> Две части стены</a>
	<a href="/roombrick"> По кирпичику </a>
	<a href="/frames"> Плинтус дизайн </a>
	<a href="/laminat"> Сам.клей. ламинат </a>
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
		justify-content: space-around;
		align-items: center;

		height: 6vh;
		gap: 1%;
		background: linear-gradient(to right, #ccccb2, #a5a523, #ccccb2);
	}
	a {
		text-decoration: none;

		font-size: 2vw;
	}
	a:active {
		transform: translateY(3px);
		text-shadow: 2px 2px 2px rgb(51, 255, 0);
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
