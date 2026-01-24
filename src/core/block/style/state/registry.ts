// Types
import type { StyleDefinition, StyleKey, RegisteredStyles, UnitKey, UnitDefinition, UnitDefinitionRecord, TokenDefinition, RegisteredTokens, TokenKey, TokenTypeKey, TokenTypeDefinition, RegisteredTokenTypes, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators } from '@/core/block/style/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { devLog } from '@/shared/utilities/dev';

type StyleDefinitionInput = Omit<StyleDefinition, 'syntaxParsed' | 'syntaxNormalized' | 'syntaxSet' | 'syntaxSeparators'>;

/**
 * Class-based style registry for managing CSS property definitions
 */
class StyleRegistry {
	private styles: Readonly<RegisteredStyles> = {};
	private units: Readonly<UnitDefinitionRecord> = {};
	private tokens: Readonly<RegisteredTokens> = {};
	private tokenTypes: Readonly<RegisteredTokenTypes> = {};

	// ? --------------------------------------------------------- STYLE METHODS --------------------------------------------------------- //

	/**
	 * Registers a style definition in the style registry.
	 * @param style - The style definition to register
	 */
	registerStyle(styleDefinition: StyleDefinitionInput): ValidateResult<StyleDefinition> {
		// Check for duplicates
		if (this.styles[styleDefinition.key]) return { valid: false, message: `Style with key "${styleDefinition.key}" already registered` };

		// Register the full style
		this.styles = { ...this.styles, [styleDefinition.key]: styleDefinition };

		return { valid: true, value: styleDefinition };
	}

	/**
	 * Retrieves all registered style definitions.
	 */
	getRegisteredStyles(): Readonly<RegisteredStyles> {
		return { ...this.styles };
	}

	/**
	 * Retrieves a specific style definition by its property key.
	 * @param key - The style key (CSS property) to retrieve
	 */
	getRegisteredStyle(styleKey: StyleKey): StyleDefinition | undefined {
		return this.styles[styleKey];
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
	getRegisteredTokens(): Readonly<RegisteredTokens> {
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
	getRegisteredTokenTypes(): Readonly<RegisteredTokenTypes> {
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
export const registerStyle = (styleDefinition: StyleDefinitionInput): void => {
  const result = styleRegistry.registerStyle(styleDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → Style]    ❌ Failed: ${styleDefinition.key} - ${result.message}`);
  }
};
export const registerStyles = (styleDefinitions: StyleDefinitionInput[]) => styleDefinitions.forEach(registerStyle);
export const getRegisteredStyles = () => styleRegistry.getRegisteredStyles();
export const getRegisteredStyle = (styleKey: StyleKey) => styleRegistry.getRegisteredStyle(styleKey);

export const registerUnit = (unitDefinition: UnitDefinition): void => {
  const result = styleRegistry.registerUnit(unitDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → Unit]     ❌ Failed: ${unitDefinition.key} - ${result.message}`);
  }
};
export const registerUnits = (unitDefinitions: UnitDefinition[]) => unitDefinitions.forEach(registerUnit);
export const getRegisteredUnits = () => styleRegistry.getRegisteredUnits();
export const getRegisteredUnit = (unitKey: UnitKey) => styleRegistry.getRegisteredUnit(unitKey);

export const registerToken = (tokenDefinition: TokenDefinition): void => {
  const result = styleRegistry.registerToken(tokenDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → Token]    ❌ Failed: ${tokenDefinition.key} - ${result.message}`);
  }
};
export const registerTokens = (tokenDefinitions: TokenDefinition[]) => tokenDefinitions.forEach(registerToken);
export const getRegisteredTokens = () => styleRegistry.getRegisteredTokens();
export const getRegisteredToken = (tokenKey: TokenKey) => styleRegistry.getRegisteredToken(tokenKey);

export const registerTokenType = (tokenTypeDefinition: TokenTypeDefinition): void => {
  const result = styleRegistry.registerTokenType(tokenTypeDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → TokenType] ❌ Failed: ${tokenTypeDefinition.key} - ${result.message}`);
  }
};
export const registerTokenTypes = (tokenTypeDefinitions: TokenTypeDefinition[]) => tokenTypeDefinitions.forEach(registerTokenType);
export const getRegisteredTokenTypes = () => styleRegistry.getRegisteredTokenTypes();
export const getRegisteredTokenType = (tokenType: TokenTypeKey) => styleRegistry.getRegisteredTokenType(tokenType);
