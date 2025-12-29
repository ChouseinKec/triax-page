// Types
import type { StyleDefinition, StyleKey, StyleDefinitionRecord, UnitKey, UnitDefinition, UnitDefinitionRecord, TokenDefinition, TokenDefinitionRecord, TokenKey, TokenTypeKey, TokenTypeDefinition, TokenTypeDefinitionRecord, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators } from '@/src/core/block/style/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { getSyntaxParsed, getSyntaxNormalized, getSyntaxSet, getSyntaxSeparators } from '@/src/core/block/style/utilities/syntax';

type StyleDefinitionInput = Omit<StyleDefinition, 'syntaxParsed' | 'syntaxNormalized' | 'syntaxSet' | 'syntaxSeparators'>;

/**
 * Class-based style registry for managing CSS property definitions
 */
class StyleRegistry {
	private styles: Record<StyleKey, StyleDefinition> = {};
	private units: Readonly<UnitDefinitionRecord> = {};
	private tokens: Readonly<TokenDefinitionRecord> = {};
	private tokenTypes: Readonly<TokenTypeDefinitionRecord> = {};

	// Caches for lazy-computed style syntax properties
	private syntaxParsedCache: Map<StyleKey, StyleSyntaxParsed> = new Map();
	private syntaxNormalizedCache: Map<StyleKey, StyleSyntaxParsed> = new Map();
	private syntaxSetCache: Map<StyleKey, StyleSyntaxSet> = new Map();
	private syntaxSeparatorsCache: Map<StyleKey, StyleSyntaxSeparators> = new Map();

	// ? --------------------------------------------------------- STYLE METHODS --------------------------------------------------------- //

	/**
	 * Registers a style definition in the style registry.
	 * @param style - The style definition to register
	 */
	registerStyle(styleDefinition: StyleDefinitionInput): ValidateResult<StyleDefinition> {
		// Check for duplicates
		if (this.styles[styleDefinition.key]) return { valid: false, message: `Style with key "${styleDefinition.key}" already registered` };

		// Return the full style definition with injected methods
		const fullStyleDefinition: StyleDefinition = {
			...styleDefinition,
			getSyntaxParsed: () => this.getSyntaxParsed(styleDefinition.key)!,
			getSyntaxNormalized: () => this.getSyntaxNormalized(styleDefinition.key)!,
			getSyntaxSet: () => this.getSyntaxSet(styleDefinition.key)!,
			getSyntaxSeparators: () => this.getSyntaxSeparators(styleDefinition.key)!,
		};

		// Register the full style
		this.styles = { ...this.styles, [styleDefinition.key]: fullStyleDefinition };

		return { valid: true, value: fullStyleDefinition };
	}

	/**
	 * Retrieves all registered style definitions.
	 */
	getRegisteredStyles(): Readonly<StyleDefinitionRecord> {
		return { ...this.styles };
	}

	/**
	 * Retrieves a specific style definition by its property key.
	 * @param key - The style key (CSS property) to retrieve
	 */
	getRegisteredStyle(styleKey: StyleKey): StyleDefinition | undefined {
		return this.styles[styleKey];
	}

	/**
	 * Retrieves the parsed syntax for a style, computing it lazily if not cached.
	 * @param styleKey - The style key
	 */
	getSyntaxParsed(styleKey: StyleKey): StyleSyntaxParsed | undefined {
		if (this.syntaxParsedCache.has(styleKey)) return this.syntaxParsedCache.get(styleKey);

		const style = this.styles[styleKey];
		if (!style) return undefined;

		const parsed = getSyntaxParsed(style.syntax, this.tokens, this.tokenTypes);
		this.syntaxParsedCache.set(styleKey, parsed);

		return parsed;
	}

	/**
	 * Retrieves the normalized syntax for a style, computing it lazily if not cached.
	 * @param styleKey - The style key
	 */
	getSyntaxNormalized(styleKey: StyleKey): StyleSyntaxParsed | undefined {
		if (this.syntaxNormalizedCache.has(styleKey)) return this.syntaxNormalizedCache.get(styleKey);

		const parsed = this.getSyntaxParsed(styleKey);
		if (!parsed) return undefined;

		const normalized = getSyntaxNormalized(parsed, this.tokenTypes);
		this.syntaxNormalizedCache.set(styleKey, normalized);

		return normalized;
	}

	/**
	 * Retrieves the syntax set for a style, computing it lazily if not cached.
	 * @param styleKey - The style key
	 */
	getSyntaxSet(styleKey: StyleKey): StyleSyntaxSet | undefined {
		if (this.syntaxSetCache.has(styleKey)) return this.syntaxSetCache.get(styleKey);

		const parsed = this.getSyntaxParsed(styleKey);
		if (!parsed) return undefined;

		const syntaxSet = getSyntaxSet(parsed);
		this.syntaxSetCache.set(styleKey, syntaxSet);

		return syntaxSet;
	}

