<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import RadioItem from "../helpers/radio-item.svelte";
  import MenuCard from "./menu-card.svelte";
  import { phValueStore, concentration } from '$lib/utils/store';
  import * as calculations from '$lib/utils/calculations';

  // Local component state for the selected acid/base
  let selectedAcidBase = '';

  // Function to update the pH value based on the selected acid/base and concentration
  function updatePHValue() {
    concentration.subscribe(($concentration) => {
      let pH;
      switch (selectedAcidBase) {
        case 'Ba(OH)2':
          pH = calculations.get_pH(calculations.get_Ba_OH_2_Hplus($concentration));
          break;
        case 'Ca(OH)2':
          pH = calculations.get_pH(calculations.get_CA_OH_2_Hplus($concentration));
          break;
        case 'NaOH':
          pH = calculations.get_pH(calculations.get_NaOH_Hplus($concentration));
          break;
        case 'NH4OH':
          pH = calculations.get_pH(calculations.get_NH4OH_Hplus($concentration));
          break;
        case 'HCl':
          pH = calculations.get_pH(calculations.get_HCl_Hplus($concentration));
          break;
        case 'HNO3':
          pH = calculations.get_pH(calculations.get_HNO3_Hplus($concentration));
          break;
        case 'HC2H3O2':
          pH = calculations.get_pH(calculations.get_HC2H3O2_Hplus($concentration));
          break;
        case 'H2CO3':
          pH = calculations.get_pH(calculations.get_H2CO3_Hplus($concentration));
          break;
        default:
          pH = 7; // Neutral pH as a default
      }
      phValueStore.set(pH); // Update the shared pH value store
    });
  }

  // Watch for changes in selectedAcidBase and update the pH value
  $: if (selectedAcidBase) {
    updatePHValue();
  }
</script>

<MenuCard className="bg-lime-200" title="Acids / Bases">
  <RadioGroup.Root bind:value={selectedAcidBase} on:change={updatePHValue}>
    <RadioItem value="Ba(OH)2" title="Ba(OH)2 / Barium Hydroxide" />
    <RadioItem value="Ca(OH)2" title="Ca(OH)2 / Calcium Hydroxide" />
    <RadioItem value="NaOH" title="NaOH / Sodium Hydroxide" />
    <RadioItem value="NH4OH" title="NH4OH / Ammonium Hydroxide (NH3/H2O)" />
    <RadioItem value="HCl" title="HCl / Hydrochloric Acid" />
    <RadioItem value="HNO3" title="HNO3 / Nitric Acid" />
    <RadioItem value="HC2H3O2" title="HC2H3O2 / Acetic Acid" />
    <RadioItem value="H2CO3" title="H2CO3 / Carbonic Acid" />
  </RadioGroup.Root>
</MenuCard>
