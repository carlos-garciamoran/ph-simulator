import { writable } from 'svelte/store';

// ph Indicator Solution checkbox
export const checkedStore = writable(false);

// Default concentration or whatever starting value you need
export const concentration = writable(0.07);

// Global store for the pH value
export const phValueStore = writable(7.0);

// 0 means the probe is up, 1 means it's down
export const probePosition = writable(0);