	/**
	 * Retrieves the syntax separators for a style, computing it lazily if not cached.
	 * @param styleKey - The style key
	 */
	getSyntaxSeparators(styleKey: StyleKey): StyleSyntaxSeparators | undefined {
		if (this.syntaxSeparatorsCache.has(styleKey)) return this.syntaxSeparatorsCache.get(styleKey);

		const parsed = this.getSyntaxParsed(styleKey);
		if (!parsed) return undefined;

		const separators = getSyntaxSeparators(parsed);
		this.syntaxSeparatorsCache.set(styleKey, separators);

		return separators;
	}

	// ? --------------------------------------------------------- TOKEN METHODS --------------------------------------------------------- //
	/**
	 * Registers a token definition in the style registry.
	 * @param tokenDefinition - The token definition to register
	 */
	registerToken(tokenDefinition: TokenDefinition): ValidateResult<TokenDefinition> {
		// Check for duplicates
		if (this.tokenTypes[tokenDefinition.key]) return { valid: false, message: `Token with key "${tokenDefinition.key}" already registered` };

		// Register the token
		this.tokens = { ...this.tokens, [tokenDefinition.key]: tokenDefinition };
		return { valid: true, value: tokenDefinition };
	}

	/**
	 * Retrieves all registered token definitions.
	 */
	getRegisteredTokens(): Readonly<TokenDefinitionRecord> {
		return { ...this.tokens };
	}

	/**
	 * Retrieves a specific token definition by its key.
	 * @param tokenKey - The token key to retrieve
	 */
	getRegisteredToken(tokenKey: TokenKey): TokenDefinition | undefined {
		return this.tokens[tokenKey];
	}

	/**
	 * Registers a token type definition in the style registry.
	 * @param tokenTypeDefinition - The token type definition to register
	 */
	registerTokenType(tokenTypeDefinition: TokenTypeDefinition): ValidateResult<TokenTypeDefinition> {
		// Check for duplicates
		if (this.tokenTypes[tokenTypeDefinition.key]) return { valid: false, message: `Token type "${tokenTypeDefinition.key}" already registered` };

		// Registration logic would go here (not implemented in this snippet)
		this.tokenTypes = { ...this.tokenTypes, [tokenTypeDefinition.key]: tokenTypeDefinition };
		return { valid: true, value: tokenTypeDefinition };
	}

	/**
	 * Retrieves all registered token type definitions.
	 */
	getRegisteredTokenTypes(): Readonly<TokenTypeDefinitionRecord> {
		return { ...this.tokenTypes };
	}

	/**
	 * Retrieves a specific token type definition by its type.
	 * @param tokenType - The token type to retrieve
	 */
	getRegisteredTokenType(tokenType: TokenTypeKey): TokenTypeDefinition | undefined {
		return this.tokenTypes[tokenType];
	}

	// ? --------------------------------------------------------- UNIT METHODS --------------------------------------------------------- //

	/**
	 * Registers a unit definition in the style registry.
	 * @param unitDefinition - The unit definition to register
	 */
	registerUnit(unitDefinition: UnitDefinition): ValidateResult<UnitDefinition> {
		// Check for duplicates
		if (this.units[unitDefinition.key]) return { valid: false, message: `Unit with key "${unitDefinition.key}" already registered` };

		// Registration logic would go here (not implemented in this snippet)
		this.units = { ...this.units, [unitDefinition.key]: unitDefinition };
		return { valid: true, value: unitDefinition };
	}

	/**
	 * Retrieves all registered unit definitions.
	 */
	getRegisteredUnits(): Readonly<UnitDefinitionRecord> {
		return { ...this.units };
	}

	/**
	 * Retrieves a specific unit definition by its key.
	 * @param key - The unit key to retrieve
	 */
	getRegisteredUnit(unitKey: UnitKey): UnitDefinition | undefined {
		return this.units[unitKey];
	}
}

// Create singleton instance
const styleRegistry = new StyleRegistry();

// Export the registry instance methods
export const registerStyle = (styleDefinition: StyleDefinitionInput) => styleRegistry.registerStyle(styleDefinition);
export const getRegisteredStyles = () => styleRegistry.getRegisteredStyles();
export const getRegisteredStyle = (styleKey: StyleKey) => styleRegistry.getRegisteredStyle(styleKey);

export const registerUnit = (unitDefinition: UnitDefinition) => styleRegistry.registerUnit(unitDefinition);
export const getRegisteredUnits = () => styleRegistry.getRegisteredUnits();
export const getRegisteredUnit = (unitKey: UnitKey) => styleRegistry.getRegisteredUnit(unitKey);

export const registerToken = (tokenDefinition: TokenDefinition) => styleRegistry.registerToken(tokenDefinition);
export const getRegisteredTokens = () => styleRegistry.getRegisteredTokens();
export const getRegisteredToken = (tokenKey: TokenKey) => styleRegistry.getRegisteredToken(tokenKey);

export const registerTokenType = (tokenTypeDefinition: TokenTypeDefinition) => styleRegistry.registerTokenType(tokenTypeDefinition);
export const getRegisteredTokenTypes = () => styleRegistry.getRegisteredTokenTypes();
export const getRegisteredTokenType = (tokenType: TokenTypeKey) => styleRegistry.getRegisteredTokenType(tokenType);
