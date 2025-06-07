// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { countSubArrayLength } from '@/utilities/array/array';
import { createOption } from '@/utilities/option';

// Types
import { ValueTypes } from '@/types/style/value';
import { OptionData } from '@/types/option';


/**
 * Checks if a value is a CSS keyword (e.g., 'auto', 'none', 'inherit').
 */
function isValueKeyword(value: string): boolean {
	return /^[a-zA-Z-]+$/.test(value);
}

/**
 * Checks if a value is a CSS dimension (e.g., <length>, <percentage>).
 */
function isValueDimension(value: string): boolean {
	return /^<[^>]+>$/.test(value);
}

/**
 * Checks if a value is a CSS function (e.g., functionName(args)).
 */
function isValueFunction(value: string): boolean {
	return /^[a-zA-Z-]+\([^)]+\)$/.test(value);
}

/**
 * Matches a value string to its category based on CSS syntax.
 */
function matchValueType(value: string): ValueTypes | undefined {
	if (isValueDimension(value)) {
		return 'dimension';
	} else if (isValueKeyword(value)) {
		return 'keyword';
	} else if (isValueFunction(value)) {
		return 'function';
	}
	return undefined;
}

/**
 * Builds a slot-wise lookup table of unique OptionData arrays for all variations.
 * Each slot (column) contains all unique options that appear in that position across all variations.
 */
function createSlotOptions(variations: string[], separators: string[] = [' ', ',', '/']): OptionData[][] {
	const maxSlots = countSubArrayLength(variations, separators);
	const slotSets: Array<Set<string>> = Array.from({ length: maxSlots }, () => new Set<string>());
	const slotOptions: OptionData[][] = Array.from({ length: maxSlots }, () => []);
	for (const variation of variations) {
		const slots = splitTopLevel(variation, separators);
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i].trim();
			if (!slot) continue;
			if (!slotSets[i].has(slot)) {
				slotSets[i].add(slot);
				const category = matchValueType(slot) || 'unknown';
				slotOptions[i].push(createOption(slot, slot, category));
			}
		}
	}
	return slotOptions;
}

export { createSlotOptions, isValueKeyword, isValueDimension, isValueFunction, matchValueType };
