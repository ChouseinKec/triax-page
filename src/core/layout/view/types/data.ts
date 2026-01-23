import type { ViewKey } from './viewport';

export type DataKey = string;

export type DataValue = boolean | number | string | object | Array<any> | null;

export interface DataDefinition {
	[dataKey: DataKey]: DataValue;
}

export type DataDefinitionRecord = Record<ViewKey, DataDefinition>;
