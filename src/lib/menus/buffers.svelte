<script lang="ts">
	import RadioItem from '@/components/radio-item.svelte';
	import MenuCard from '@/components/menu-card.svelte';
	import * as RadioGroup from '@/components/ui/radio-group';
	import * as buffercalcs from '@/helpers/calculations/buffers';
	import { bufferConcentration, phValueStore, currentDrop } from '@/helpers/store';

	type Buffer =
		| 'HC2H3O2 & NaC2H3O2'
		| 'NH4Cl & NH3'
		| 'NaH2PO4 & Na2HPO4'
		| 'NaHCO3 & Na2CO3'
		| 'H2CO3 & NaHCO3';

	// Local component state for the selected buffer
	let selectedBuffer: Buffer = 'HC2H3O2 & NaC2H3O2';

	// Function to update the pH value based on the selected buffer and concentration
	function updatePHValue() {
		bufferConcentration.subscribe(($bufferConc) => {
			let pH = 7;

			// Acid and base are defined in each case.
			// In the first case, HC2H3O2 is the acid and NaC2H3O2 is the base.
			switch (selectedBuffer) {
				case 'HC2H3O2 & NaC2H3O2':
					buffercalcs.calculateBufferSystem(
						selectedBuffer,
						$bufferConc.acid,
						$bufferConc.base,
						$currentDrop,
						0
					);
					break;
				case 'NH4Cl & NH3':
					buffercalcs.calculateBufferSystem(
						selectedBuffer,
						$bufferConc.acid,
						$bufferConc.base,
						$currentDrop,
						0
					);
					break;
				case 'NaH2PO4 & Na2HPO4':
					buffercalcs.calculateBufferSystem(
						selectedBuffer,
						$bufferConc.acid,
						$bufferConc.base,
						$currentDrop,
						0
					);
					break;
				case 'NaHCO3 & Na2CO3':
					buffercalcs.calculateBufferSystem(
						selectedBuffer,
						$bufferConc.acid,
						$bufferConc.base,
						$currentDrop,
						0
					);
					break;
				case 'H2CO3 & NaHCO3':
					buffercalcs.calculateBufferSystem(
						selectedBuffer,
						$bufferConc.acid,
						$bufferConc.base,
						$currentDrop,
						0
					);
					break;
				default:
					pH = 7; // Neutral pH as a default
			}

			phValueStore.set(pH);
		});
	}

	// Watch for changes in selectedBuffer and update the pH value
	$: if (selectedBuffer) {
		updatePHValue();
	}
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
