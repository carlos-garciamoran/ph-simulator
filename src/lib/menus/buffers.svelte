<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
	import MenuCard from "./menu-card.svelte";
  export let value: string;
</script>

<MenuCard title="Buffers">
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="HC2H3O2 & NaC2H3O2" title="HC2H3O2 & NaC2H3O2 / Acetic Acid & Sodium Acetate" />
    <RadioItem value="NH4Cl & NH3" title="NH4Cl & NH3 / Ammonium Chloride & Ammonia" />
    <RadioItem value="NaH2PO4 & Na2HPO4" title="NaH2PO4 & Na2HPO4 / Sodium Dihydrogen Phosphate & Disodium Hydrogen Phosphate" />
    <RadioItem value="NaHCO3 & Na2CO3" title="NaHCO3 & Na2CO3 / Sodium Bicarbonate & Sodium Carbonate" />
    <RadioItem value="H2CO3 & NaHCO3" title="H2CO3 & NaHCO3 / Carbonic Acid & Sodium Bicarbonate" />
  </RadioGroup.Root>
</MenuCard>