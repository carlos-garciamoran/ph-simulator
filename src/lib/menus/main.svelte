<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
	import MenuCard from "./menu-card.svelte";
  export let value: string;
</script>

<MenuCard title="Main Menu">
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="acids/bases" title="Acids/Bases" />
    <RadioItem value="salts" title="Salts" />
    <RadioItem value="buffers" title="Buffers" />
    <RadioItem value="household-items" title="Household Items" />
    <RadioItem value="water" title="Water" />
  </RadioGroup.Root>  
</MenuCard>
