<script lang="ts">
	import * as RadioGroup from '@/components/ui/radio-group';
	import { get_pH } from '@/helpers/calculations';
	import * as calcs from '@/helpers/calculations/acids-bases';
	import { phValueStore, concentration, selectedSolutionStore, totalDrops } from '@/helpers/store';

	import MenuCard from '../components/menu-card.svelte';
	import RadioItem from '../components/radio-item.svelte';
	import { resetValues } from '@/helpers/reset';
	import { onMount } from 'svelte';
	import { acidValues } from '@/helpers/constants';

	type AcidBase = 'Ba(OH)2' | 'Ca(OH)2' | 'NaOH' | 'NH4OH' | 'HCl' | 'HNO3' | 'HC2H3O2' | 'H2CO3';

	// Local component state for the selected acid/base
	let selectedAcidBase: AcidBase | undefined;

	// Function to update the pH value based on the selected acid/base and concentration
	function updatePHValue() {
		concentration.subscribe(($concentration) => {
			let pH;
			switch (selectedAcidBase) {
				case 'Ba(OH)2':
					pH = get_pH(calcs.get_Ba_OH_2_Hplus($concentration));
					break;
				case 'Ca(OH)2':
					pH = get_pH(calcs.get_CA_OH_2_Hplus($concentration));
					break;
				case 'NaOH':
					pH = get_pH(calcs.get_NaOH_Hplus($concentration));
					break;
				case 'NH4OH':
					pH = get_pH(calcs.get_NH4OH_Hplus($concentration));
					break;
				case 'HCl':
					pH = get_pH(calcs.get_HCl_Hplus($concentration));
					break;
				case 'HNO3':
					pH = get_pH(calcs.get_HNO3_Hplus($concentration));
					break;
				case 'HC2H3O2':
					pH = get_pH(calcs.get_HC2H3O2_Hplus($concentration));
					break;
				case 'H2CO3':
					pH = get_pH(calcs.get_H2CO3_Hplus($concentration));
					break;
				default:
					pH = 7; // Neutral pH as a default
			}
			phValueStore.set(pH);
		});
	}

	// Watch for changes in selectedAcidBase and update the pH value
	$: if (selectedAcidBase) {
		resetValues();
		updatePHValue();
		selectedSolutionStore.set(`Acids / Bases: ${selectedAcidBase}`);
	}

	onMount(() => {
		concentration.set(acidValues[0]);
		selectedSolutionStore.set('');
	});
</script>

<MenuCard className="bg-lime-200" title="🧪 Acids / Bases">
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
