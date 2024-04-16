<script lang="ts">
	import { derived } from 'svelte/store';

	import {
		allowedValues,
		bufferConcentration,
		concentration,
		selectedBufferStore,
		sliderIndex
	} from './helpers/store';

	export let type: 'normal' | 'acid' | 'base';

	const title = derived(selectedBufferStore, ($currentBuffer) => {
		if (type === 'normal') return 'Concentration';
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
					return 'Concentration';
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
					return 'Concentration';
			}
		}
	});

	let index = type === 'normal' ? $sliderIndex : 0;
	let value = $allowedValues[index];

	function onInput(event: Event) {
		const newIndex = parseInt((event.target as HTMLInputElement).value);
		value = $allowedValues[newIndex];

		// Update global state accordingly
		if (type === 'acid') {
			index = newIndex;
			bufferConcentration.update((prev) => ({ ...prev, acid: value }));
		} else if (type === 'base') {
			index = newIndex;
			bufferConcentration.update((prev) => ({ ...prev, base: value }));
		} else {
			sliderIndex.set(newIndex);
			concentration.set(value);
		}
	}
</script>

<div class="border p-4 flex flex-col gap-4">
	<h2>{$title} (Molarity)</h2>
	<div class="flex flex-col gap-2">
		<input
			type="range"
			min={0}
			step={1}
			class="w-full"
			max={$allowedValues.length - 1}
			on:input={onInput}
			bind:value={index}
		/>
		<p class="text-center">
			{value.toFixed(4)} M
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
