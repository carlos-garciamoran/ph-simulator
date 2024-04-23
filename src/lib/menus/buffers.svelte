<script lang="ts">
	import { onMount } from 'svelte';

	import MenuCard from '@/components/menu-card.svelte';
	import RadioItem from '@/components/radio-item.svelte';
	import * as RadioGroup from '@/components/ui/radio-group';
	import { calculateBufferSystem } from '@/helpers/calculations/buffers';
	import {
		bufferConcentration,
		phValueStore,
		totalDrops,
		selectedBufferStore,
		selectedSolutionStore
	} from '@/helpers/store';
	import type { SelectedBuffer } from '@/helpers/types';
	import { resetValues } from '@/helpers/reset';

	// Local component state for the selected buffer
	let selectedBuffer: SelectedBuffer | undefined;

	console.log($totalDrops);

	// Function to update the pH value based on the selected buffer and concentration
	function updatePHValue() {
		if (!selectedBuffer) return;
		bufferConcentration.subscribe(($bufferConc) => {
			const new_pH = calculateBufferSystem(
				selectedBuffer as SelectedBuffer,
				$bufferConc.acid,
				$bufferConc.base,
				$totalDrops
			);
			phValueStore.set(new_pH);
		});

		totalDrops.subscribe(($totalDrops) => {
			const new_pH = calculateBufferSystem(
				selectedBuffer as SelectedBuffer,
				$bufferConcentration.acid,
				$bufferConcentration.base,
				$totalDrops
			);
			phValueStore.set(new_pH);
		});
	}

	// Watch for changes in selectedBuffer and update the pH value
	$: if (selectedBuffer) {
		selectedSolutionStore.set(`Buffer: ${selectedBuffer}`);
		selectedBufferStore.set(selectedBuffer);
		resetValues();
		updatePHValue();
	}

	onMount(() => {
		selectedSolutionStore.set('');
	});
</script>

<MenuCard className="bg-orange-200" title="🧑🏻‍🔬 Buffers">
	<RadioGroup.Root bind:value={selectedBuffer}>
		<RadioItem
			value="HC2H3O2 & NaC2H3O2"
			title="HC2H3O2 & NaC2H3O2 / Acetic Acid & Sodium Acetate"
		/>
		<RadioItem value="NH4Cl & NH3" title="NH4Cl & NH3 / Ammonium Chloride & Ammonia" />
		<RadioItem
			value="NaH2PO4 & Na2HPO4"
			title="NaH2PO4 & Na2HPO4 / Sodium Dihydrogen Phosphate & Disodium Hydrogen Phosphate"
		/>
		<RadioItem
			value="NaHCO3 & Na2CO3"
			title="NaHCO3 & Na2CO3 / Sodium Bicarbonate & Sodium Carbonate"
		/>
		<RadioItem value="H2CO3 & NaHCO3" title="H2CO3 & NaHCO3 / Carbonic Acid & Sodium Bicarbonate" />
	</RadioGroup.Root>
</MenuCard>
