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