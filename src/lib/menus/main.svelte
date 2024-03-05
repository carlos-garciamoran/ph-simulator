<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
  export let value: string;
</script>

<div class="border p-4">
  <h1 class="text-lg mb-1">Main Menu</h1>
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="acids/bases" title="Acids/Bases" />
    <RadioItem value="salts" title="Salts" />
    <RadioItem value="buffers" title="Buffers" />
    <RadioItem value="household-items" title="Household Items" />
    <RadioItem value="water" title="Water" />
  </RadioGroup.Root>
</div>