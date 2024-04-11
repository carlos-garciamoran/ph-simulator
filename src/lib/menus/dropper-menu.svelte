<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import RadioItem from '../components/radio-item.svelte';
	import MenuCard from '../components/menu-card.svelte';
	import { currentDrop } from '@/helpers/store';
	import type { DropType } from '@/helpers/types';

	let selectedDropper : DropType;

	function updateDropValue() {
		let parts = selectedDropper.split("-");
		if (parts.length === 2) {
			let [concentration, type] = parts;
			currentDrop.set({
				type: type.replace("M", "").trim(), // HCl or NaOH
				concentration: parseFloat(concentration)
			});
		}
	}
</script>

<MenuCard className="bg-sky-200" title="💦 Add drops">
	<RadioGroup.Root bind:value={selectedDropper} on:change={updateDropValue}>
		<RadioItem value=".1M-HCl" title=".1 M HCl" />
		<RadioItem value=".1M-NaOH" title=".1 M NaOH" />
		<RadioItem value=".01M-HCl" title=".01 M HCl" />
		<RadioItem value=".01M-NaOH" title=".01 M NaOH" />
	</RadioGroup.Root>
</MenuCard>
