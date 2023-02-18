<script>
  import Modal from './../../lib/components/Modal.svelte';
	import  Buttonclear  from '$lib/components/Buttonclear.svelte';
  import Buttonall from '../../lib/components/Buttonall.svelte';
  
  import {btnHeaderActive} from '$lib/logic/functions.js';
  
  import {onMount} from 'svelte';
  let btnHeaderArr = [];
	let modalVisible = false;
  let globalSurface = 'wall';
  let url = '';
  let surface;
  function fartuk() {
    return document.querySelector('.fartuk');
  }
  function fartukSize() {
     ;  return fartuk().offsetHeight/2 + 'px';
  }
  function panelChoice(event) {
    url = event.detail;
    modalVisible = !modalVisible;
    surface.onclick = function(e) {
      
      e.target.style.backgroundImage = `url(./textures/${url})`;
      
    }
    console.log(url);
  }
  onMount(() => {
    surface = document.querySelector('.kitchenContainer');
    
    fartuk();
    for(let i = 0; i < 20; i++) {
      const panel = document.createElement('div');
      panel.classList.add('panel');
      panel.style.backgroundSize = 'contain';
      panel.style.minWidth = fartukSize();
      panel.style.height = fartukSize();
      // panel.style.border = '1px solid red';
      fartuk().append(panel);
    }
  })
</script>

<div class="container">
  <header>
    <Buttonall
				buttonText="На всю стену"
				on:fillAll={(event) => {
					modalVisible = !modalVisible;
					
				 btnHeaderActive(event.detail, modalVisible, btnHeaderArr);
					
				}}
			/>
      <Buttonclear
				buttonText="Очистить стену"
				on:clearAll={(event) => {
					surface.onclick = function(e) {
            e.target.style.backgroundImage = 'none';
          }
				}}
			/>
  </header>
  <div class="kitchenContainer">
    <div class="mebel-container">
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      
    </div>
    <!-- ----- -->
    <div class="fartuk"></div>
    <!-- ------------- -->
    <div class="mebel-container">
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      <div class="mebel-item">
        <div class="mebel_itemdoor"></div>
        <div class="mebel_itemdoor"></div>
      </div>
      
    </div>
    
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
  /* width: 98.5vw; */
  height: 91vh;
  
  }
  header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10%;
    background: rgb(168, 125, 6);
    border: 1px solid black;
    z-index: 10;
  }
  .kitchenContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 89%;
    border: 1px solid black;
    /* background-size: auto 25%; */
  }
  .mebel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30%;
    border: 1px solid black;
    z-index: 1;
  } 
  .mebel-item {
    display: flex;
    height: 100%;
    min-width: 25%;
    padding: 1%;
    border: 1px solid black;
    z-index: 2;
    background: white;
    background-size: auto 95%;
  }
  .mebel_itemdoor {
    width: 99%;
    height: 99%;
    z-index: 3;
    outline: 1px solid;
    background: white;
    background-size: contain;
  }
  .fartuk {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 40%;
    background: grey;
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</style>