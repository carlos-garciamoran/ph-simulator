<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
  export let value: string;
</script>

<div class="border p-4">
  <h1 class="text-lg mb-1">Acids / Bases</h1>
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="Ba(OH)2" title="Ba(OH)2 / Barium Hydroxide" />
    <RadioItem value="Ca(OH)2" title="Ca(OH)2 / Calcium Hydroxide" />
    <RadioItem value="NaOH" title="NaOH / Sodium Hydroxide" />
    <RadioItem value="NH4OH" title="NH4OH / Ammonium Hydroxide (NH3/H2O)" />
    <RadioItem value="HCl" title="HCl / Hydrochloric Acid" />
    <RadioItem value="HNO3" title="HNO3 / Nitric Acid" />
    <RadioItem value="HC2H3O2" title="HC2H3O2 / Acetic Acid" />
    <RadioItem value="H2CO3" title="H2CO3 / Carbonic Acid" />
  </RadioGroup.Root>
</div>