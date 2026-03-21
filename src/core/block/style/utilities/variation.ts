// Types
import type { SimplifiedVariation, Multiplier, SlotTerminal, SlotLiteral, SlotCombinator, SlotFunction, SlotGroup, Variation, Constraint, ConstraintCombinator, ConstraintTerminal, ConstraintFunction, ConstraintLiteral, ValueToken } from '@/core/block/style/types/';

// Utilities
import { generateCartesian, generatePermutations, generateSubsets, mergeAdvanced } from '@/shared/utilities/array';

const variationsCache = new WeakMap<Constraint, Variation[]>();
const simplifiedVariationsCache = new WeakMap<Variation[], SimplifiedVariation[]>();

/**
 * Creates a terminal terminal slot from a constraint.
 *
 * A terminal terminal is a leaf node in the syntax tree (e.g., `<color>`, `auto`).
 * This maps the constraint's syntax directly to a structural slot.
 *
 * @param constraint - The terminal constraint node from the syntax tree
 * @returns A flat slot representing the terminal value
 */
function createTerminal(constraint: ConstraintTerminal): SlotTerminal {
	const { terminal, parameter } = constraint;

	// Omit multiplier when absent or when min=0,max=1 (? operator) since deriveVariations
	// already expands that into two separate variations (with and without the terminal).
	const multiplier = constraint.multiplier?.min === 0 && constraint.multiplier?.max === 1 ? undefined : constraint.multiplier;

	return {
		type: 'terminal',
		terminal,
		...(parameter ? { parameter } : {}),
		...(multiplier ? { multiplier } : {}),
	};
}

/**
 * Creates a terminal terminal slot from a literal value.
 *
 * Literals are structural symbols (e.g., `[`, `]`) that must appear exactly as written.
 *
 * @param constraint - The literal constraint node
 * @returns A flat slot representing the literal symbol
 */
function createLiteral(constraint: ConstraintLiteral): SlotLiteral {
	return { type: 'literal', literal: constraint.literal };
}

/**
 * Creates a function slot from a constraint.
 *
 * Functions like `url()` or `linear-gradient()` are captured with their name.
 * The inner arguments are handled separately by the matching engine.
 *
 * @param constraint - The function constraint node
 * @returns A slot representing the function call
 */
function createFunction(constraint: ConstraintFunction): SlotFunction {
	const func = constraint.function;
	const innerConstraint = constraint.constraint;
	const parameter = constraint.parameter;

	return { type: 'function', function: func, constraint: innerConstraint, parameter };
}

/**
 * Creates a group slot containing the inner constraint and repetition rules.
 *
 * Groups are used for repetition (multipliers) or optional segments where
 * the structure inside the group repeats as a single unit. The constraint
 * is stored as-is so that variations can be derived lazily at match/schema time.
 *
 * @param constraint - The inner constraint to repeat (content inside the group brackets)
 * @param multiplier - Repetition rules (e.g. {1,4} or #)
 * @returns A group slot wrapping the inner constraint
 */
function createGroup(constraint: Constraint, multiplier: Multiplier): SlotGroup {
	return { type: 'group', constraint, multiplier };
}

/**
 * Creates a combinator slot from a constraint.
 *
 * Combinators are formal symbols (e.g., `,`, `/`) that relate grammar components.
 *
 * @param constraint - The combinator constraint node
 * @returns A slot representing the combinator
 */
function createCombinator(constraint: ConstraintCombinator): SlotCombinator {
	return { type: 'combinator', combinator: constraint.combinator };
}

/**
 * Cartesian product of Variation groups — picks one Variation from each group and
 * concatenates their slots. Delegates to the shared generateCartesian and flattens
 * each picked combination into a single Variation (Slot[]).
 *
 * @param groups - An array where each element is a set of valid variations for a branch
 * @returns A flat list of all combined variations
 *
 * @example [[A, B], [C, D]] → [A+C, A+D, B+C, B+D]
 */
function cartesian(groups: Variation[][]): Variation[] {
	return generateCartesian(groups).map((combo) => combo.flat());
}

/**
 * Resolves all valid structural variations of a CSS constraint.
 *
 * This is the core engine that transforms a syntax tree into flat slot arrays.
 * It recursively handles alternatives (|), sequences (space), combinators (,),
 * conjunctions (&&), independent sets (||), and groups ([]).
 *
 * @param constraint - The root or branch constraint to derive
 * @returns An array of Variations (flat lists of Slots)
 */
