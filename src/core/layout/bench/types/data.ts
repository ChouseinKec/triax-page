import type { BenchKey } from './bench';

export type DataKey = string;

export type DataValue = unknown;

export interface DataDefinition {
	[dataKey: DataKey]: DataValue;
}

export type StoredData = Record<BenchKey | 'global', DataDefinition>;