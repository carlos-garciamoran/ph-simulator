<script lang="ts">
	import { writable, derived } from 'svelte/store';

	import { bufferConcentration, concentration, menu, selectedBufferStore } from './helpers/store';

	const acidValues = [
		0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005,
		0.004, 0.003, 0.002, 0.001, 0.0009, 0.0008, 0.0007, 0.0006, 0.0005, 0.0004, 0.0003, 0.0002,
		0.0001
	];
	const saltValues = [
		0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005,
		0.004, 0.003, 0.002, 0.001
	];
	const bufferValues = [
		1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02,
		0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003, 0.002, 0.001
	];

	export let type: 'normal' | 'acid' | 'base';

	const title = derived(selectedBufferStore, ($currentBuffer) => {
		if (type === 'normal') return 'Concentration (molarity)';
		if (type === 'acid') {
			switch ($currentBuffer) {
				case 'HC2H3O2 & NaC2H3O2':
					return 'Acetic Acid';
				case 'NH4Cl & NH3':
					return 'Ammonium Chloride';
				case 'NaH2PO4 & Na2HPO4':
					return 'Sodium Dihydrogen Phosphate';
				case 'NaHCO3 & Na2CO3':
					return 'Sodium Bicarbonate';
				case 'H2CO3 & NaHCO3':
					return 'Carbonic Acid';
				default:
					return 'Concentration (molarity)';
			}
		} else if (type === 'base') {
			switch ($currentBuffer) {
				case 'HC2H3O2 & NaC2H3O2':
					return 'Sodium Acetate';
				case 'NH4Cl & NH3':
					return 'Ammonia';
				case 'NaH2PO4 & Na2HPO4':
					return 'Disodium Hydrogen Phosphate';
				case 'NaHCO3 & Na2CO3':
					return 'Sodium Carbonate';
				case 'H2CO3 & NaHCO3':
					return 'Sodium Bicarbonate';
				default:
					return 'Concentration (molarity)';
			}
		}
	});

	// Derived store to dynamically set allowed values based on the current menu
	const allowedValues = derived(menu, ($menu) => {
		switch ($menu) {
			case 'acids/bases':
				return acidValues;
			case 'salts':
				return saltValues;
			case 'buffers':
				return bufferValues;
			default:
				return []; // For water and household items, no slider values
		}
	});

	let index = 0;
	let value = writable($allowedValues[index]);

	function onInput(event: Event) {
		index = parseInt((event.target as HTMLInputElement).value);
		const newValue = $allowedValues[index];
		value.set(newValue);

		// Update global state accordingly
		if (type === 'acid') {
			bufferConcentration.update((prev) => ({ ...prev, acid: newValue }));
		} else if (type === 'base') {
			bufferConcentration.update((prev) => ({ ...prev, base: newValue }));
		} else {
			concentration.set(newValue);
		}
	}
</script>

<div class="border p-4 flex flex-col gap-4">
	<h2>{$title}</h2>
	<div class="flex flex-col gap-2">
		<input
			type="range"
			min="0"
			max={$allowedValues.length - 1}
			on:input={onInput}
			step="1"
			class="w-full"
			bind:value={index}
		/>
		<p class="text-center">
			{$value.toFixed(4)} M <!-- Use the store value directly -->
		</p>
	</div>
</div>

<!-- OLD SLIDER - might use this in v2
  <script lang="ts">
  import type { Slider as SliderPrimitive } from "bits-ui";
  import { Slider } from "$lib/components/ui/slider";

  export let value: SliderPrimitive.Props["value"];
</script>


<div class="border p-4 flex flex-col gap-4">
  <h2>Concentration (molarity)</h2>
  <div class="flex flex-col gap-2">
    <Slider bind:value min={0.0001} max={0.1} step={0.0001} class="w-full" />
    <p class="text-center">{value} M</p>
  </div>
</div> -->

<!-- PSEUDO CODE
if acids
  acids slider
    slider with exact values of: 
    .1 .09 .08 .07 .06 .05 .04 .03 .02 .01
    .009 .008 .007 .006 .005 .004 .003 .002 .001
    .0009 .0008 .0007 .0006 .0005 .0004 .0003 .0002 .0001
else if salts
  salts slider
    slider with exact values of:
      .1 .09 .08 .07 .06 .05 .04 .03 .02 .01
      .009 .008 .007 .006 .005 .004 .003 .002 .001
else if buffers
  buffer slider 1
  buffer slider 2
  sliders exact values
    1 .9 .8 .7 .6 .5 .4 .3 .2 .1
  .09 .08 .07 .06 .05 .04 .03 .02 .01
  .009 .008 .007 .006 .005 .004 .003 .002 .001
  dropper
    Goes from 0 to 20 drops
    Changes volume by .036 mL per drop
else if water
  dropper
    Goes from 0 to 20 drops
    Changes volume by .036 mL per drop
else household items
  remove all slider elements (just shows constant ph values)
-->
