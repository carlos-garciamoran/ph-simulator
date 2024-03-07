<script lang="ts">
	import AcidsMenu from "./menus/acids.svelte";
	import BuffersMenu from "./menus/buffers.svelte";
	import SaltsMenu from "./menus/salts.svelte";
	import HouseholdItemsMenu from "./menus/household-items.svelte";
  import MainMenu from "./menus/main.svelte";
	import ConcentrationSlider from "./concentration-slider.svelte";

  let menu = 'acids/bases';
  let menuValue = 'Ba(OH)2';
</script>

<div class="flex flex-col gap-4 justify-between">
  <div class="flex flex-col gap-4">
    <MainMenu bind:value={menu} />
    {#if menu === 'acids/bases'}
      <AcidsMenu bind:value={menuValue} />
    {/if}
    {#if menu === 'salts'}
      <SaltsMenu bind:value={menuValue} />
    {/if}
    {#if menu === 'buffers'}
      <BuffersMenu bind:value={menuValue} />
    {/if}
    {#if menu === 'household-items'}
      <HouseholdItemsMenu bind:value={menuValue} />
    {/if}
    {#if menu === 'water'}
      <h1>huh</h1>
    {/if}
  </div>
  <!-- TODO: show slider dynamically based on value -->
  <ConcentrationSlider value={[0.07]} />
</div>