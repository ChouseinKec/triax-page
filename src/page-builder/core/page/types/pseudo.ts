export type PseudoName = string;

export type PseudoValue = string;

export type PseudoID = string;

export type PseudoRecord = Record<PseudoID, PseudoInstance>;

export interface PseudoDefinition {
	name: PseudoName;
	value: PseudoValue;
}

export interface PseudoInstance extends PseudoDefinition {
	id: PseudoID;
}
