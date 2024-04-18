////////////////////////////////////////////////////////
///////////////////////// SALTS ////////////////////////
////////////////////////////////////////////////////////
import {
	Kw,
	Kb_ammonia,
	Ka_acetic_acid,
	Ka_carbonic_acid,
	Ka_bicarbonate,
	Ka_hydrogen_sulfate
} from '../constants';

// Sodium Chloride, neutral salt
export function get_NaCl_Hplus() {
	return 7;
}

// Ammonium Chloride, acidic salt of NH3
export function get_NH4Cl_Hplus(NH4Cl_conc: number) {
	return Math.sqrt((Kw / Kb_ammonia) * NH4Cl_conc);
}

// Sodium Acetate, basic salt of HC2H3O2
export function get_NaC2H3O2_Hplus(NaC2H3O2_conc: number) {
	return Kw / Math.sqrt((Kw / Ka_acetic_acid) * NaC2H3O2_conc);
}

// Sodium Bicarbonate, basic salt H2CO3
export function get_NaHCO3_Hplus(NaHCO3_conc: number) {
	return Kw / Math.sqrt((Kw /Ka_carbonic_acid )* NaHCO3_conc);
}
//=($G$4)/SQRT((($G$4)/(G18))*(D18))

// Sodium Carbonate, basic salt of HCO3
export function get_Na2CO3_Hplus(Na2CO3_conc: number) {
	return Kw / Math.sqrt((Kw / Ka_bicarbonate) * Na2CO3_conc);
}

// Sodium Bisulfate, acidic salt of H2SO4
export function get_NaHSO4_Hplus(NaHSO4_conc: number) {
	return Math.sqrt(Ka_hydrogen_sulfate * NaHSO4_conc);
}
