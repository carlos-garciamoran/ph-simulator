<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "./helpers/radio-item.svelte";
  let selectedValue = 'comfortable'; // Initialize the selected value
</script>

<div class="border p-8 h-fit">
  <RadioGroup.Root bind:value={selectedValue}>
    <RadioItem value="spacious" title="Spacious" />
    <RadioItem value="comfortable" title="Comfortable" />
    <RadioItem value="compact" title="Compact" />
    <!-- <RadioGroup.Input name="spacing" /> -->
  </RadioGroup.Root>
  <h1>Current option: {selectedValue}</h1>
</div>