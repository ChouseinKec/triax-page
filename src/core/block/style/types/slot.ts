// Types
import type { Constraint, Multiplier, Parameter } from '@/core/block/style/types';
import type { ValueTokenTerminal, ValueTokenFunction, ValueTokenGroup } from './value';
import type { OptionDefinition } from '@/shared/components/types';

export interface SlotGroup {
	type: 'group';

	constraint: Constraint;

	multiplier?: Multiplier;
}

export interface SlotTerminal {
	type: 'terminal';

	terminal: string;

	multiplier?: Multiplier;

	parameter?: Parameter;
}

export interface SlotFunction {
	type: 'function';

	function: string;

	constraint: Constraint;

	parameter: Parameter;
}

export interface SlotCombinator {
	type: 'combinator';

	combinator: string;
}

export interface SlotLiteral {
	type: 'literal';

	literal: string;
}

export type Slot = SlotLiteral | SlotGroup | SlotTerminal | SlotCombinator | SlotFunction;

/**
 * An OptionDefinition enriched with slot-specific metadata.
 * Every option produced by `createSlotOptions` carries:
 * - `terminal` — the resolved terminal key (e.g. `'<keyword>'`, `'<length>'`)
 * - `slotType`  — distinguishes function options from terminal options
 */
export type SlotOptionDefinition = OptionDefinition & {
	terminal: string;
	type: 'terminal' | 'function' | 'group';
	token: ValueTokenTerminal | ValueTokenFunction | ValueTokenGroup;
};
