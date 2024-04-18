import { cubicOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';
import { derived } from 'svelte/store';
import { checkedStore, probePosition } from './store';

// Assuming the probe's starting Y position is at 0 (fully raised)
const startY = 0; // Fully raised position of the probe
const endY = 300; // Fully lowered position of the probe

// The reactive tweened store for smooth animations of the probe's vertical movement
export const probeY = tweened(startY, {
	duration: 500, // Adjust duration as needed for smoothness
	easing: cubicOut
});

// Optionally, create a derived store if you need to reactively use probeY elsewhere in a formatted manner
export const probeTop = derived(probeY, ($probeY) => $probeY);

// Functions insertProbe and removeProbe are now triggered from the UI directly,
// and the animation of the probe's Y position is managed through the probeY store

// Function to simulate inserting the probe
export function insertProbe() {
	probeY.set(endY); // Move the probe to the lowered position
}

// Function to simulate removing the probe
export function removeProbe() {
	checkedStore.set(false);
	probePosition.set(0);
	probeY.set(startY); // Move the probe back to the raised position
}
