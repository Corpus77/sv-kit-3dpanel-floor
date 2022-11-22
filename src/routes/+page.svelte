<script>
	let arr = ['one', 'two', 'three'];
</script>

<div class="root">
	<h1>Welcome to SvelteKit</h1>
	{#each arr as item}
		<p>{item}</p>
	{/each}
</div>

<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 99vh;
	}
</style>
