<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
  export let value: string;
</script>

<div class="border p-4">
  <h1 class="text-lg mb-1">Acids / Bases</h1>
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="Ba(OH)2" title="Salt 1" />
    <RadioItem value="Ca(OH)2" title="Calcium Hydroxide" />
    <RadioItem value="NaOH" title="Sodium Hydroxide" />
    <RadioItem value="NH4OH" title="Ammonium Hydroxide (NH3/H2O)" />
    <RadioItem value="HCl" title="Hydrochloric Acid" />
    <RadioItem value="HNO3" title="Nitric Acid" />
    <RadioItem value="HC2H3O2" title="Acetic Acid" />
    <RadioItem value="H2CO3" title="Carbonic Acid" />
  </RadioGroup.Root>
</div>