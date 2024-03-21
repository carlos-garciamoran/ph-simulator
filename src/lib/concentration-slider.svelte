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
else if salts
  salts slider
else if buffers
  buffer slider 1
  buffer slider 2
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

