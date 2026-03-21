import type { Constraint, StyleKey, TerminalDefinition, Variation, SimplifiedVariation } from '@/core/block/style/types';

/** Props for style value components.*/
export interface StyleValue {
	/** Current value of the style */
	value: string;
	/** The CSS property key, forwarded to terminal option factories for icon/keyword lookups */
	styleKey: StyleKey;
	/** The fully-resolved constraint for this value's syntax */
	constraint: Constraint;
	/** Callback when the value changes */
	onChange: (value: string) => void;
	/** Pre-computed terminal definitions — if omitted, fetched from the manager */
	terminalDefinitions?: TerminalDefinition[];
	/** Pre-computed variations — if omitted, derived from constraint */
	derivedVariations?: Variation[];
	/** Pre-computed simplified variations — if omitted, derived from derivedVariations */
	simplifiedVariations?: SimplifiedVariation[];
	/** When true, sub-editors (e.g. function args) render inline instead of inside a float reveal. */
	inline?: boolean;
}