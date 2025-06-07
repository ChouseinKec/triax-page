import { CSSDimensions } from "@/types/style/data";

type RelativeFontUnits = 'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh'; // Only em is widely supported
type RelativeRootFontUnits = 'rcap' | 'rch' | 'rem' | 'rex' | 'ric' | 'rlh'; // Only rem is widely supported
type RelativeViewportUnits = 'vh' | 'vw' | 'vmax' | 'vmin' | 'vb' | 'vi'; // vh, vw, vmin, vmax are widely supported
type RelativeSmallViewportUnits = 'svh' | 'svw' | 'svmax' | 'svmin' | 'svb' | 'svi'; // svh, svw, svmin, svmax are not widely supported yet
type RelativeLargeViewportUnits = 'lvh' | 'lvw' | 'lvmax' | 'lvmin' | 'lvb' | 'lvi'; // lvh, lvw, lvmin, lvmax are not widely supported yet
type RelativeDynamicViewportUnits = 'dvh' | 'dvw' | 'dvmax' | 'dvmin' | 'dvb' | 'dvi'; // dvh, dvw, dvmin, dvmax are not widely supported yet
type RelativeGridUnits = 'fr'; // fr is widely supported in CSS Grid
type RelativeContainerUnits = 'cqw' | 'cqh' | 'cqi' | 'cqb' | 'cqmin' | 'cqmax'; // Container query units, not widely supported yet
type AbsoluteUnits = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pt' | 'pc'; // Only px is widely supported
type AngleUnits = 'deg' | 'grad' | 'rad' | 'turn'; // deg is widely supported, others are not
type PercentageUnits = '%'; // Widely supported
type TimeUnits = 's' | 'ms'; // s is widely supported, ms is not

/**
 * All valid CSS unit names supported by the style system.
 * These correspond to official CSS units (e.g. 'px', 'em', 'vh', 'deg').
 * Used for type-safe unit lookup and validation.
 */
export type CSSUnits = RelativeFontUnits | RelativeRootFontUnits | RelativeViewportUnits | RelativeSmallViewportUnits | RelativeLargeViewportUnits | RelativeDynamicViewportUnits | RelativeGridUnits | RelativeContainerUnits | AbsoluteUnits | AngleUnits | PercentageUnits | TimeUnits;

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
	value: CSSUnits;

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
	group: CSSDimensions;
}
