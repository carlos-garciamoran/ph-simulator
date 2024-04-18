<script lang="ts">
	import MenuCard from './components/menu-card.svelte';
	import { totalVolume } from './helpers/store';
</script>

<MenuCard title="Total Volume" className="w-full">
	<h3 class="text-center">{$totalVolume.toFixed(3)} mL</h3>
</MenuCard>
