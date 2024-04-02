<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Label } from "$lib/components/ui/label";
  export let value: string;
  export let title: string;
</script>

<div class="flex items-center space-x-2">
  <RadioGroup.Item value={value} id={value} />
  <Label for={value}>{title}</Label>
</div>