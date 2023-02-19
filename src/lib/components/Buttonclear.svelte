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
    min-height: 30%;
    color: rgb(233, 138, 138);
    background-color: rgb(56, 52, 52);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    border: 1px solid wheat;
    box-shadow: 2px 2px 3px rgb(85, 85, 79);
  }
  button:active {
    box-shadow: 2px 2px 3px rgb(204, 204, 87);
    transform: translateY(1px);
  }
  button:hover {
    color: rgb(230, 217, 28);
    /* rgb(144, 233, 144); */
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
