import adapter from '@sveltejs/adapter-static'; // Change to adapter-static for Electron
import preprocess from 'svelte-preprocess'; // Use svelte-preprocess instead of vitePreprocess

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Use svelte-preprocess for more flexibility with Electron
	preprocess: preprocess(),

	kit: {
		// Configure adapter-static specific for Electron environment
		adapter: adapter({
			fallback: 'index.html', // Specify a fallback for SPA behavior
		}),
		prerender: { entries: [] }, // Define prerendering behavior, if necessary for your Electron app
		alias: {
			'@/*': './src/lib/*' // Keep your existing aliases
		}
	}
};

export default config;
