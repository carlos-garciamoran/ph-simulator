import { derived, writable, type Writable } from 'svelte/store';

import type { DropStruct, DropType, Menu, SelectedBuffer } from './types';
import { acidValues, saltValues, bufferValues } from './constants';

// ph Indicator Solution checkbox
export const checkedStore = writable(false);

// Default concentration or whatever starting value you need
export const bufferConcentration = writable({
	acid: 0.0,
	base: 0.0
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

// Number of drops added. 20 max for each.
export const dropsCounter = writable({ HCl: 0, NaOH: 0 });

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
