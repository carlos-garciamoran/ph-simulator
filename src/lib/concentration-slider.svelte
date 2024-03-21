<script lang="ts">
  import type { Slider as SliderPrimitive } from "bits-ui";
  import { Slider } from "$lib/components/ui/slider";

  export let value: SliderPrimitive.Props["value"];
</script>

<!-- TODO: add settings -->
<div class="border p-4 flex flex-col gap-4">
  <h2>Concentration (molarity)</h2>
  <div class="flex flex-col gap-2">
    <Slider bind:value min={0.0001} max={0.1} step={0.0001} class="w-full" />
    <p class="text-center">{value} M</p>
  </div>
</div>


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

