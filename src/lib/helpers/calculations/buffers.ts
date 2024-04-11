import * as calcs from '@/helpers/calculations';
import * as consts from '@/helpers/constants';
import type { SelectedBuffer } from '../types';
import { currentDropType } from '../store';

export function calculateBufferSystem(
	buffer: SelectedBuffer,
	acidConc: number,
	baseConc: number,
	//currentDrop: DropType,
	drops: number
) {
	let M_HCl = 0;
	let M_NaOH = 0;
	let pKa_acid = 0;

	switch (buffer) {
		case 'HC2H3O2 & NaC2H3O2':
			pKa_acid = consts.pKa_acetic_acid;
			break;
		case 'NH4Cl & NH3':
			pKa_acid = consts.pKa_ammonium_chloride;
			break;
		case 'NaH2PO4 & Na2HPO4':
			pKa_acid = consts.pKa_sodium_dihydrogen_phosphate;
			break;
		case 'NaHCO3 & Na2CO3':
			pKa_acid = consts.pKa_sodium_bicarbonate;
			break;
		case 'H2CO3 & NaHCO3':
			pKa_acid = consts.pKa_carbonic_acid;
			break;
	}

	console.log(pKa_acid);

	currentDropType.subscribe(($drop) => {
		console.log($drop);
		if ($drop === '.1M-HCl' || $drop === '.01M-HCl') {
			if ($drop === '.1M-HCl') {
				console.log('M_HCl = 0.1');
				M_HCl = 0.1;
			} else {
				M_HCl = 0.01;
			}
	
			const acid = calcs.get_HCl_acid(acidConc, M_HCl, drops);
			const base = calcs.get_HCl_base(baseConc, M_HCl, drops);
			console.log({acidConc, M_HCl, drops})
			console.log({baseConc, M_HCl, drops})
			console.log(acid);
			console.log(base);
	
			// if (base <= 0) {
			// 	calcs.get_NaC2H3O2_buffer_overload();
			// 	return NaN;
			// }
			//console.log({pKa_acid, acid, base, M_HCl, drops});
			const final = calcs.get_buffer_system(pKa_acid, acid, base);
			console.log(final);
			return final;
		} else if ($drop === '.1M-NaOH' || $drop === '.01M-NaOH') {
			if ($drop === '.1M-NaOH') {
				M_NaOH = 0.1;
			} else {
				M_NaOH = 0.01;
			}
	
			const acid = calcs.get_NaOH_acid(acidConc, M_NaOH, drops);
			const base = calcs.get_NaOH_base(baseConc, M_NaOH, drops);
	
			// if (acid <= 0) {
			// 	calcs.get_HC2H3O2_buffer_overload();
			// 	return NaN;
			// }
	
			return calcs.get_buffer_system(pKa_acid, acid, base);
		}
	});

	//return NaN;
}
