export type ValueTypes = 'keyword' | 'dimension' | 'function' | 'number';

export interface SlotVariation {
	type: string;
	params?: Record<string, any>;
}
