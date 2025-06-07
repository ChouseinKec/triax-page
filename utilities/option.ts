import { OptionData } from '@/types/option';

/**
 * Creates an OptionData object for a given name and value.
 */
export function createOption(name: string, value: string, category: string): OptionData {
	return {
		name,
		value,
		category,
	};
}
