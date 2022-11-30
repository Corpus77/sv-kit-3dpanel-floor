<script>
  import { createEventDispatcher } from "svelte";
  export let buttonText = "";

  const dispatch = createEventDispatcher();
  const onePanel = (btn) => {
    dispatch("onePanel", btn);
  };
</script>

<button
  class="btn-header non-activeapp"
  on:click={function (e) {
    onePanel(this);
  }}>{buttonText}</button
>

<style>
  button {
    font-weight: bolder;
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
  @media only screen and (max-device-width: 480px) {
    button {
      font-size: smaller;
    }
    .non-activeapp {
      font-size: smaller;
    }
  }
</style>
