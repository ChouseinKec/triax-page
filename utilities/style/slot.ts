// Slot-related utilities for style editor
import { CSSUnitOptions } from '@/constants/style/units';
import { ValueSeparators } from '@/constants/style/value';
import { splitTopLevel } from '@/utilities/string/string';
import { countSubArrayLength } from '@/utilities/array/array';
import { getTokenType, getTokenParam } from '@/utilities/style/token';
import { CSSDimensionGroups } from '@/types/style/dimension';
import { SlotVariation } from '@/types/style/value';
import { OptionData } from '@/types/option';
import { getTokenBase } from '@/utilities/style/token';

/**
 * Expands an array of SlotVariation objects into OptionData[] for use in Slot and value components.
 * Handles number, keyword, dimension, and function types.
 *
 * @param slotOptions - Array of SlotVariation objects for a slot
 * @returns OptionData[] - Array of options for dropdowns/inputs
 */
function generateSlotOptions(slotOptions: SlotVariation[]): OptionData[] {
	const options: OptionData[] = [];
	for (const slot of slotOptions) {
		switch (slot.type) {
			case 'number': {
				const min = slot.params?.min ?? 0;
				options.push({ name: 'number', value: min, category: 'number' });
				break;
			}
			case 'keyword': {
				const value = slot.params?.value;
				if (value) {
					options.push({ name: value, value, category: 'keyword' });
					break;
				}
			}
			case 'dimension': {
				const type = slot.params?.type as CSSDimensionGroups;
				if (type && type in CSSUnitOptions) {
					options.push(...CSSUnitOptions[type]);
				}
				break;
			}
			case 'function': {
				const args = slot.params?.args;
				if (args) {
					options.push({ name: 'function', value: args, category: 'function' });
				}
				break;
			}
			default:
				break;
		}
	}
	return options;
}

/**
 * Builds a slot-wise lookup table of unique SlotVariation options for each slot (column) across all value variations.
 *
 * @param variations - Array of value definition strings (e.g., ['<length> <percentage>', 'auto', 'fit-content(<length> <percentage>)'])
 * @param separators - Array of separator characters to split slots (default: ValueSeparators)
 * @returns SlotVariation[][] - An array where each index represents a slot (column), containing unique SlotVariation objects for that slot.
 *
 * @example
 * generateSlotVariations(['<length> <percentage>', 'auto', 'fit-content(<length> <percentage>)']) → [ [SlotVariation, ...], [SlotVariation, ...] ]
 */
function generateSlotVariations(variations: string[], separators = [...ValueSeparators]): SlotVariation[][] {
	// Determine the maximum number of slots (columns) across all variations
	const maxSlots = countSubArrayLength(variations, separators);
	// For each slot, track unique slot strings to avoid duplicates
	const slotSets: Array<Set<string>> = Array.from({ length: maxSlots }, () => new Set<string>());
	// For each slot, collect SlotVariation objects
	const slotVariations: SlotVariation[][] = Array.from({ length: maxSlots }, () => []);

	// Iterate over each variation string
	for (const variation of variations) {
		// Split the variation into slot strings (e.g., ['<length>', 'auto'])
		const slots = splitTopLevel(variation, separators);

		// For each slot, determine its index and add to the corresponding slotSets and slotVariations
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i].trim();

			// Skip empty slots or duplicates for this column
			if (!slot || slotSets[i].has(slot)) continue;
			slotSets[i].add(slot);

			// Determine the canonical type of the slot (e.g., 'dimension', 'keyword', ...)
			const dataType = getTokenType(slot);
			if (!dataType) continue;

			// Extract any type parameters (e.g., range, value, etc.)
			let dataParam = getTokenParam(slot) || {};

			switch (dataType) {
				case 'dimension':
					dataParam = { type: getTokenBase(slot), ...dataParam };
					break;
				case 'keyword':
					// For dimensions and numbers, always include the type
					dataParam = { value: slot, ...dataParam };
					break;
			}

			// Add the SlotVariation for this slot/column
			slotVariations[i].push({
				type: dataType,
				params: Object.keys(dataParam).length > 0 ? dataParam : undefined,
			});
		}
	}
	return slotVariations;
}

export { generateSlotOptions, generateSlotVariations };
