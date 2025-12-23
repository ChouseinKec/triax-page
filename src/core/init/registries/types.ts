import type { ValidateResult } from '@/src/shared/types/result';

export type RegistryDefinition<T> = {
	category: string;
	items: T[];
	registerFn: (item: T) => ValidateResult<any>;
	getIdFn: (item: T) => string;
	validateFn: (item: T) => ValidateResult<T>;
};
