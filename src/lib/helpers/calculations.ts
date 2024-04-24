import * as constants from '@/helpers/constants';
import { get_HC2H3O2_Hplus } from './calculations/acids-bases';
import { get_NaC2H3O2_Hplus } from './calculations/salts';
import type { DropStruct } from './types';
// READ ME
// Calling variables as arguments is likely redundant as they are global variables
// Keeping them just to be safe tho

// Function to calculate pH from [H+]
// used for acid, bases, salts, and water
export function get_pH(Hplus: number) {
	return -Math.log10(Hplus);
}

////////////////////////////////////////////////////////
//////////////////////// BUFFERS ///////////////////////
////////////////////////////////////////////////////////
export function get_volume_added(drops: number) {
	return constants.dropVolume * drops;
}

export function get_total_volume(drops: number) {
	return 10 + get_volume_added(drops);
}

// 0.1 or 0.01 M
export function get_HCl_H(M_HCl: number, drops: number) {
	return (M_HCl * get_volume_added(drops)) / get_total_volume(drops) + 1e-7;
}
export function get_NaOH_H(M_NaOH: number, drops: number) {
	return constants.Kw / get_HCl_H(M_NaOH, drops);
}

// For Hc2H3O2 (Acetic Acid) / NaC2H3O2 (Sodium Acetate) Buffer System
export function get_ace_buffer_system(NaC2H3O2_conc: number, HC2H3O2_conc: number) {
	return (
		constants.pKa_acetic_acid +
		Math.log10(get_NaC2H3O2_Hplus(NaC2H3O2_conc) / get_HC2H3O2_Hplus(HC2H3O2_conc))
	);
}

export function get_NaC2H3O2_init_M(NaC2H3O2_conc: number) {
	return NaC2H3O2_conc * 10.0;
}

export function get_M_HCl(drops: number, M_HCl: number) {
	return 0.36 * drops * M_HCl;
}

export function get_excess_Hplus(drops: number, M_HCl: number, NaC2H3O2_conc: number) {
	return get_M_HCl(drops, M_HCl) - get_NaC2H3O2_init_M(NaC2H3O2_conc);
}

// H+ method export functionined in the NaC2H3O2 buffer capacity, using the excess H+
export function get_Hplus_fe(drops: number, M_HCl: number, NaC2H3O2_conc: number) {
	const Hplus = get_excess_Hplus(drops, M_HCl, NaC2H3O2_conc) / get_total_volume(drops);
	return Hplus;
}

// HC2H3O2 buffer capacity calculations
// Adding drops of .1 or .01 NaOH
export function get_HC2H3O2_init_M(HC2H3O2_conc: number) {
	return HC2H3O2_conc * 10.0;
}

export function get_M_NaOH(drops: number, M_NaOH: number) {
	return constants.dropVolume * drops * M_NaOH;
}

export function get_excess_OH_HC2H3O2(drops: number, M_NaOH: number, HC2H3O2_conc: number) {
	return get_M_NaOH(drops, M_NaOH) - get_HC2H3O2_init_M(HC2H3O2_conc);
}

export function get_OH(drops: number, M_NaOH: number, HC2H3O2_conc: number) {
	return get_excess_OH_HC2H3O2(drops, M_NaOH, HC2H3O2_conc) / get_total_volume(drops);
}

// H+ method deined in the HC2H3O2 buffer capacity, using excess OH-
export function get_Hplus_OH(drops: number, M_NaOH: number, HC2H3O2_conc: number) {
	const Hplus = constants.Kw / get_OH(drops, M_NaOH, HC2H3O2_conc);
	return Hplus;
}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// For General Acid / Base Buffer System

// pKa_acid, acid, and base are placeholders
export function get_buffer_system(pKa_acid: number, acid_conc: number, base_conc: number) {
	return pKa_acid + Math.log10(base_conc / acid_conc);
}

// Adding drops of .1 or .01 M HCl
export function get_HCl_acid(acid_conc: number, M_HCl: number, drops: number) {
	return ((10 * acid_conc) + (get_volume_added(drops) * M_HCl)) / get_total_volume(drops);
}

// Adding drops of .1 or .01 M HCl
export function get_HCl_base(base_conc: number, M_HCl: number, drops: number) {
	return ((10 * base_conc) - (get_volume_added(drops) * M_HCl)) / get_total_volume(drops);
}

// Base buffer capacity calculations

export function get_base_init_M(base_conc: number) {
	return base_conc * 10.0;
}

export function get_excess_base_H(drops: number, M_HCl: number, base_conc: number) {
	return get_M_HCl(drops, M_HCl) - get_base_init_M(base_conc);
}

// H+ method export functionined in the Base buffer capacity, using the excess H+
export function get_base_Hplus(drops: number, M_HCl: number, base_conc: number) {
	const Hplus = get_excess_base_H(drops, M_HCl, base_conc) / get_total_volume(drops);
	return Hplus;
}

// Acid buffer capacity calculations
// Adding drops of .1 or .01 NaOH
export function get_NaOH_acid(H_conc: number, M_NaOH: number, drops: number) {
	return ((10.0 * H_conc) - (get_volume_added(drops) * M_NaOH)) / get_total_volume(drops);
}

export function get_NaOH_base(Na_conc: number, M_NaOH: number, drops: number) {
	return ((10.0 * Na_conc) + (get_volume_added(drops) * M_NaOH)) / get_total_volume(drops);
}

export function get_acid_init_M(acid_conc: number) {
	return acid_conc * 10.0;
}

export function get_excess_OH(drops: number, acid_conc: number, M_NaOH: number) {
	return get_M_NaOH(drops, M_NaOH) - get_acid_init_M(acid_conc);
}

// Water pH calcs
export function get_water_pH(totalDrops: number, dropType: DropStruct) {
	const totalVolume = get_total_volume(totalDrops);
	const volumeAdded = get_volume_added(totalDrops);

	let concentration;
	if (dropType.type === 'HCl') {
		concentration = (dropType.concentration * volumeAdded) / totalVolume + 1e-7;
	} else {
		concentration = constants.Kw / ((dropType.concentration * volumeAdded) / (totalVolume + 1e-7));
	}

	return get_pH(concentration);
}
