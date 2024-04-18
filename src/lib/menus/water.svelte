<script lang="ts">
	import { get_pH } from '@/helpers/calculations';
	import { phValueStore, totalDrops, totalVolume, currentDropType } from '@/helpers/store';

	$: console.log(totalDrops);

	function updatePHValue() {
		const newPH = get_pH;
		phValueStore.set(7);
	}

	phValueStore.set(7);
</script>
