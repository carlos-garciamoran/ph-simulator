<script lang="ts">
	import * as RadioGroup from '@/components/ui/radio-group';
	import MenuCard from '@/components/menu-card.svelte';
	import RadioItem from '@/components/radio-item.svelte';
	import { currentDrop, currentDropType } from '@/helpers/store';
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
		console.log('>>> updateDropValue', newValue);
		currentDropType.set(newValue as DropType);
	}
</script>

<MenuCard className="bg-sky-200" title="💦 Add drops">
	<RadioGroup.Root bind:value={selectedDropper} onValueChange={updateDropValue}>
		<RadioItem value=".1M-HCl" title=".1 M HCl" />
		<RadioItem value=".1M-NaOH" title=".1 M NaOH" />
		<RadioItem value=".01M-HCl" title=".01 M HCl" />
		<RadioItem value=".01M-NaOH" title=".01 M NaOH" />
	</RadioGroup.Root>
</MenuCard>
