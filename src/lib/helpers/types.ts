export type Drop = {
	id: number;
	cy: number;
};

export type DropType = '.1M-HCl' | '.1M-NaOH' | '.01M-HCl' | '.01M-NaOH';

export type DropStruct = {
	type: '' | 'HCl' | 'NaOH';
	concentration: number;
};

export type Menu = '' | 'acids/bases' | 'salts' | 'buffers' | 'household-items' | 'water';

export type SelectedBuffer =
	| 'HC2H3O2 & NaC2H3O2'
	| 'NH4Cl & NH3'
	| 'NaH2PO4 & Na2HPO4'
	| 'NaHCO3 & Na2CO3'
	| 'H2CO3 & NaHCO3';
