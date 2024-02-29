import * as constants from "$lib/constants"
// READ ME
// Calling variables as arguments is likely redundant as they are global variables
// Keeping them just to be safe tho
//
// Function to calculate pH from [H+]
// used for acid, bases, salts, and water
function get_pH()  {

    return - Math.log10(constants.Hplus)
}

// Function to calculate pH from concs
// used for buffers
function get_pH_buffer(pKa: number, base_conc, acid_conc)  {

    return pKa+ Math.log10(base_conc/acid_conc)
}


// Function to calculate pKa from Ka
function get_pKa(Ka)  {

    return - Math.log10(Ka)
}


// Function to calculate pKb from Kb
function get_pKb(Kb_ammonia)  {

    return - Math.log10(Kb)
}

// Barium Hydroxide, strong base
function get_Ba_OH_2_Hplus(Ba_OH_2_conc)  {

    return Kw / (2*Ba_OH_2_conc)
}

// Calcium Hydroxide, strong base
function get_CA_OH_2_Hplus(CA_OH_2_conc)  {

    return Kw / (2*CA_OH_2_conc)
}

// Sodium Hydroxide, strong base
function get_NaOH_Hplus(NaOH_conc)  {

    return Kw / NaOH_conc
}

// Ammonium Hydroxide, weak base
function get_NH4OH_Hplus(NH4OH_conc)  {

    return Kw/ Math.sqrt(Kb_ammonia*NH4OH_conc)
}

// Hydrochloric Acid, strong acid
function get_HCl_Hplus(HCl_conc)  {

    return HCl_conc
}

// Nitric Acid, strong acid
function get_HNO3_Hplus(HNO3_conc)  {

    return HNO3_conc
}

// Acetic Acid, weak acid
function get_HC2H3O2_Hplus(HC2H3O2_conc)  {

    return  Math.sqrt(Ka_acetic_acid*HC2H3O2_conc)
}

// Carbonic Acid, weak acid
function get_H2CO3_Hplus(H2CO3_conc)  {

    return  Math.sqrt(Ka_carbonic_acid*H2CO3_conc)
}

// Sodium Chloride, neutral salt
function get_NaCl_Hplus()  {

    return 7
}

// Ammonium Chloride, acidic salt of NH3
function get_NH4Cl_Hplus(NH4Cl_conc)  {

    return  Math.sqrt((Kw / Kb_ammonia) * NH4Cl_conc)
}

// Sodium Acetate, basic salt of HC2H3O2
function get_NaC2H3O2_Hplus(NaC2H3O2_conc)  {

    return Kw /  Math.sqrt((Kw / Ka_acetic_acid) * NaC2H3O2_conc)
}

// Sodium Bicarbonate, basic salt H2CO3
function get_NaHCO3_Hplus(NaHCO3_conc)  {

    return Kw /  Math.sqrt(Ka_carbonic_acid * NaHCO3_conc)
}

// Sodium Carbonate, basic salt of HCO3
function get_Na2CO3_Hplus(Na2CO3_conc)  {

    return Kw /  Math.sqrt((Kw / Ka_bicarbonate) * Na2CO3_conc)
}

// Sodium Bisulfate, acidic salt of H2SO4
function get_NaHSO4_Hplus(NaHSO4_conc)  {

    return  Math.sqrt(Ka_hydrogen_sulfate * NaHSO4_conc)
}

function get_volume_added(drops)  {

    return drop_volume * drops
}

function get_total_volume(drops)  {

    return 10 + get_volume_added(drops)
}

// 0.1 or 0.01 M
function get_HCl_H(M_HCl, drops)  {

    return ((M_HCl * get_volume_added(drops)) / get_total_volume(drops)) + 1e-7
}
function get_NaOH_H(M_NaOH, drops)  {

    return Kw / get_HCl_H(M_NaOH, drops)
}

// For Hc2H3O2 (Acetic Acid) / NaC2H3O2 (Sodium Acetate) Buffer System

function get_ace_buffer_system(NaC2H3O2_conc, HC2H3O2_conc)  {

    return pKa_acetic_acid +  Math.log10(get_NaC2H3O2_Hplus(NaC2H3O2_conc) / get_HC2H3O2_Hplus(HC2H3O2_conc))
}

// Adding drops of .1 or .01 M HCl
function get_HCl_HC2H3O2(HC2H3O2_conc, M_HCl, drops)  {

    return ((10* HC2H3O2_conc) + (drop_volume * drops * M_HCl)) / get_volume_added(drops)
}

// Adding drops of .1 or .01 M HCl
function get_HCl_NaC2H3O2(NaC2H3O2_conc, M_HCl, drops)  {

    return ((10* NaC2H3O2_conc) - (drop_volume * drops * M_HCl)) / get_volume_added(drops)
}

