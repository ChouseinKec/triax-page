import { Schema, ValueToken, StyleKey, ValueTokenGroup, ValueTokenTerminal, ValueTokenFunction, SlotOptionDefinition, TerminalDefinition } from '@/core/block/style/types';

/** Props for the empty (first) slot selector */
export type SlotEmptyProps = {
	options: SlotOptionDefinition[];
	onChange: (token: ValueTokenTerminal | ValueTokenFunction | ValueTokenGroup) => void;
};

/** Props for the next slot selector */
export type SlotNextProps = {
	options: SlotOptionDefinition[];
	onChange: (token: ValueTokenTerminal | ValueTokenFunction | ValueTokenGroup) => void;
};

/** Props for multiple slot style value editor components */
export type StyleValueSlotsProps = {
	/** Current slot valueTokens */
	valueTokens: ValueToken[];

	derivedSchema: Schema;

	styleKey: StyleKey;

	/** Pre-computed terminal definitions threaded from the top-level StyleValue */
	terminalDefinitions: TerminalDefinition[];

	/** Callback when the valueTokens change */
	onChange: (valueTokens: ValueToken[]) => void;
	/** When true, sub-editors render inline instead of inside a float reveal. */
	inline?: boolean;
};
