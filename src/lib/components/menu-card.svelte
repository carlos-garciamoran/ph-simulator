<script lang="ts">
	import { cn } from '@/utils';

	export let title: string;
	export let className = '';
</script>

<div class={cn('border border-neutral-400 bg-secondary', className)}>
	<h1 class="text-lg mb-4 border-b border-neutral-400 py-2 px-4">{title}</h1>
	<div class="p-4 pt-0">
		<slot />
	</div>
</div>
