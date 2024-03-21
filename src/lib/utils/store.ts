import { writable } from 'svelte/store';

export const checkedStore = writable(false);

export const concentration = writable(0.07); // Default concentration or whatever starting value you need

export const phValueStore = writable(7.0);