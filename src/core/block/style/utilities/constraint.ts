// Types
import type { Parameter, Multiplier, Combinator, ConstraintLiteral, ConstraintGroup, ConstraintFunction, Constraint, ConstraintAlternative, ConstraintIndependent, ConstraintConjunction, ConstraintSequence, ConstraintCombinator, ConstraintRef, ConstraintTerminal } from '../types/constraint';

// Utilities
import { splitAdvanced, extractBetween, extractBefore, findMatchingPair } from '@/shared/utilities/string';
import { normalizeSyntax } from '@/core/block/style/utilities/';

type NonTerminalConstraints = Record<string, Constraint>;
type NonTerminals = Array<{ key: string; value: string }>;

const nonTerminalCache = new WeakMap<NonTerminals, NonTerminalConstraints>();
const syntaxCache = new Map<string, Constraint>();

/**
 * Extracts multiplier from syntax and returns the base syntax plus multiplier bounds.
 *
 * Supports: ? (0-1), + (1+), * (0+), # (1+, comma), {m,n} or {n}
 * Also supports stacked multipliers: +#, #? (per W3C CSS spec)
 *
 * @Parameter syntax - The syntax string that may end with a multiplier
 * @returns Object with baseSyntax, min, max, separator (or null if no multiplier)
 */
function extractMultiplier(syntax: string): ({ syntax: string } & Multiplier) | undefined {
	let min = undefined;
	let max = undefined;
	let combinator: Combinator | undefined = undefined;

	// Check for stacked multipliers first: +#, #?
	if (syntax.endsWith('+#')) {
		syntax = syntax.slice(0, -2).trim();
		min = 1;
		max = Infinity;
		combinator = ',';
	}
	// Check for #? (0+ comma-separated - optional group with 1+ = 0+)
	else if (syntax.endsWith('#?')) {
		syntax = syntax.slice(0, -2).trim();
		min = 0;
		max = Infinity;
		combinator = ',';
	}

	// Check for # (1+, comma-separated)
	else if (syntax.endsWith('#')) {
		syntax = syntax.slice(0, -1).trim();
		min = 1;
		max = Infinity;
		combinator = ',';
	}
	// Check for ? (0-1)
	else if (syntax.endsWith('?')) {
		syntax = syntax.slice(0, -1).trim();
		min = 0;
		max = 1;
	}
	// Check for + (1+)
	else if (syntax.endsWith('+')) {
		syntax = syntax.slice(0, -1).trim();
		min = 1;
		max = Infinity;
	}
	// Check for * (0+)
	else if (syntax.endsWith('*')) {
		syntax = syntax.slice(0, -1).trim();
		min = 0;
		max = Infinity;
	}

	// Check for {m,n} or {n}, optionally stacked with # (e.g. #{3}, #{1,4})
	else {
		const rangeMatch = syntax.match(/^(.+)\{(\d+)(?:,(\d+))?\}$/);
		if (rangeMatch) {
			const [, baseMatch, minStr, maxStr] = rangeMatch;
			syntax = baseMatch.trim();
			min = parseInt(minStr, 10);
			max = maxStr ? parseInt(maxStr, 10) : min;
			// Handle stacked #{n} / #{m,n}: strip trailing # and set comma separator
			if (syntax.endsWith('#')) {
				syntax = syntax.slice(0, -1).trim();
				combinator = ',';
			}
		}
	}

	if (min === undefined || max === undefined) return undefined;

	const result: { syntax: string; min: number; max: number; combinator?: Combinator } = {
		syntax,
		min,
		max,
	};

	if (combinator !== undefined) result.combinator = combinator;

	return result;
}

