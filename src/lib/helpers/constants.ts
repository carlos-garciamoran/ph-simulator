// Constants
export const Kw = 1e-14;
export const Ka_acetic_acid = 1.8e-5; // Used for HC2H3O2
export const Ka_carbonic_acid = 4.3e-7; // Used for H2CO3
export const Ka_bicarbonate = 5.6e-11; // Used for NaHCO3
export const Ka_dihydrogen_phosphate = 6.2e-8; // Used for NaH2PO4
export const Ka_hydrogen_sulfate = 1.2e-2; // Used for NaHSO4
export const Kb_ammonia = 1.8e-5; // Used for NH3

// pKa values for weak acids and bases
export const pKa_acetic_acid = 4.745; // Used for HC2H3O2
export const pKa_ammonium_chloride = 9.255; // Used for NH4Cl
export const pKa_sodium_dihydrogen_phosphate = 7.208; // Used for NaH2PO4
export const pKa_sodium_bicarbonate = 10.252; // Used for HO3 // strange minus mark at the end (ignored)
export const pKa_carbonic_acid = 6.367; // Used for H2CO3

// other consts
export const initial_water_pH = 7;
export const drop_volume = 0.036;
export const drops = 0;
export const volumeToAdd = 0.036;
// export const base_conc=0
// export const acid_conc=0
// export const M_HCl=0
// export const M_NaOH=0;
// export const Hplus=0;
// export const excessHplus=0;
// export const excessOH=0;
// export const OH=0;

// chemical concentrations, safe measure in case multiple chemicals require accessing the same conc variable

// export const Ba_OH_2_conc=0;

// // Calcium Hydroxide, strong base
// export const CA_OH_2_conc=0;

// // Sodium Hydroxide, strong base
// export const NaOH_conc=0;

// // Ammonium Hydroxide, weak base
// export const NH4OH_conc=0;

// // Hydrochloric Acid, strong acid
// export const HCl_conc=0;

// // Nitric Acid, strong acid
// export const HNO3_conc=0;

// // Acetic Acid, weak acid
// export const HC2H3O2_conc=0;

// // Carbonic Acid, weak acid
// export const H2CO3_conc=0;

// // Sodium Chloride, neutral salt
// export const NaCl=7;

// // Ammonium Chloride, acidic salt of NH3
// export const NH4Cl_conc=0;

// // Sodium Acetate, basic salt of HC2H3O2
// export const NaC2H3O2_conc=0;

// // Sodium Bicarbonate, basic salt H2CO3
// export const NaHCO3_conc=0;

// // Sodium Carbonate, basic salt of HCO3
// export const Na2CO3_conc=0;

// // Sodium Bisulfate, acidic salt of H2SO4
// export const NaHSO4_conc=0;

export const householdItemsToPH: Record<string, number> = {
	'table-salt': 7.0,
	'baking-soda': 8.3,
	'hydrogen-peroxide': 6.2,
	drano: 12.0,
	'liquid-plumber': 1.0,
	'soft-drink': 3.2,
	'orange-juice': 3.9,
	milk: 6.8,
	'dish-soap': 8.7,
	blood: 7.4,
	'battery-acid': 1.0,
	'ammonia-cleaner': 11.6,
	vinegar: 2.4
};
