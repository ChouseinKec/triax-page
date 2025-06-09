import { OptionData } from '@/types/option';

/**
 * Creates an option data object for use in dropdowns or selectors.
 * @param name - The display name of the option.
 * @param value - The value associated with the option.
 * @param category - The category this option belongs to (e.g., 'dimensions', 'keywords').
 * @returns An OptionData object containing the name, value, and category.
 * @example
 * createOption('Auto', 'auto', 'keywords') → { name: 'Auto', value: 'auto', category: 'keywords' }
 */
export function createOption(name: string, value: string, category: string): OptionData {
	return {
		name,
		value,
		category,
	};
}
