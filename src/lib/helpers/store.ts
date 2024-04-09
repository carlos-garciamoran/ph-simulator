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

// Number of drops used, 20 max
export const dropCountHCl = writable(0);
export const dropCountNaOH = writable(0);

// Current menu selected
export const menu: Writable<Menu> = writable('acids/bases');

// TODO: type this as 4 types
// Currently selected drop option (under buffer menu)
export const currentDrop = writable({ type: '', concentration: 0 });

// Define the type for the drops counter
interface DropsCounter {
	[key: string]: number;
}

export const dropsCounter: Writable<DropsCounter> = writable({ HCl: 0, NaOH: 0 });

export type Buffer =
	| 'HC2H3O2 & NaC2H3O2'
	| 'NH4Cl & NH3'
	| 'NaH2PO4 & Na2HPO4'
	| 'NaHCO3 & Na2CO3'
	| 'H2CO3 & NaHCO3';

export const selectedBufferStore = writable<Buffer>('HC2H3O2 & NaC2H3O2');
