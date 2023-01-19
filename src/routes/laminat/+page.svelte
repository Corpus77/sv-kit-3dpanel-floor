<script>
  import {onMount} from 'svelte';
  import Buttonall from '$lib/components/Buttonall.svelte';
	import Buttonone from '$lib/components/Buttonone.svelte';
  import Modal from "$lib/components/Modal.svelte";
  import {bodyClick, btnHeaderActive, btnRemoveActive} 
  from '$lib/logic/functions';
  import { floor, panel } from '$lib/logic/retSurfaces.js';
  
  let btnHeaderArr;
  let globalSurface = 'floor';
  let modalVisible = false;
  let fillAllFlag = false;
  let url = '';
  let urlWall = './textures/';
  //__________________________________________________
  function fillAll() {
		panel().forEach((item) => {
			item.style.background = `url(${urlWall}${url}`;
		});
	}
  function panelChoice(event) {
		url = event.detail;
		if (fillAllFlag && globalSurface == 'floor') {
			fillAll(floor());
			url = event.detail;
		} else if (!fillAllFlag && globalSurface == 'floor') {
			floor().forEach((item) => {
				item.onclick = function (e) {
					url = urlWall + event.detail;
					if (e.target.classList.contains('panel')) {
						e.target.style.backgroundImage = `url(${url})`;
					}
				};
			});
		}
		

		modalVisible = false;
		fillAllFlag = false;
	}
  onMount(() => {
    btnHeaderArr = document.querySelectorAll('.btn-header');
    let floor = document.querySelector('.floor');
    // add bricks to the wall
		for (let i = 0; i < 179; i++) {
			let brick = document.createElement('div');
			brick.className = 'panel';
			brick.style.position = 'relative';
			brick.style.minWidth = 3 + 'vw';
			brick.style.height = 11 + 'vh';
			brick.style.border = '1px solid rgb(114, 91, 91)';
			brick.style.overflow = 'hidden';

			floor.appendChild(brick);
		}
		
    //_______________________________
    // Move parity columns
    for (let item = 0; item < 179; item++) {
      if (item % 2 == 0) {
        floor.children[item].style.top = 9 + '%';
      }
    }
  })
</script>
<div class="container">
  <header>
    <Buttonall
			buttonText="На все кирпичи"
			on:fillAll={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = true;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				
				
			}}
		/>
		<Buttonone
			buttonText="Один кирпич"
			on:onePanel={(event) => {
				modalVisible = !modalVisible;
				fillAllFlag = false;
				btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
				
				
			}}
		/>
  </header>
  <div class="floorContainer">
    <div class="floor"></div>
  </div>
  {#if modalVisible}
		<Modal {globalSurface} on:panelChoice={panelChoice} />
	{/if}
</div>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98.5vw;
    height: 91vh;
    background-color: rgb(92, 245, 245);
  }
  header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height: 10%;
    background-color: honeydew;
  }
  .floorContainer {
    display: flex;
   
    
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
   
    perspective: 200px;
    background-color: lightblue;
    border: 1px solid black;
  }
  .floor {
    position: relative;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    transform-origin: bottom;
    transform-style: preserve-3d;
    transform:rotateX(35deg);
    width: 90%;
    height: 80%;
    overflow: hidden;
    border: 1px solid red;
  }
</style>