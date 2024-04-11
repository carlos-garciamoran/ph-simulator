<script lang="ts">
	import MenuCard from './components/menu-card.svelte';
	import { dropsCounter } from './helpers/store';
</script>

<MenuCard title="Drops Added" className="w-1/2">
	<ul class="list-inside list-disc">
		<li>HCl: {$dropsCounter.HCl.toFixed(2)} mL</li>
		<li>NaOH: {$dropsCounter.NaOH.toFixed(2)} mL</li>
	</ul>
</MenuCard>