function derive(constraint: Constraint): Variation[] {
	switch (constraint.type) {
		case 'terminal': {
			const { multiplier } = constraint;
			const min = multiplier?.min ?? 1;
			const max = multiplier?.max ?? 1;

			// Unbounded repetition (e.g. +, *, #) — keep as a runtime slot with the multiplier
			// so the matcher can loop over it without exploding the variation count.
			// Comma-separated finite repetition (e.g. #{6}) also keeps the multiplier so
			// consumeRepeatedly can handle the interleaved combinator tokens at match time.
			if (max === Infinity || multiplier?.combinator) {
				const slot = createTerminal(constraint);
				return min === 0 ? [[], [slot]] : [[slot]];
			}

			// Finite, non-separated multiplier — expand into one variation per count, each
			// containing `count` copies of the plain (no-multiplier) slot.
			// e.g. <length>{2,2} → [[<length>, <length>]]
			// e.g. <length>{1,3} → [[<length>], [<length>, <length>], [<length>, <length>, <length>]]
			const slot: SlotTerminal = {
				type: 'terminal',
				terminal: constraint.terminal,
				...(constraint.parameter ? { parameter: constraint.parameter } : {}),
			};
			const expanded: Variation[] = [];
			for (let count = min === 0 ? 1 : min; count <= max; count++) {
				expanded.push(Array.from({ length: count }, () => slot));
			}
			if (min === 0) return [[], ...expanded];
			return expanded;
		}

		case 'literal':
			// Literals are fixed symbols wrapped in a single variation
			return [[createLiteral(constraint)]];

		case 'function':
			// Functions are treated as a single structural unit
			return [[createFunction(constraint)]];

		case 'alternative':
			// | picks exactly one branch, so just flatten all sub-resolutions
			return constraint.constraints.flatMap(derive);

		case 'sequence':
			// Space requires all in order — produce Cartesian product of all branches
			return cartesian(constraint.constraints.map(derive));

		case 'combinator': {
			// Combinators (like comma) insert symbols between Cartesian products
			// but ONLY if both sides have content. If either side is empty, omit the combinator.
			const branchVariations = constraint.constraints.map(derive);
			const combinatorSlot = createCombinator(constraint);

			return branchVariations.reduce((acc, currentBranch) => {
				if (acc.length === 0) return currentBranch;

				return acc.flatMap((accVariation) =>
					currentBranch.map((branchVariation) => {
						// Both sides empty → return empty
						if (accVariation.length === 0 && branchVariation.length === 0) return [];

						// Left empty → return right only (no combinator)
						if (accVariation.length === 0) return branchVariation;

						// Right empty → return left only (no combinator)
						if (branchVariation.length === 0) return accVariation;

						// Both non-empty → insert combinator between them
						return [...accVariation, combinatorSlot, ...branchVariation];
					}),
				);
			}, []);
		}

		case 'conjunction':
			// && requires all in any order — permute and product everything
			return generatePermutations(constraint.constraints).flatMap((perm) => cartesian(perm.map(derive)));

		case 'independent':
			// || requires 1 or more in any order — all non-empty subsets in every permutation.
			return generateSubsets(constraint.constraints).flatMap((subset) => generatePermutations(subset).flatMap((perm) => cartesian(perm.map(derive))));

		case 'group': {
			const { min = 1, max = 1, combinator } = constraint.multiplier ?? {};

			// Unbounded repetition (e.g. +, *, #) — keep as a runtime group slot so the
			// matcher can loop over it without exploding the variation count.
			// Extract the single inner constraint (parser always produces one child).
			if (max === Infinity) return [[createGroup(constraint.constraint, constraint.multiplier!)]];

			// Finite multiplier (e.g. {1,4}, ?) — fully expand into one variation per count.
			// e.g. {1,3} produces: [A], [A A], [A A A]
			// Deduplicate inner variations first to keep the cartesian product smaller.
			const inner = deriveVariations(constraint.constraint);
			const separator: SlotCombinator | null = combinator ? { type: 'combinator', combinator } : null;
			const expanded: Variation[] = [];

			for (let count = min === 0 ? 1 : min; count <= max; count++) {
				// Build [inner, [[sep]], inner, [[sep]], inner, ...] then cartesian
				const copies = Array.from({ length: count }, () => inner);
				const seps = separator ? Array.from({ length: count - 1 }, () => [[separator]]) : [];
				expanded.push(...cartesian(mergeAdvanced(copies, seps)));
			}

			// min=0 means the group is entirely optional — include the empty variation.
			if (min === 0) return [[], ...expanded];

			return expanded;
		}

		default:
			return [];
	}
}

/**
 * Resolves all valid structural variations of a CSS constraint.
 *
 * This is the core engine that transforms a syntax tree into flat slot arrays.
 * It recursively handles alternatives (|), sequences (space), combinators (,),
 * conjunctions (&&), independent sets (||), and groups ([]).
 *
 * @param constraint - The root or branch constraint to derive
 * @returns An array of Variations (flat lists of Slots)
 */
export function deriveVariations(constraint: Constraint): Variation[] {
	const cached = variationsCache.get(constraint);
	if (cached) return cached;

	const variations = derive(constraint);
	const seen = new Set<string>();

	const result = variations.filter((v) => {
		const key = JSON.stringify(v);
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});

	variationsCache.set(constraint, result);
	return result;
}

/**
 * Strips combinator and literal slots from every variation, producing semantic-only variations.
 *
 * The returned `SimplifiedVariation[]` contains only terminal, function, and group slots,
 * so slot indices align 1-to-1 with user-entered value tokens. Compute this once and
 * memoize the result rather than filtering on every schema derivation.
 *
 * @param variations - Raw structural variations that may contain combinator/literal slots
 * @returns Variations containing only terminal, function, and group slots
 */
export function simplifyVariations(variations: Variation[]): SimplifiedVariation[] {
	const cached = simplifiedVariationsCache.get(variations);
	if (cached) return cached;

	const result = variations.map((variation) => variation.filter((slot): slot is SlotTerminal | SlotFunction | SlotGroup => slot.type !== 'combinator' && slot.type !== 'literal'));
	simplifiedVariationsCache.set(variations, result);
	return result;
}
