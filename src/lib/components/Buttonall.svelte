<script>
  import { createEventDispatcher } from "svelte";
  export let buttonText = "";

  const dispatch = createEventDispatcher();
  const fillAll = (btn) => {
    dispatch("fillAll", btn);
  };
</script>

<button
  class="btn-header non-activeapp"
  on:click={function (e) {
    fillAll(this);
  }}>{buttonText}</button
>

<style>
  button {
    font-weight: bolder;
    min-height: 30%;
    color: rgb(186, 235, 97);
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    border: none;
    border: 1px solid wheat;
    cursor: pointer;
    box-shadow: 2px 2px 3px rgb(85, 85, 79);
  }
  button:hover {
    color:rgb(144, 233, 144);
  }
  button:active {
    box-shadow: 2px 2px 3px rgb(204, 204, 87);
    transform: translateY(1px);
  }
  .non-activeapp {
    color: wheat;
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    /* border: none; */
  }
  @media only screen and (max-width: 480px) {
    button {
      font-size: .7em;
      font-weight:lighter;
      min-height: auto;
    }
    
  }
  @media only screen and (max-height: 440px) {
    button {
      margin: 0;
      padding: 0;
      
      font-size: .7em;
      font-weight:lighter;
    }
  }
</style>
