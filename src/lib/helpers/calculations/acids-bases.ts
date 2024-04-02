////////////////////////////////////////////////////////
///////////////////// ACIDS / BASES ////////////////////
////////////////////////////////////////////////////////
import { Kw, Ka_acetic_acid, Ka_carbonic_acid, Kb_ammonia } from '@/helpers/constants';

/**
 * Barium Hydroxide, strong base
 * @param Ba_OH_2_conc concentration
 * @returns pH
 */
export function get_Ba_OH_2_Hplus(Ba_OH_2_conc: number) {
	return Kw / (2 * Ba_OH_2_conc);
}

/**
 * Calcium Hydroxide, strong base
 * @param CA_OH_2_conc concentration
 * @returns pH
 */
export function get_CA_OH_2_Hplus(CA_OH_2_conc: number) {
	return Kw / (2 * CA_OH_2_conc);
}

/**
 * Sodium Hydroxide, strong base
 * @param NaOH_conc concentration
 * @returns pH
 */
export function get_NaOH_Hplus(NaOH_conc: number) {
	return Kw / NaOH_conc;
}

/**
 * Ammonium Hydroxide, weak base
 * @param NH4OH_conc concentration
 * @returns pH
 */
export function get_NH4OH_Hplus(NH4OH_conc: number) {
	return Kw / Math.sqrt(Kb_ammonia * NH4OH_conc);
}

/**
 * Hydrochloric Acid, strong acid
 * @param HCl_conc concentration
 * @returns pH
 */
export function get_HCl_Hplus(HCl_conc: number) {
	return HCl_conc;
}

/**
 * Nitric Acid, strong acid
 * @param HNO3_conc concentration
 * @returns pH
 */
export function get_HNO3_Hplus(HNO3_conc: number) {
	return HNO3_conc;
}

/**
 * Acetic Acid, weak acid
 * @param HC2H3O2_conc concentration
 * @returns pH
 */
export function get_HC2H3O2_Hplus(HC2H3O2_conc: number) {
	return Math.sqrt(Ka_acetic_acid * HC2H3O2_conc);
}

/**
 * Carbonic Acid, weak acid
 * @param H2CO3_conc concentration
 * @returns pH
 */
export function get_H2CO3_Hplus(H2CO3_conc: number) {
	return Math.sqrt(Ka_carbonic_acid * H2CO3_conc);
}
