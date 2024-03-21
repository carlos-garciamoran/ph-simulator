<script lang="ts">
  import { writable } from 'svelte/store';

  const allowedValues = [
    0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01,
    0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003, 0.002, 0.001,
    0.0009, 0.0008, 0.0007, 0.0006, 0.0005, 0.0004, 0.0003, 0.0002, 0.0001,
  ];

  let index = allowedValues.length - 1; // Start with the smallest value
  let value = writable(allowedValues[index]); // Initialize with the corresponding allowed value

  function onInput(event: Event) {
    index = parseInt((event.target as HTMLInputElement).value);
    value.set(allowedValues[index]); // Update the store with the new value
  }
</script>

<div class="border p-4 flex flex-col gap-4">
  <h2>Concentration (molarity)</h2>
  <div class="flex flex-col gap-2">
    <input type="range" min="0" max="{allowedValues.length - 1}" 
           on:input="{onInput}" 
           step="1" class="w-full" 
           bind:value="{index}" />
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

