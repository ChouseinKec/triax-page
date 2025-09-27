// Types
import type { ValidationResult } from '@/src/shared/types/result';

export interface InitStep {
	name: string;
	init: () => Promise<void> | void;
	required?: boolean;
	description?: string;
}
