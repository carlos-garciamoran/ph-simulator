<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import RadioItem from '../components/radio-item.svelte';
	import MenuCard from '../components/menu-card.svelte';
	import { concentration, phValueStore, dropCount, currentDrop } from '@/helpers/store';
	import * as calcs from '@/helpers/calculations';


	type Buffer =
		| 'HC2H3O2 & NaC2H3O2'
		| 'NH4Cl & NH3'
		| 'NaH2PO4 & Na2HPO4'
		| 'NaHCO3 & Na2CO3'
		| 'H2CO3 & NaHCO3';

	// Local component state for the selected buffer
	let selectedBuffer: Buffer = 'HC2H3O2 & NaC2H3O2';
	let base_conc=1;
	let pKa_acid=1;
	let drops=dropCount;
	let M_HCl=0.1;
	let M_NaOH=0.1;

	// Function to update the pH value based on the selected buffer and concentration
	function updatePHValue() {
		concentration.subscribe(($concentration) => {
			let pH = 7;
			switch (selectedBuffer) {
				case 'HC2H3O2 & NaC2H3O2':
					// acid and base are defined in each case. in this case HC2H3O2 is the acid and NaC2H3O2 is the base
					
					if ($currentDrop === '.1M-HCl'|| $currentDrop === '.01M HCl') {
						if ($currentDrop == ".1M-HCl") {M_HCl=0.1;} else{M_HCl=0.01;}
						const HC2H3O2_conc = calcs.get_HCl_acid($concentration, M_HCl, $drops);
						const NaC2H3O2_conc = calcs.get_HCl_base(base_conc, M_HCl, $drops);
						if (HC2H3O2_conc <= 0 || NaC2H3O2_conc <= 0) {
							calcs.get_NaC2H3O2_buffer_overload();
							break;
						}
						pH = calcs.get_buffer_system(pKa_acid, $concentration, base_conc, M_HCl, $drops);
					} else if ($currentDrop === '.1M-NaOH'|| $currentDrop === '.01M NaOH') {
						if ($currentDrop == ".1M-NaOH") {M_NaOH=0.1;} else{M_NaOH=0.01;}
						const HC2H3O2_conc = calcs.get_NaOH_acid($concentration, M_NaOH, $drops);
						const NaC2H3O2_conc = calcs.get_NaOH_base(base_conc, M_NaOH, $drops);
						if (HC2H3O2_conc <= 0 || NaC2H3O2_conc <= 0) {
							calcs.get_HC2H3O2_buffer_overload();
							break;
						}
						pH = calcs.get_buffer_system(pKa_acid, $concentration, base_conc, M_NaOH, $drops);
					}
					break;
				case 'NH4Cl & NH3':
					// Add code for NH4Cl & NH3 buffer system
					//define acid n base here
					//copy paste calcs here
					break;
				case 'NaH2PO4 & Na2HPO4':
					// Add code for NaH2PO4 & Na2HPO4 buffer system
					//define acid n base here
					//copy paste calcs here
					break;
				case 'NaHCO3 & Na2CO3':
					// Add code for NaHCO3 & Na2CO3 buffer system
					//define acid n base here
					//copy paste calcs here
					break;
				case 'H2CO3 & NaHCO3':
					// Add code for H2CO3 & NaHCO3 buffer system
					//define acid n base here
					//copy paste calcs here
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
