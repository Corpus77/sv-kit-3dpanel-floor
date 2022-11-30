<script>
  import { createEventDispatcher } from "svelte";
  export let buttonText = "";

  const dispatch = createEventDispatcher();
  const clearAll = (btn) => {
    dispatch("clearAll", btn);
  };
</script>

<button
  class="btn-header non-activeapp"
  on:click={function (e) {
    clearAll(this);
  }}>{buttonText}</button
>

<style>
  button {
    font-weight: bolder;

    color: rgb(233, 138, 138);
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    border: none;
    cursor: pointer;
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
