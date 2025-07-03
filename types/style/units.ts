import { CSSDimensionString, CSSDimensionGroups } from './dimension';
import { CSSUnitDefs } from '@/constants/style/units';

/**
 * All valid CSS unit names supported by the style system.
 * These correspond to official CSS units (e.g. 'px', 'em', 'vh', 'deg').
 * Used for type-safe unit lookup and validation.
 */
export type CSSUnits = keyof typeof CSSUnitDefs;

/**
 * Supported status for a CSS unit (e.g. 'widely', 'not widely', 'experimental').
 * Used for documentation and UI filtering.
 */
export type CSSUnitSupported = 'widely' | 'not widely' | 'experimental';

/**
 * Category of a CSS unit (e.g. 'relative', 'absolute', 'angle', etc.).
 * Used for grouping and filtering units in the UI.
 */
export type CSSUnitCategory = 'relative' | 'absolute' | 'angle' | 'grid' | 'percentage' | 'time';

/**
 * Represents a single CSS unit definition, including its name, value, support status, and category.
 * Used for unit lookup, validation, and UI rendering.
 */
export interface CSSUnit {
	/**
	 * The type discriminator for CSS unit objects.
	 * Always the string 'unit'.
	 */
	type: 'unit';

	/**
	 * The canonical name of the CSS unit (e.g. 'px', 'em', 'vh').
	 */
	name: CSSUnits;

	/**
	 * The value of the CSS unit (usually same as name).
	 * Used for value comparisons and serialization.
	 */
	value: CSSDimensionString;

	/**
	 * Indicates how widely the unit is supported in browsers.
	 * Used for documentation and UI filtering.
	 */
	supported: CSSUnitSupported;

	/**
	 * The category of the CSS unit (e.g. 'relative', 'absolute', 'angle').
	 * Used for grouping and filtering units in the UI.
	 */
	category: CSSUnitCategory;

	/**
	 * The group of the CSS unit (e.g. 'length', 'angle', 'percentage', 'flex').
	 * Used for functional grouping in the UI.
	 */
	dimensionGroup: CSSDimensionGroups;
}
