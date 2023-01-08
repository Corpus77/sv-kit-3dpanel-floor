<script>
	export let instrText = '';
</script>

<div class="instruction">
	<h1>Инструкция</h1>
	<p>{instrText}</p>
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
</style>
