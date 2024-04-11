<script lang="ts">
	import MenuCard from './components/menu-card.svelte';
	import { dropsCounter, totalVolume } from './helpers/store';
  </script>
  
  <div class="flex flex-col gap-4"> <!-- This ensures vertical stacking -->
	<MenuCard title="Drops Added" className="w-full"> <!-- Use w-full for full width -->
	  <ul class="list-inside list-disc">
		<li>HCl: {$dropsCounter.HCl.toFixed(2)} mL</li>
		<li>NaOH: {$dropsCounter.NaOH.toFixed(2)} mL</li>
	  </ul>
	</MenuCard>
  
	<MenuCard title="Total Volume" className="w-full"> <!-- Use w-full for full width -->
	  <div class="text-center"> <!-- Center align the content -->
		<h3>{$totalVolume.toFixed(3)} mL</h3>
	  </div>
	</MenuCard>
  </div>