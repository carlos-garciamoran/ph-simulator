import { toast } from '@zerodevx/svelte-toast';

import * as calcs from '@/helpers/calculations';
import * as consts from '@/helpers/constants';

import { currentDropType } from '../store';
import type { SelectedBuffer } from '../types';

function showToast() {
	toast.push('Buffer capacity exceeded!', {
		initial: 0, // prevent toast from disappearing
		theme: {
			'--toastColor': 'white',
			'--toastBackground': '#ef4444',
			'--toastBarBackground': '#b91c1c'
		}
	});
}

export function calculateBufferSystem(
	buffer: SelectedBuffer,
	acidConc: number,
	baseConc: number,
	drops: number
) {
	let M_HCl = 0;
	let M_NaOH = 0;
	let pKa_acid = 0;
	let final = 0;

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
	const initAcid = acidConc;
	const initBase = baseConc;

	currentDropType.subscribe(($drop) => {
		// if ($menu === 'acids/base') {}
		if ($drop === '.1M-HCl' || $drop === '.01M-HCl') {
			M_HCl = $drop === '.1M-HCl' ? 0.1 : 0.01;

			const acid = calcs.get_HCl_acid(initAcid, M_HCl, drops);
			const base = calcs.get_HCl_base(initBase, M_HCl, drops);

			//console.log({ acid, base }, $drop);
			if (base <= 0) {
				showToast();
				// return NaN;
			}

			final = calcs.get_buffer_system(pKa_acid, acid, base);
		} else if ($drop === '.1M-NaOH' || $drop === '.01M-NaOH') {
			M_NaOH = $drop === '.1M-NaOH' ? 0.1 : 0.01;

			const acid = calcs.get_NaOH_acid(initAcid, M_NaOH, drops);
			const base = calcs.get_NaOH_base(initBase, M_NaOH, drops);

			if (acid <= 0) {
				showToast();
				// return NaN;
			}

			final = calcs.get_buffer_system(pKa_acid, acid, base);
		}
	});

	console.log('>>> final', final);
	return final;
}
