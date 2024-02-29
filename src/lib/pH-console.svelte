<script>
	import Button from "./components/ui/button/button.svelte";
	import Checkbox from "./components/ui/checkbox/checkbox.svelte";

	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<div class="border-2 max-w-sm mx-auto p-4 m-4">
	<div class="flex justify-between items-center mt-1 ml-4 mr-4 mb-2">
		<p>pH</p>
		<span id="phValue">7.0</span>
	</div>
		<div class="flex items-center justify-center mb-2">
			<Checkbox class="mr-2"></Checkbox> 
			<p>pH Indicator Solution</p>
		</div>
	<div class="flex gap-2 mx-auto w-full justify-center mb-2">
		<Button on:click={handleClick}>
			Insert Probe
		</Button>
		<Button on:click={handleClick}>
			Remove probe
		</Button>
	</div>
</div>
