<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import SubscriptLabel from './subscript-label.svelte';
	export let value: string;
	export let title: string;
	export let className: string = '';
</script>

<div class="flex items-center space-x-2">
	<RadioGroup.Item {value} id={value} />
	<Label class={className} for={value}>
		{#if title.startsWith('.1') || title.startsWith('.01')}
			{title}
		{:else}
			<SubscriptLabel bind:title />
		{/if}
	</Label>
</div>
