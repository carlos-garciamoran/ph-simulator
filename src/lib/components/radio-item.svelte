<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import SubscriptLabel from './subscript-label.svelte';
	export let value: string;
	export let title: string;
</script>

<div class="flex items-center space-x-2">
	<RadioGroup.Item {value} id={value} />
	<Label for={value}>
		<SubscriptLabel bind:title />
	</Label>
</div>