function extractParameter(syntax: string): { terminal: string; parameter: Parameter } | undefined {
	if ((!syntax.startsWith('<') && !syntax.endsWith('>')) || (!syntax.includes('[') && !syntax.includes(']'))) return undefined;

	const multiplier = extractMultiplier(syntax);
	const base = multiplier ? multiplier.syntax : syntax;

	// Extract inner content from <...>
	const inner = extractBetween(base, '<>') ?? base;

	// Find [xxxx] inside the inner content
	const match = findMatchingPair(inner, '[', ']');

	if (!match) return undefined;

	return {
		terminal: `<${inner.slice(0, match.openIndex)}>`,
		parameter: match.inner,
	};
}

/**
 * Checks if a syntax string is a token reference (e.g., <image>, <color>+).
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax is a token reference (with optional multiplier)
 */
function isSyntaxRef(syntax: string): boolean {
	const multiplier = extractMultiplier(syntax);

	return /^<[a-z0-9\-()]+(?:\[[^\]]*\])?>$/i.test(multiplier ? multiplier.syntax : syntax);
}

/**
 * Groups are sub-constraints wrapped in [ ] that must be treated as a unit. They may have
 * multipliers applied after the closing bracket (e.g., [a b]+, [a | b]?, etc.).
 * Multipliers may be: ? + * # {m,n}
 *
 * Correctly handles nested brackets by finding the matching closing bracket.
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax represents a group: starts with [ and contains matching ] (possibly followed by multiplier)
 * @see {@link parseSyntaxGroup} - Compiler for group constraints
 */
