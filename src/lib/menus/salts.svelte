<script lang="ts">
	import MenuCard from '$lib/components/menu-card.svelte';
	import RadioItem from '$lib/components/radio-item.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import {
		get_NH4Cl_Hplus,
		get_NaC2H3O2_Hplus,
		get_NaHCO3_Hplus,
		get_Na2CO3_Hplus,
		get_NaHSO4_Hplus,
		get_NaCl_Hplus
	} from '@/helpers/calculations/salts';
	import { get_pH } from '$lib/helpers/calculations';
	import { resetValues } from '@/helpers/reset';
	import {
		phValueStore,
		concentration,
		selectedSolutionStore,
		totalDrops
	} from '$lib/helpers/store';
	import { onMount } from 'svelte';
	import { saltValues } from '@/helpers/constants';

	type Salt = 'NaCl' | 'NH4Cl' | 'NaC2H3O2' | 'NaHCO3' | 'Na2CO3' | 'NaHSO4';

	// Local component state for the selected salt
	let selectedSalt: Salt | undefined;

	function updatePHValue() {
		concentration.subscribe(($concentration) => {
			let pH;
			switch (selectedSalt) {
				case 'NaCl':
					pH = get_NaCl_Hplus();
					break;
				case 'NH4Cl':
					pH = get_pH(get_NH4Cl_Hplus($concentration));
					break;
				case 'NaC2H3O2':
					pH = get_pH(get_NaC2H3O2_Hplus($concentration));
					break;
				case 'NaHCO3':
					pH = get_pH(get_NaHCO3_Hplus($concentration));
					break;
				case 'Na2CO3':
					pH = get_pH(get_Na2CO3_Hplus($concentration));
					break;
				case 'NaHSO4':
					pH = get_pH(get_NaHSO4_Hplus($concentration));
					break;
				default:
					pH = 7; // Neutral pH as a default
			}
			phValueStore.set(pH);
		});
	}

	// Watch for changes in selectedSalt and update the pH value
	$: if (selectedSalt) {
		resetValues();
		updatePHValue();
		selectedSolutionStore.set(`Salt: ${selectedSalt}`);
	}

	onMount(() => {
		concentration.set(saltValues[0]);
		selectedSolutionStore.set('');
	});
</script>

<MenuCard className="bg-yellow-200" title="🧂 Salts">
	<RadioGroup.Root bind:value={selectedSalt} on:change={updatePHValue}>
		<RadioItem value="NaCl" title="NaCl / Sodium Chloride" />
		<RadioItem value="NH4Cl" title="NH4Cl / Ammonium Chloride" />
		<RadioItem value="NaC2H3O2" title="NaC2H3O2 / Sodium Acetate" />
		<RadioItem value="NaHCO3" title="NaHCO3 / Sodium Bicarbonate" />
		<RadioItem value="Na2CO3" title="Na2CO3 / Sodium Carbonate" />
		<RadioItem value="NaHSO4" title="NaHSO4 / Sodium Bisulfate" />
	</RadioGroup.Root>
</MenuCard>
