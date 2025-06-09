export type ValueTypes = 'keyword' | 'dimension' | 'function' | 'number';

export interface SlotVariation {
	group: string;
	params?: Record<string, any>;
}
