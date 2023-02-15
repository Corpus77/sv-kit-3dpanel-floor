<script>
  import { createEventDispatcher } from "svelte";
  export let buttonText = "";

  const dispatch = createEventDispatcher();
  const plintusdown = (btn) => {
    dispatch("plintusdown", btn);
  };
</script>

<button
  class="btn-header non-activeapp"
  on:click={function (e) {
    plintusdown(this);
  }}>{buttonText}</button
>

<style>
  button {
    font-weight: bolder;
    min-height: 25%;
    color: rgb(186, 235, 97);
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  .non-activeapp {
    color: wheat;
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    border: none;
  }
  @media only screen and (max-width: 480px) {
    button {
      font-size: .7em;
      font-weight:lighter;
    }
    
  }
  @media only screen and (max-height: 440px) {
    button {
      font-size: .7em;
      font-weight:lighter;
    }
  }
</style>