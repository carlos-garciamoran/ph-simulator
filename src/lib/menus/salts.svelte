<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
	import MenuCard from "./menu-card.svelte";
  export let value: string;
</script>

<MenuCard title="Salts">
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="NaCl" title="NaCl / Sodium Chloride" />
    <RadioItem value="NH4Cl" title="NH4Cl / Ammonium Chloride" />
    <RadioItem value="NaC2H3O2" title="NaC2H3O2 / Sodium Acetate" />
    <RadioItem value="NaHCO3" title="NaHCO3 / Sodium Bicarbonate" />
    <RadioItem value="Na2CO3" title="Na2CO3 / Sodium Carbonate" />
    <RadioItem value="NaHSO4" title="NaHSO4 / Sodium Bisulfate" />
  </RadioGroup.Root>
</MenuCard>
