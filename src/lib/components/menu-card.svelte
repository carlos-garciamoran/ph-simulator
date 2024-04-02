<script lang="ts">
	import { cn } from '@/utils';

	export let title: string;
	export let className = '';
</script>

<div class={cn('border bg-secondary p-4', className)}>
	<h1 class="text-lg mb-4 border-b pb-1">{title}</h1>
	<slot />
</div>
