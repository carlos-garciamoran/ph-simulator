<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
  export let value: string;
</script>

<div class="border p-4">
  <h1 class="text-lg mb-1">Acids / Bases</h1>
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="Water" title="Water" />
  </RadioGroup.Root>
</div>