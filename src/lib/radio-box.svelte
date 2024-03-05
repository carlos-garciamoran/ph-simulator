<script lang="ts">
	import AcidsMenu from "./menus/acids.svelte";
	import BuffersMenu from "./menus/buffers.svelte";
	import SaltsMenu from "./menus/salts.svelte";
	import HouseholdItemsMenu from "./menus/household-items.svelte";
  import MainMenu from "./menus/main.svelte";

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
    <h1>huh</h1>
  {/if}
</div>