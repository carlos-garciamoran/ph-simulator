import { writable, type Writable } from 'svelte/store';
type Menu = 'acids/bases' | 'salts' | 'buffers' | 'household-items' | 'water';

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

// number of drops used, 20 max
export const dropCount = writable(0);

// Current menu selected
export const menu: Writable<Menu> = writable('acids/bases');

// TODO: type this as 4 types
// Currently selected drop option (under buffer menu)
export const currentDrop: Writable<string> = writable('');
