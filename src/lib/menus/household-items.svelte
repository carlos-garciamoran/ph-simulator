<script lang="ts">
	import MenuCard from '$lib/components/menu-card.svelte';
	import RadioItem from '$lib/components/radio-item.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import { householdItemsToPH } from '@/helpers/constants';
	import { resetValues } from '@/helpers/reset';
	import { phValueStore, selectedSolutionStore, totalDrops } from '@/helpers/store';
	import { onMount } from 'svelte';

	// Local component state for the selected household item
	let value = '';

	// Calculate the pH value of the selected household item by looking up in the map.
	const handleRadioChange = (newValue: string) => {
		selectedSolutionStore.set(`Household Item: ${newValue.replaceAll('-', ' ')}`);
		const pHValue = householdItemsToPH[newValue];
		phValueStore.set(pHValue);
	};

	if (value) resetValues();

	onMount(() => {
		selectedSolutionStore.set('');
	});
</script>

<MenuCard className="bg-sky-200" title="🧼 Household Items">
	<RadioGroup.Root bind:value onValueChange={handleRadioChange}>
		<RadioItem value="table-salt" title="Table Salt / Sodium Chloride" />
		<RadioItem value="baking-soda" title="Baking Soda / Sodium Bicarbonate" />
		<RadioItem value="hydrogen-peroxide" title="Hydrogen Peroxide, 3% H2O2" />
		<RadioItem value="drano" title="Drano, containing Sodium Hydroxide" />
		<RadioItem value="liquid-plumber" title="Liquid Plumber, containing Sulfuric Acid" />
		<RadioItem value="soft-drink" title="Soft Drink, containing Citric and Carbonic Acids" />
		<RadioItem value="orange-juice" title="Orange Juice, containing Citric and Ascorbic Acids" />
		<RadioItem value="milk" title="Milk" />
		<RadioItem value="dish-soap" title="Dish Soap" />
		<RadioItem value="blood" title="Blood" />
		<RadioItem value="battery-acid" title="Battery Acid, containing Sulfuric Acid" />
		<RadioItem value="ammonia-cleaner" title="Ammonia Cleaner, 2% Ammonium Hydroxide" />
		<RadioItem value="vinegar" title="Vinegar, 5% Acetic Acid" />
	</RadioGroup.Root>
</MenuCard>
