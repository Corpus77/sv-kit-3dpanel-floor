<script>
	
	export let surface;
	let leftRight = 'влево';
	export let  moveParityColumns;
	export let panelMove;
	export let panel;
	let counter = 2;
</script>

<button
	class="parityMove"
	on:click={() => {
		if (counter % 2 == 0) {
			let rowLength = Math.floor(surface()[0].offsetWidth / panel()[0].offsetWidth);

			moveParityColumns(panel(), -panelMove('offsetWidth'), 'left', 1, 0, rowLength);

			moveParityColumns(
				panel(),
				-panelMove('offsetWidth'),
				'left',
				1,
				rowLength + rowLength,
				rowLength * 3
			);
			leftRight = 'вправо';
		} else {
			let rowLength = Math.floor(surface()[0].offsetWidth / panel()[0].offsetWidth);
			moveParityColumns(panel(), 0, 'left', 1, 0, rowLength);
			moveParityColumns(panel(), 0, 'left', 1, rowLength + rowLength, rowLength * 3);
			leftRight = 'влево';
		}
		counter++;
	}}>Сдвиг {leftRight}</button
>

<style>
	.parityMove {
		position: relative;
		width: 8em;
		min-height: 25%;
		padding: 1px;
		font-weight: bold;
		border-style: double;
		border-radius: 5px;
		box-shadow: 2px 2px 1px rgb(107, 97, 97);
		overflow: hidden;
	}
	.parityMove:hover {
		background-color: rgba(108, 100, 100, 0.326);
	}
	.parityMove:active {
		box-shadow: 0 0 0;
		transform: translateY(2px);
		transition: 0.5s;
	}
	.parityMove:after {
		content: '';
		background: rgba(108, 100, 100, 0.526);
		display: block;
		position: absolute;
		padding-top: 300%;
		padding-left: 350%;
		margin-left: -20px !important;
		margin-top: -120%;
		opacity: 0;
		transition: all 0.5s;
	}
	.parityMove:active:after {
		padding: 0;
		margin: 0;
		opacity: 1;
		transition: 0s;
	}
</style>
