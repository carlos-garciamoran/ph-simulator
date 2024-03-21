import { writable } from 'svelte/store';

export const probePosition = writable(0); // 0 means the probe is up, 1 means it's down
