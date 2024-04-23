<script lang="ts">
	import * as RadioGroup from '@/components/ui/radio-group';
	import MenuCard from '@/components/menu-card.svelte';
	import RadioItem from '@/components/radio-item.svelte';
	import { currentDropType, totalDrops, totalVolume } from '@/helpers/store';
	import type { DropType } from '@/helpers/types';

	let selectedDropper: DropType;

	// function updateDropValue(newValue: string) {
	// 	console.log('>>> updateDropValue', newValue);
	// 	let parts = selectedDropper.split('-');
	// 	console.log(parts);
	// 	if (parts.length === 2) {
	// 		let [concentration, type] = parts;
	// 		console.log(concentration, type);
	// 		currentDrop.set({
	// 			type: type.replace('M', '').trim() as 'HCl' | 'NaOH', // HCl or NaOH
	// 			concentration: parseFloat(concentration)
	// 		});
	// 	}
	// }
	function updateDropValue(newValue: string) {
		currentDropType.set(newValue as DropType);
		totalDrops.set(0);
		totalVolume.set(10);
	}
</script>

<MenuCard className="bg-sky-200 w-full" title="💦 Add drops">
	<RadioGroup.Root bind:value={selectedDropper} onValueChange={updateDropValue}>
		<RadioItem value=".1M-HCl" title=".1M HCl" className="whitespace-nowrap" />
		<RadioItem value=".1M-NaOH" title=".1M NaOH" className="whitespace-nowrap" />
		<RadioItem value=".01M-HCl" title=".01M HCl" className="whitespace-nowrap" />
		<RadioItem value=".01M-NaOH" title=".01M NaOH" className="whitespace-nowrap" />
	</RadioGroup.Root>
</MenuCard>