// NaC2H3O2 (Sodium Acetate) buffer capacity calculations
// Adding drops of .1 or .01 M HCl
function get_NaC2H3O2_buffer_overload()  {

    alert("Buffer Capacity Exceeded!")
}

function get_NaC2H3O2_init_M(NaC2H3O2_conc)  {

    return NaC2H3O2_conc * 10.000
}

function get_M_HCl(drops, M_HCl)  {

    return 0.36 * drops * M_HCl
}

function get_excess_Hplus(drops, M_HCl, NaC2H3O2_conc)  {

    return (get_M_HCl(drops, M_HCl)) - (get_NaC2H3O2_init_M(NaC2H3O2_conc))
}

// H+ method functionined in the NaC2H3O2 buffer capacity, using the excess H+
function get_Hplus_fe(drops, M_HCl, NaC2H3O2_conc)  {
    Hplus = (get_excess_Hplus(drops, M_HCl, NaC2H3O2_conc)) / (get_total_volume(drops))
    return Hplus

}
// HC2H3O2 buffer capacity calculations
// Adding drops of .1 or .01 NaOH

function get_NaOH_HC2H3O2(HC2H3O2_conc, M_NaOH, drops)  {

    return ((10.000 * HC2H3O2_conc) - (drop_volume * drops * M_NaOH)) / get_total_volume(drops)
}

function get_NaOH_NaC2H3O2(NaC2H3O2_conc, M_NaOH, drops)  {

    return ((10.000 * NaC2H3O2_conc) + (drop_volume * drops * M_NaOH)) / get_total_volume(drops)
}

function get_HC2H3O2_buffer_overload()  {

    alert("Buffer Capacity Exceeded!")
}

function get_HC2H3O2_init_M(HC2H3O2_conc)  {

    return HC2H3O2_conc*10.000
}

function get_M_NaOH(drops, M_NaOH)  {

    return drop_volume * drops * M_NaOH
}

function get_excess_OH(drops, M_NaOH, HC2H3O2_conc)  {

    return get_M_NaOH(drops, M_NaOH) - get_HC2H3O2_init_M(HC2H3O2_conc)
}

function get_OH(drops, M_NaOH, HC2H3O2_conc)  {

    return get_excess_OH(drops, M_NaOH, HC2H3O2_conc) / get_total_volume(drops)
}

// H+ method deined in the HC2H3O2 buffer capacity, using excess OH-
function get_Hplus_OH(drops, M_NaOH, HC2H3O2_conc)  {
    Hplus = Kw / get_OH(drops, M_NaOH, HC2H3O2_conc)
    return Hplus

}

// For General Acid / Base Buffer System

// ask Ron for function purpose
// pKa_acid, acid, and base are placeholders
function get_acid_base_buffer_system(pKa_acid, acid_conc, base_conc, M_HCl, drops)  {

    return pKa_acid +  Math.log10(get_HCl_base(base_conc, M_HCl, drops)/get_HCl_acid(acid_conc, M_HCl, drops))
}

// Adding drops of .1 or .01 M HCl
function get_HCl_acid(acid_conc, M_HCl, drops)  {

    return ((10* acid_conc) + (drop_volume * drops * M_HCl)) / get_volume_added(drops)
}

// Adding drops of .1 or .01 M HCl
function get_HCl_base(base_conc, M_HCl, drops)  {

    return ((10* base_conc) - (drop_volume * drops * M_HCl)) / get_volume_added(drops)
}

// Base buffer capacity calculations
// Adding drops of .1 or .01 M HCl
function get_Base_buffer_overload()  {

    alert("Buffer Capacity Exceeded!")
}

function get_base_init_M(base_conc)  {

    return base_conc * 10.000
}

function get_excess_base_H(drops, M_HCl)  {

    return (get_M_HCl(drops, M_HCl)) - (get_base_init_M(base_conc))
}

// H+ method functionined in the Base buffer capacity, using the excess H+
function get_base_Hplus(drops, M_HCl)  {
    Hplus=(get_excess_base_H(drops, M_HCl)) / (get_total_volume(drops))
    return Hplus

}

// Acid buffer capacity calculations
// Adding drops of .1 or .01 NaOH

function get_NaOH_acid(H_conc, M_NaOH, drops)  {

    return ((10.000 * H_conc) - (drop_volume * drops * M_NaOH)) / get_total_volume(drops)
}

function get_NaOH_base(Na_conc, M_NaOH, drops)  {

    return ((10.000 * Na_conc) + (drop_volume * drops * M_NaOH)) / get_total_volume(drops)
}

function get_acid_buffer_overload()  {

    alert("Buffer Capacity Exceeded!")
}

function get_acid_init_M(acid_conc)  {

    return acid_conc*10.000
}

function get_excess_OH(drops, acid_conc)  {

    return get_M_NaOH(drops, M_NaOH) - get_acid_init_M(acid_conc)
}