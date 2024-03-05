<script lang="ts">
	import AcidsMenu from "./menus/acids.svelte";
	import BuffersMenu from "./menus/buffers.svelte";
	import SaltsMenu from "./menus/salts.svelte";
	import HouseholdItemsMenu from "./menus/household-items.svelte";
  import MainMenu from "./menus/main.svelte";
  import WaterMenu from "./menus/water.svelte";

  let value = 'acids/bases';
  let subValue = 'Ba(OH)2';
</script>

<div class="flex flex-col gap-4 h-fit">
  <MainMenu bind:value={value} />
  {#if value === 'acids/bases'}
    <AcidsMenu bind:value={subValue} />
  {/if}
  {#if value === 'salts'}
    <SaltsMenu bind:value={subValue} />
  {/if}
  {#if value === 'buffers'}
    <BuffersMenu bind:value={subValue} />
  {/if}
  {#if value === 'household-items'}
    <HouseholdItemsMenu bind:value={subValue} />
  {/if}
  {#if value === 'water'}
    <WaterMenu bind:value={subValue} />
    <!-- <p>Water is a unique substance because it can act as both an acid and a base. Water     -->
  {/if}
  <!-- <h1 class="mt-2">Current option: {selectedValue}</h1> -->
</div>