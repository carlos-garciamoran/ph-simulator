import { writable, type Writable } from 'svelte/store';

// ph Indicator Solution checkbox
export const checkedStore = writable(false);

// Default concentration or whatever starting value you need
export const concentration = writable(0.07);

// Global store for the pH value
export const phValueStore: Writable<number> = writable();

// 0 means the probe is up, 1 means it's down
export const probePosition = writable(0);

// export const currentMenu = writable('acids'); // Default to 'acids' or any other default value you prefer
