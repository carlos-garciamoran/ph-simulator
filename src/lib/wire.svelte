<script lang="ts">
	import { onMount } from 'svelte';

	import { probeTop, probeY } from './helpers/probe';

	let wireElement: HTMLElement; // DOM reference to the wire element

	function updateWirePosition() {
		if (typeof document !== 'undefined') {
			const consoleElement = document.getElementById('console');
			if (consoleElement && wireElement) {
				const consoleRect = consoleElement.getBoundingClientRect();
				const wireStartX = probeTop;
				const wireStartY = consoleRect.top;
				const wireEndY = $probeY + 300; // Make sure $probeY is reactive

				wireElement.style.height = `${wireEndY - wireStartY}px`;
				wireElement.style.top = `${wireStartY}px`;
				wireElement.style.left = `${wireStartX}px`;
			}
		}
	}

	$: $probeY, updateWirePosition();

	onMount(() => {
		updateWirePosition();
	});
</script>

<!-- Wire visual representation -->
<div bind:this={wireElement} class="wire"></div>

<style>
	.wire {
		position: absolute;
		width: 5px;
		background-color: #606060;
		transform: translateX(-50%);
	}
</style>
