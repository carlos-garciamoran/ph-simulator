<script lang="ts">
	export let title: string;
</script>

{#each title.split(/(\d+(?!%|\.\d)|(?<![\d.])\d+(?:\.\d+)?%)/g) as part}
	{#if /\d+(?!%|\.\d)/.test(part)}
		<sub>{part}</sub>
	{:else}
		{part}
	{/if}
{/each}
