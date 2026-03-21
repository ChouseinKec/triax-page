// Types
import type { ValueToken, StyleKey, Slot, SlotGroup, SlotOptionDefinition, ValueTokenTerminal, ValueTokenFunction, ValueTokenGroup, TerminalDefinition, Variation, SimplifiedVariation } from '@/core/block/style/types';

/**
 * Props for the `StyleValueSlot` component.
 *
 * Represents a single positional slot in the CSS value editor. The component
 * receives all valid slot options for this column and the token the user has
 * currently entered, then dispatches to the appropriate sub-renderer.
 */
export type StyleValueSlotProps = {
	/** The style property key this slot belongs to (e.g. `grid-template-rows`). */
	styleKey: StyleKey;
	/** All valid slot definitions at this schema column. Multiple entries mean the
	 *  user can switch between different token types (e.g. `<length>` vs `<keyword>`). */
	slots: Slot[];
	/** The parsed token currently occupying this position, if any. */
	valueToken: ValueToken;
	/** Pre-computed terminal definitions threaded from the top-level StyleValue. */
	terminalDefinitions: TerminalDefinition[];
	/** Called with the replacement token when the user changes this slot's value.
	 *  Pass `null` to clear the slot. */
	onChange: (token: ValueToken | null) => void;
	/** When true, function slots render inline instead of inside a float reveal. */
	inline?: boolean;
};

/**
 * Props for the `SlotFunction` sub-component.
 *
 * Handles rendering and editing of a single function token. When `inline` is
 * false (default), wraps the editor in a `DropdownReveal` float. When `inline`
 * is true, renders the content directly — used inside `SlotGroup` which already
 * provides its own reveal.
 */
export type SlotFunctionProps = {
	/** The available options for this slot. */
	options: SlotOptionDefinition[];
	/** Full set of terminal definitions, forwarded to argument parsers. */
	terminalDefinitions: TerminalDefinition[];
	/** The current function token being rendered. */
	valueToken: ValueTokenFunction;
	/** Called with the new token on change, or `null` to remove. */
	onChange: (token: ValueToken | null) => void;
	/** When true, renders inline without a float reveal. */
	inline?: boolean;
};

/**
 * Props for the `SlotTerminal` sub-component.
 *
 * Handles rendering and editing of a single terminal or function token using
 * the terminal definition's `getComponent` factory.
 */
export type SlotTerminalProps = {
	/** The available options for this slot, derived from schema + terminal definitions. */
	options: SlotOptionDefinition[];
	/** Full set of terminal definitions, forwarded to function argument parsers. */
	terminalDefinitions: TerminalDefinition[];
	/** The current terminal or function token being rendered. */
	valueToken: ValueTokenTerminal | ValueTokenFunction;
	/** Called with the new token on change, or `null` to remove the token. */
	onChange: (token: ValueToken | null) => void;
};

/**
 * Props for the `SlotGroup` sub-component.
 *
 * Handles rendering and editing of a repeating group token. The group is
 * rendered as a `DropdownReveal` containing one `StyleValue` per repetition
 * segment, with an ADD button to append additional repetitions.
 */
export type SlotGroupProps = {
	/** The style property key, forwarded to nested `StyleValue` instances. */
	styleKey: StyleKey;
	/** Full set of terminal definitions, used for parsing updated segment values. */
	terminalDefinitions: TerminalDefinition[];
	/** The available options for this slot, derived from schema + terminal definitions. */
	options: SlotOptionDefinition[];
	/** All valid slot definitions at this schema column — the group slot is resolved internally. */
	slots: Slot[];
	/** Pre-computed variations for the group's inner constraint, passed to avoid re-derivation. */
	derivedVariations?: Variation[];
	/** Pre-computed simplified variations for the group's inner constraint. */
	simplifiedVariations?: SimplifiedVariation[];
	/** The current group token containing all repetition tokens (including separators). */
	valueToken: ValueTokenGroup;
	/** Called with the updated group token when any segment changes, or `null` to remove. */
	onChange: (token: ValueTokenGroup | null) => void;
};
