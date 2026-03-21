/**
 * Represents how values should be joined in a CSS grammar (e.g., comma, slash).
 * Used as separators between multiple values in constraints.
 */
export type Combinator = ',' | '/';

export type Parameter = string;

/**
 * Describes how many times a value or group can occur in a constraint.
 * Used to represent CSS grammar multipliers like ?, +, *, #, {m,n}.
 */
export interface Multiplier {
	/**
	 * Minimum number of occurrences required.
	 * For example, 0 for '*', 1 for '+', etc.
	 */
	min: number;

	/**
	 * Maximum number of occurrences allowed.
	 * Use Infinity for unlimited (e.g., '*', '+').
	 */
	max: number;

	/**
	 * Optional separator to use between repeated values (e.g., comma or slash).
	 * Only present for multipliers that specify a separator (like '#').
	 */
	combinator?: Combinator;
}

/**
 * Represents a single terminal token constraint (e.g., <length>, <color>).
 * Defines what token is valid and how many times it can appear.
 */
export interface ConstraintTerminal {
	/**
	 * Discriminator for the constraint type.
	 * Always 'terminal' for this interface.
	 */
	type: 'terminal';

	/**
	 * Optional multiplier describing how many times this terminal can appear.
	 */
	multiplier?: Multiplier;

	/** Parameter string extracted from inside the angle brackets of the terminal token (e.g., '0,100' from '<length[0,100]>'). */
	parameter?: string;

	/**
	 * The original terminal token as written in the CSS grammar (e.g., '<length>').
	 */
	terminal: string;
}

/**
 * Represents a function notation constraint (e.g., linear-gradient(...)).
 * Contains a function name and an inner constraint for its arguments.
 */
export interface ConstraintFunction {
	/** Discriminator for the constraint type. Always 'function' for this interface.	 */
	type: 'function';

	/** The function name as it appears in the CSS grammar (e.g., 'linear-gradient'). */
	function: string;

	/** The parameter string for the function (e.g., '<length>>' from 'linear-gradient(<length>)'). */
	parameter: string;

	/** The list of constraints representing the function's arguments. */
	constraint: Constraint;
}

/**
 * Represents a group of constraints, optionally with a multiplier and required flag.
 * Used for grouped syntax in CSS grammar (e.g., [ ... ] or ( ... )).
 */
export interface ConstraintGroup {
	/**
	 * Discriminator for the constraint type.
	 * Always 'group' for this interface.
	 */
	type: 'group';

	/**
	 * Optional multiplier describing how many times the group can appear.
	 */
	multiplier?: Multiplier;

	/**
	 * The single inner constraint contained in the group brackets.
	 */
	constraint: Constraint;
}

/**
 * Represents a literal symbol that must appear exactly as written (e.g., '[', ']', '/').
 * These are often enclosed in quotes in the CSS grammar.
 */
export interface ConstraintLiteral {
	/**
	 * Discriminator for the constraint type.
	 * Always 'literal' for this interface.
	 */
	type: 'literal';

	/**
	 * The literal character or symbol required in the syntax (e.g., '[', ']', '/').
	 */
	literal: string;
}

/**
 * Represents a sequence of constraints that must appear in order (space-separated in CSS grammar).
 * All rules must appear in the specified order.
 */
export interface ConstraintSequence {
	/**
	 * Discriminator for the constraint type.
	 * Always 'sequence' for this interface.
	 */
	type: 'sequence';

	/**
	 * The ordered list of constraints in the sequence.
	 */
	constraints: Constraint[];
}

/**
 * Represents constraints separated by a literal character (e.g., comma, slash).
 * Used for token definitions like `[...],<color-stop-list>` or `<number>/<number>`.
 * All rules must appear in order, separated by the specified combinator.
 */
export interface ConstraintCombinator {
	/**
	 * Discriminator for the constraint type.
	 * Always 'combinator' for this interface.
	 */
	type: 'combinator';

	/**
	 * The combinator character used as a separator (e.g., ',' or '/').
	 */
	combinator: Combinator;

	/**
	 * The list of constraints to be separated by the combinator.
	 */
	constraints: Constraint[];
}

/**
 * Represents a group of constraints that are mutually exclusive (| in CSS grammar).
 * Exactly one rule must match.
 */
export interface ConstraintAlternative {
	/**
	 * Discriminator for the constraint type.
	 * Always 'alternative' for this interface.
	 */
	type: 'alternative';

	/**
	 * The list of alternative constraints (only one must match).
	 */
	constraints: Constraint[];
}

/**
 * Represents independent constraints (|| in CSS grammar).
 * Rules can be combined in any order.
 */
export interface ConstraintIndependent {
	/**
	 * Discriminator for the constraint type.
	 * Always 'independent' for this interface.
	 */
	type: 'independent';

	/**
	 * The list of independent constraints (can be combined in any order).
	 */
	constraints: Constraint[];
}

/**
 * Represents constraints that must all be satisfied (&& in CSS grammar).
 * All rules must match in the final value.
 */
export interface ConstraintConjunction {
	/**
	 * Discriminator for the constraint type.
	 * Always 'conjunction' for this interface.
	 */
	type: 'conjunction';

	/**
	 * The list of constraints that must all be satisfied.
	 */
	constraints: Constraint[];
}

/**
 * Represents a reference to a named token constraint.
 * Used during compilation to avoid string expansion and enable proper reference resolution.
 * References are materialized into full constraint trees during the resolution phase.
 */
export interface ConstraintRef {
	/**
	 * Discriminator for the constraint type.
	 * Always 'ref' for this interface.
	 */
	type: 'ref';

	/**
	 * Optional multiplier describing how many times the referenced constraint can appear.
	 */
	multiplier?: Multiplier;

	/**
	 * The name of the referenced token or constraint.
	 */
	name: string;

	/**
	 * Optional range/constraint parameter extracted from inside the angle brackets (e.g., '0,100' from '<length[0,100]>').
	 */
	parameter?: string;
}

/**
 * Union type representing any possible constraint node in the CSS grammar AST.
 */
export type Constraint = ConstraintTerminal | ConstraintLiteral | ConstraintAlternative | ConstraintIndependent | ConstraintConjunction | ConstraintGroup | ConstraintSequence | ConstraintCombinator | ConstraintFunction | ConstraintRef;