function isSyntaxGroup(syntax: string): boolean {
	if (!syntax.startsWith('[')) return false;

	const pair = findMatchingPair(syntax, '[', ']');
	if (!pair) return false;

	const afterBracket = pair.after;

	// If empty or only multiplier suffixes, it's a group
	if (afterBracket.trim() === '') return true;
	if (/^([?+*#!]|#\?|\+#|#\{\d+(?:,\d+)?\}|\{\d+(?:,\d+)?\})$/.test(afterBracket.trim())) return true;

	return false;
}

/**
 * Checks if a syntax string is a literal symbol (e.g., '[', ']', ',').
 *
 * Literals are strictly single-character tokens enclosed in quotes that are NOT math operators
 * (+, -, *, /). Math operators are treated as terminal terminals to allow for standard
 * keyword/dimension matching without being forced into the literal structural path.
 *
 * Pattern: Starts and ends with same quote, contains exactly one non-math character.
 * Examples: "'['", "']'", "','", "'/'" (if used as separator).
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax is a quoted literal symbol (single character)
 */
function isSyntaxLiteral(syntax: string): boolean {
	// Matches any single character provided in quotes as a literal
	return /^(['"]).\1$/.test(syntax);
}

/**
 * Checks if a syntax string contains an alternative operator (single |).
 *
 * The single pipe (|) represents mutually exclusive alternatives where exactly one must match.
 * Care is taken to distinguish | from || (independent operator).
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax contains single pipe (|) as a top-level operator, false if it's (||)
 * @see {@link isSyntaxIndependent} - For the double pipe (||) operator
 * @see {@link parseSyntaxAlternative} - Compiler for alternative constraints
 */
function isSyntaxAlternative(syntax: string): boolean {
	if (splitAdvanced(syntax, '||', undefined, true).values.length > 1) return false; // Contains ||, not a single | operator
	return splitAdvanced(syntax, '|', undefined, true).values.length > 1;
}

/**
 * Checks if a syntax string contains an independent operator (double pipe ||).
 *
 * The double pipe (||) represents independent components that all must appear but can be
 * in any order and used at most once each.
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax contains double pipe (||) as a top-level operator
 * @see {@link isSyntaxAlternative} - For the single pipe (|) operator
 * @see {@link parseSyntaxIndependent} - Compiler for independent constraints
 */
function isSyntaxIndependent(syntax: string): boolean {
	return splitAdvanced(syntax, '||', undefined, true).values.length > 1;
}

/**
 * Checks if a syntax string contains a conjunction operator (double ampersand &&).
 *
 * The double ampersand (&&) represents components that must all appear but have no order requirement.
 * Similar to independent (||) but with stricter interpretation in CSS specs.
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax contains double ampersand (&&) as a top-level operator
 * @see {@link parseSyntaxConjunction} - Compiler for conjunction constraints
 */
function isSyntaxConjunction(syntax: string): boolean {
	return splitAdvanced(syntax, '&&', undefined, true).values.length > 1;
}

/**
 * Checks if a syntax string represents combinator-separated components (comma or slash).
 *
 * Combinator separators are characters like `,` or `/` that separate distinct constraints.
 * Checks in priority order: `,` then `/` based on CSS spec precedence.
 * Examples: `[...],<color-stop-list>` (comma), `<number>/<number>` (slash).
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax contains combinator-separated tokens at the top level
 */
function isSyntaxCombinator(syntax: string): boolean {
	// Check for comma first (higher priority per CSS spec)
	const { values: commaParts } = splitAdvanced(syntax, ',', undefined, true);
	if (commaParts.length > 1 && commaParts.every((p) => p.length > 0)) return true;

	// Check for slash — require non-empty parts on both sides to avoid matching a leading '/' sequence token
	const { values: slashParts } = splitAdvanced(syntax, '/', undefined, true);
	if (slashParts.length > 1 && slashParts.every((p) => p.length > 0)) return true;
	return false;
}

/**
 * Checks if a syntax string represents a sequence (space-separated components).
 *
 * Sequences have components separated by spaces with no operators. They require all components
 * to appear in the specified order per CSS spec.
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax contains multiple space-separated tokens with no other top-level combinators
 * @see {@link parseSyntaxSequence} - Compiler for sequence constraints
 */
function isSyntaxSequence(syntax: string): boolean {
	return splitAdvanced(syntax, ' ', undefined, true).values.length > 1;
}

/**
 * Checks if a syntax string represents a function notation.
 *
 * Function notations have the pattern: functionName(...)
 * Must contain at least one character between parentheses.
 * Examples: linear-gradient(...), radial-gradient(...), url(...)
 * Non-matches: <linear-gradient()> (non-terminal token)
 *
 * @Parameter syntax - The syntax string to check
 * @returns True if syntax represents a function notation
 */
function isSyntaxFunction(syntax: string): boolean {
	if (!syntax.endsWith(')')) return false;

	return /^[\w-]+\(.+\)$/.test(syntax);
}

/**
 * Compiles a group constraint (enclosed in brackets).
 *
 * Groups represent sub-constraints wrapped in [ ] that are treated as a unit. The content
 * within the brackets is recursively compiled. Groups may also have multipliers applied after
 * the closing bracket, which are extracted and flattened onto the group directly.
 *
 * Correctly handles nested brackets by finding the matching closing bracket.
 *
 * @Parameter syntax - The syntax string containing a group (e.g., "[<length> <color>]", "[auto | 50%]+")
 * @returns A ConstraintGroup with the recursively compiled constraints and optional multiplier properties
 * @see {@link parseSyntax} - For recursive compilation of group content
 */
function parseSyntaxGroup(syntax: string): ConstraintGroup {
	// Extract multiplier if present (e.g., "[a b]+" -> baseSyntax="[a b]", multiplier extracted)
	const multiplier = extractMultiplier(syntax);

	// Extract content between brackets
	const content = extractBetween(multiplier ? multiplier.syntax : syntax, '[]')!;
	const constraint = parseSyntax(content);

	return {
		type: 'group',
		constraint,
		...(multiplier && { multiplier: { min: multiplier.min, max: multiplier.max, ...(multiplier.combinator ? { combinator: multiplier.combinator } : {}) } }),
	};
}

/**
 * Compiles an alternative constraint (| operator).
 *
 * Splits the syntax on the single pipe (|) operator and recursively compiles each part.
 * Alternatives are mutually exclusive—exactly one must match during validation. CSS spec
 * defines proper precedence: || has higher precedence than |.
 *
 * @Parameter syntax - The syntax string containing alternatives (e.g., "red | blue | green", "auto | <length>")
 * @returns A ConstraintAlternative with recursively compiled constraints for each alternative
 * @see {@link parseSyntaxIndependent} - For || operator (different semantics)
 * @see {@link splitAdvanced} - The splitting utility that respects operator precedence
 */
function parseSyntaxAlternative(syntax: string): ConstraintAlternative {
	const { values: parts } = splitAdvanced(syntax, '|');
	const constraints = parts.map((part) => parseSyntax(part));

	return {
		type: 'alternative',
		constraints,
	};
}

/**
 * Compiles an independent constraint (|| operator).
 *
 * Splits the syntax on the double pipe (||) operator and recursively compiles each part.
 * Independent components must all appear but can be in any order and used at most once each.
 * The || operator has higher precedence than | in CSS specs.
 *
 * @Parameter syntax - The syntax string containing independent components (e.g., "<color> || <length> || inherit")
 * @returns A ConstraintIndependent with recursively compiled constraints that can be combined in any order
 * @see {@link parseSyntaxAlternative} - For | operator (exactly one must match)
 * @see {@link parseSyntaxConjunction} - For && operator (similar semantics)
 */
function parseSyntaxIndependent(syntax: string): ConstraintIndependent {
	const { values: parts } = splitAdvanced(syntax, '||');
	const constraints = parts.map((part) => parseSyntax(part));

	return {
		type: 'independent',
		constraints,
	};
}

/**
 * Compiles a conjunction constraint (&& operator).
 *
 * Splits the syntax on the double ampersand (&&) operator and recursively compiles each part.
 * Conjunctions require all components to appear but have no specific order requirement. This is
 * similar to independent (||) and is used in CSS specs for related components.
 *
 * @Parameter syntax - The syntax string containing conjunctions (e.g., "<length> && <color>")
 * @returns A ConstraintConjunction with recursively compiled constraints that must all appear
 * @see {@link parseSyntaxIndependent} - For || operator (similar ordering semantics)
 */
function parseSyntaxConjunction(syntax: string): ConstraintConjunction {
	const { values: parts } = splitAdvanced(syntax, '&&');
	const constraints = parts.map((part) => parseSyntax(part));

	return {
		type: 'conjunction',
		constraints,
	};
}

/**
 * Compiles a combinator-separated constraint.
 *
 * Splits the syntax on a combinator character (`,` or `/`) and recursively compiles each part.
 * This represents combinator separators in token definitions like `[...],<color-stop-list>` or `<number>/<number>`.
 * Detects the combinator separator from the syntax itself.
 *
 * @Parameter syntax - The syntax string containing combinator-separated tokens
 * @returns A ConstraintCombinator with the separator and recursively compiled constraints
 * @see {@link parseSyntax} - For recursive compilation of each part
 */
function parseSyntaxCombinator(syntax: string): ConstraintCombinator {
	// Detect which combinator separator is present (check in priority order)
	const value = splitAdvanced(syntax, ',', undefined, true).values.length <= 1 ? '/' : ',';

	const { values: parts } = splitAdvanced(syntax, value);
	const constraints = parts.map((part) => parseSyntax(part)) as Constraint[];

	return {
		type: 'combinator',
		constraints,
		combinator: value,
	};
}

/**
 * Compiles a literal constraint from a quoted string.
 *
 * Literals are characters that must appear exactly as-is.
 *
 * @Parameter syntax - The quoted literal syntax (e.g., "'['", "'/'")
 * @returns A ConstraintLiteral object
 */
function parseSyntaxLiteral(syntax: string): ConstraintLiteral {
	// Remove the surrounding quotes
	const value = syntax.replace(/^['"]|['"]$/g, '');

	return {
		type: 'literal',
		literal: value,
	};
}

/**
 * Compiles a sequence constraint (space-separated components).
 *
 * Splits the syntax on spaces and recursively compiles each part. Sequences represent
 * components that must all appear in a specific order per CSS spec. Commas are handled
 * by multipliers (like #) on individual constraints or within groups with their own separators.
 *
 * @Parameter syntax - The syntax string containing space-separated tokens (e.g., "<length> <color> auto")
 * @returns A ConstraintSequence with recursively compiled constraints
 * @see {@link parseSyntax} - For recursive compilation of each part
 */
function parseSyntaxSequence(syntax: string): ConstraintSequence {
	// Sequences are always space-separated per CSS spec
	// Commas are handled by multipliers (like #) on individual constraints
	const { values: parts } = splitAdvanced(syntax, ' ');
	const constraints = parts.map((part) => parseSyntax(part));

	return {
		type: 'sequence',
		constraints,
	};
}

/**
 * Compiles a function constraint (e.g., linear-gradient(...)).
 *
 * Function notations have the form: functionName(innerSyntax)
 * where the inner syntax is compiled as a separate constraint.
 *
 * @Parameter syntax - The function syntax string (e.g., "linear-gradient([<linear-gradient-syntax>])" or "url(<link>)")
 * @Parameter composedSyntaxes - The tokens lookup table
 * @returns A ConstraintFunction with the function name and compiled inner constraint
 */
function parseSyntaxFunction(syntax: string): ConstraintFunction {
	const funcName = extractBefore(syntax, '(');
	const innerSyntax = extractBetween(syntax, '()')!;
	const constraint = parseSyntax(innerSyntax);

	return {
		type: 'function',
		function: `${funcName}()`,
		constraint,
		parameter: innerSyntax,
	};
}

/**
 * Compiles a terminal constraint syntax.
 *
 * A terminal constraint is a syntax syntax (keyword or type) with no operators or multipliers.
 * Examples: "auto", "<color>", "<length>", "inherit", "transparent".
 * If a multiplier is present, the min/max/separator/syntax properties are set directly.
 *
 * @Parameter syntax - The terminal syntax string to compile
 * @returns A ConstraintTerminal object with type and optional multiplier properties
 * @see {@link parseSyntax} - The main compilation entry point
 */
function parseSyntaxTerminal(syntax: string): ConstraintTerminal {
	const multiplier = extractMultiplier(syntax);
	const base = multiplier?.syntax ?? syntax;
	const extracted = extractParameter(base);

	const terminal = extracted?.terminal ?? base;
	const parameter = extracted?.parameter || undefined;

	return {
		type: 'terminal',
		terminal,
		...(parameter ? { parameter } : {}),
		...(multiplier
			? {
					multiplier: {
						min: multiplier.min,
						max: multiplier.max,
						...(multiplier.combinator ? { combinator: multiplier.combinator } : {}),
					},
				}
			: {}),
	};
}

/**
 * Compiles a token reference into a constraint ref node.
 *
 * Extracts the token name and any multiplier, creates a ref constraint.
 * The ref will be resolved later against the composedSyntaxes cache.
 *
 * @Parameter syntax - The syntax string containing a token reference (e.g., "<image>+")
 * @returns A ConstraintRef object with the token name and optional multiplier properties
 */
function parseSyntaxRef(syntax: string): ConstraintRef {
	const multiplier = extractMultiplier(syntax);
	const base = multiplier ? multiplier.syntax : syntax;

	// Extract [param] range from inside <token[param]> and strip it to get canonical ref name
	const { terminal: name, parameter: rawParam } = extractParameter(base) ?? { terminal: base, parameter: undefined };
	const param = rawParam || undefined;

	if (!multiplier) return { type: 'ref', name, ...(param !== undefined ? { parameter: param } : {}) };

	return {
		type: 'ref',
		name,
		...(param !== undefined ? { parameter: param } : {}),
		multiplier: {
			min: multiplier.min,
			max: multiplier.max,
			...(multiplier.combinator ? { combinator: multiplier.combinator } : {}),
		},
	};
}

/**
 * Compiles a CSS Value Definition Syntax string into a constraint rule.
 *
 * This is the main entry point for the constraint compiler. It analyzes the syntax string to
 * determine its structure and dispatches to the appropriate compilation function. The order of
 * checks respects CSS operator precedence (lowest to highest). Token references are compiled
 * into ref nodes without expansion.
 *
 * Operator precedence (lowest to highest):
 * 1. Token References (<token>+, etc.)
 * 2. Alternatives (|)
 * 3. Independent (||)
 * 4. Conjunctions (&&)
 * 5. Sequences (space-separated)
 * 6. Groups ([...])
 * 7. Multipliers (?, +, *, #, {m,n})
 *
 * @Parameter syntax - The CSS Value Definition Syntax string to compile
 * @returns A Constraint object representing the compiled syntax (can be any constraint type)
 * @see {@link parseSyntaxRef} - For token references
 * @see {@link parseSyntaxTerminal} - For terminal tokens
 * @see {@link parseSyntaxAlternative} - For | operator
 * @see {@link parseSyntaxIndependent} - For || operator
 * @see {@link parseSyntaxConjunction} - For && operator
 * @see {@link parseSyntaxSequence} - For space-separated sequences
 * @see {@link parseSyntaxGroup} - For grouped sub-constraints
 */
function parseSyntax(syntax: string): Constraint {
	// Normalize syntax to canonical form for consistent parsing
	syntax = normalizeSyntax(syntax);

	// Check for token references first (highest priority to avoid splitting on operators within refs)
	if (isSyntaxRef(syntax)) return parseSyntaxRef(syntax);

	// Check for logic-heavy structures first (sequences, alternatives, etc.)
	if (isSyntaxAlternative(syntax)) return parseSyntaxAlternative(syntax);

	if (isSyntaxIndependent(syntax)) return parseSyntaxIndependent(syntax);

	if (isSyntaxConjunction(syntax)) return parseSyntaxConjunction(syntax);

	if (isSyntaxGroup(syntax)) return parseSyntaxGroup(syntax);

	if (isSyntaxFunction(syntax)) return parseSyntaxFunction(syntax);

	if (isSyntaxCombinator(syntax)) return parseSyntaxCombinator(syntax);

	if (isSyntaxSequence(syntax)) return parseSyntaxSequence(syntax);

	// Now check for literals (single quoted values)
	if (isSyntaxLiteral(syntax)) return parseSyntaxLiteral(syntax);

	// Fallback: treat as terminal token (may have multiplier, handled in parseSyntaxTerminal)
	return parseSyntaxTerminal(syntax);
}

/**
 * Resolves all constraint references in a compiled constraint tree.
 *
 * Recursively walks the constraint tree, finding all `ref` type constraints and
 * replacing them with their fully resolved constraint definitions from the compiled cache.
 * Applies any multipliers from the ref node to the resolved constraint.
 *
 * @Parameter constraint - The constraint to resolve (may contain refs)
 * @Parameter nonTerminalConstraints - Cache of compiled constraints by token name
 * @Parameter visited - Set of token names already being resolved (prevents circular references)
 * @returns The resolved constraint with all refs materialized
 */
function expandConstraint(constraint: Constraint, nonTerminalConstraints: NonTerminalConstraints, visited: Set<string> = new Set()): Constraint {
	// Handle ref type: look up the referenced constraint and apply multipliers
	if (constraint.type === 'ref') {
		const ref = constraint as ConstraintRef;

		// Check for circular references. If detected, return as-is to prevent infinite recursion
		if (visited.has(ref.name)) {
			console.warn(`Circular reference detected: ${ref.name}`);
			return constraint;
		}

		// If the referenced token is not found in the nonTerminalConstraints, it's a primitive type
		// Convert to terminal constraint instead of keeping as ref
		const refConstraint = nonTerminalConstraints[ref.name];
		if (!refConstraint) {
			return {
				type: 'terminal',
				terminal: ref.name,
				...(ref.multiplier ? { multiplier: ref.multiplier } : {}),
				...(ref.parameter ? { parameter: ref.parameter } : {}),
			};
		}

		// Mark as visited
		const newVisited = new Set(visited);
		newVisited.add(ref.name);

		// Recursively resolve the referenced constraint
		const resConstraint = expandConstraint(refConstraint, nonTerminalConstraints, newVisited);

		// Check if we can safely spread multipliers onto the resolved constraint
		const refHasMultiplier = !!ref.multiplier;

		// If the ref has no multiplier, return the resolved constraint as-is
		if (!refHasMultiplier) return resConstraint;

		// Check if the resolved constraint already has a multiplier
		const resolvedHasMultiplier = 'multiplier' in resConstraint && !!resConstraint.multiplier;
		const resolvedSupportsMultiplier = ['terminal', 'group'].includes(resConstraint.type);

		// If the resolved constraint already has a multiplier, OR it's a type that doesn't
		// support multipliers natively (like 'alternative', 'sequence', etc.), we MUST wrap in a group.
		if (resolvedHasMultiplier || !resolvedSupportsMultiplier) {
			return {
				type: 'group',
				constraint: resConstraint,
				multiplier: ref.multiplier,
			};
		}

		// Otherwise, spread the multiplier onto the resolved terminal or group
		return {
			...resConstraint,
			multiplier: ref.multiplier,
		} as Constraint;
	}

	// For function and group types: recursively resolve the inner constraint
	if (constraint.type === 'function' || constraint.type === 'group') {
		return {
			...constraint,
			constraint: expandConstraint(constraint.constraint, nonTerminalConstraints, visited),
		};
	}

	// For other constraint types, recursively resolve their child constraints
	if ('constraints' in constraint && Array.isArray(constraint.constraints)) {
		return {
			...constraint,
			constraints: constraint.constraints.map((rule) => expandConstraint(rule, nonTerminalConstraints, visited)),
		};
	}

	// For constraints without constraints, return as-is
	return constraint;
}

/**
 * Parses all composed token definitions into constraint cache.
 *
 * Converts token syntax strings to compiled constraint trees for later resolution.
 * Should be called once at initialization and the result cached/registered.
 *
 * @Parameter NonTerminals - All available token definitions (syntax strings)
 * @returns Cache of compiled constraints by token name
 */
function parseNonTerminals(nonTerminals: NonTerminals): NonTerminalConstraints {
	const nonTerminalConstraints: NonTerminalConstraints = {};
	for (const { key, value } of nonTerminals) nonTerminalConstraints[key] = parseSyntax(value);

	return nonTerminalConstraints;
}

/**
 * Compiles a syntax string and resolves all token references.
 *
 * Accepts raw non-terminal definitions and caches the compiled grammar on the array reference.
 * Individual syntax results are also cached by syntax string.
 *
 * @Parameter syntax - The CSS Value Definition Syntax string to compile and resolve
 * @Parameter nonTerminals - Raw non-terminal definitions (array reference used as cache key)
 * @returns The fully resolved constraint with all refs materialized
 */
export function deriveConstraint(syntax: string, nonTerminals: NonTerminals): Constraint {
	let nonTerminalConstraints = nonTerminalCache.get(nonTerminals);
	if (!nonTerminalConstraints) {
		nonTerminalConstraints = parseNonTerminals(nonTerminals);
		nonTerminalCache.set(nonTerminals, nonTerminalConstraints);
		syntaxCache.clear();
	}

	if (syntaxCache.has(syntax)) return syntaxCache.get(syntax)!;

	const result = expandConstraint(parseSyntax(syntax), nonTerminalConstraints);
	syntaxCache.set(syntax, result);
	return result;
}
