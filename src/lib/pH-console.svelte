<script>
	import Button from "./components/ui/button/button.svelte";

	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<div class="border-2 w-full">
	<p>pH</p>
	<div class="flex gap-2 mx-auto w-full">
		<button on:click={handleClick}>
			Insert probe
		</button>
		<button class="border rounded-md" on:click={handleClick}>
			Remove probe
		</button>
		<Button on:click={handleClick}>
			Insert probe
		</Button>
	</div>
</div>
