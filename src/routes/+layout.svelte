<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import '../app.css';
</script>

<div id="root" class="w-full h-screen">
	<slot />
	<footer class="text-sm text-center py-2">
		© 2024 Aleksa Belic, Julian Diaz, Kenan Imamovic, Carlos García Morán, Dr. Ron Ruszczyk
	</footer>
	<SvelteToast />
</div>

<style>
	:root {
		--toastContainerTop: 125px;
		--toastContainerRight: 66px;
		--toastContainerBottom: auto;
		--toastContainerLeft: auto;
	}
</style>
