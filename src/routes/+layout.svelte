<nav>
	<a href="/">Начало</a>
	<a href="/floorwalls">Потолок/стены/пол</a>
	<a href="/onewall"> Одна стена</a>
	<a href="/twoparts"> Две части стены</a>
	<a href="/roombrick"> По кирпичику </a>
</nav>
<slot/>

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
	}
</style>
