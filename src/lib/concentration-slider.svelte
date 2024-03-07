<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  let concentration = [0.7];
</script>

<!-- TODO: add settings -->
<div class="border p-6 flex flex-col gap-2">
  <h2>Concentration (molarity)</h2>
  <Slider value={concentration} min={0.0001} max={0.1} step={0.0001} class="w-full" />
  <p class="text-center">{concentration} M</p>
</div>