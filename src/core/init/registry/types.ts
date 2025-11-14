
import type { ValidateResult } from '@/src/shared/types/result';

export type RegistryDefinition<T> = {
	category: string;
	items: () => T[]; // lazy getter for tree-shaking friendliness
	registerFn: (item: T) => ValidateResult<any>;
	getIdFn: (item: T) => string;
	validateFn?: (item: T) => boolean;
};
