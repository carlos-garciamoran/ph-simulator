import { derived, writable, type Writable } from 'svelte/store';
import type { DropStruct, DropType, Menu, SelectedBuffer } from './types';
import { acidValues, saltValues, bufferValues } from './constants';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';


// ph Indicator Solution checkbox
export const checkedStore = writable(false);

// Default concentration or whatever starting value you need
export const bufferConcentration = writable({
	acid: 0.001,
	base: 0.001
});

//Default concentration for everything that isn't a buffer
export const concentration = writable(0.07);


// Global store for the pH value
export const phValueStore: Writable<number> = writable();

// 0 means the probe is up, 1 means it's down
export const probePosition = writable(0);

// Current menu selected
export const menu: Writable<Menu> = writable('acids/bases');

// Currently selected drop option (under buffer menu)
export const currentDropType = writable<DropType>('.1M-HCl');
export const currentDrop = writable<DropStruct>({
	type: '',
	concentration: 0.0
});
export const totalDrops = writable(0);

// Selected buffer system
export const selectedBufferStore = writable<SelectedBuffer>('HC2H3O2 & NaC2H3O2');

export const totalVolume: Writable<number> = writable(10);

export const selectedSolutionStore = writable(''); // Default to "Water"

// Concentration of the selected buffer
export const allowedValues = derived(menu, ($menu) => {
	switch ($menu) {
		case 'acids/bases':
			return acidValues;
		case 'salts':
			return saltValues;
		case 'buffers':
			return bufferValues;
		default:
			return []; // For water and household items, no slider values
	}
});

export const sliderIndex = writable(0);

export const concentrationValue = derived(
	[sliderIndex, allowedValues],
	([$index, $allowedValues]) => $allowedValues[$index]
);

export const hasError = writable(false);

// Assuming the probe's starting Y position is at 0 (fully raised)
const startY = 0; // Fully raised position of the probe
const endY = 300; // Fully lowered position of the probe

// The reactive tweened store for smooth animations of the probe's vertical movement
export const probeY = tweened(startY, {
  duration: 500, // Adjust duration as needed for smoothness
  easing: cubicOut
});

// Optionally, create a derived store if you need to reactively use probeY elsewhere in a formatted manner
export const probeTop = derived(probeY, $probeY => $probeY);

// Function to simulate inserting the probe
export function insertProbe() {
	probeY.set(endY); // Move the probe to the lowered position
  }
  
  // Function to simulate removing the probe
  export function removeProbe() {
	probeY.set(startY); // Move the probe back to the raised position
  }
  