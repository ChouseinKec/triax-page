// Types
import type { StyleDefinition, StyleKey, StyleDefinitionRecord, UnitKey, UnitDefinition, UnitDefinitionRecord, TerminalDefinition, TerminalDefinitionRecord, TerminalKey, NonTerminalKey, NonTerminalDefinition, NonTerminalDefinitionRecord } from '@/core/block/style/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based style registry for managing CSS property definitions
 */
class StyleRegistry {
	private styles: Readonly<StyleDefinitionRecord> = {};
	private units: Readonly<UnitDefinitionRecord> = {};
	private terminals: Readonly<TerminalDefinitionRecord> = {};
	private nonTerminals: Readonly<NonTerminalDefinitionRecord> = {};

	// ? --------------------------------------------------------- STYLE METHODS --------------------------------------------------------- //

	/**
	 * Registers a style definition in the style registry.
	 * @param style - The style definition to register
	 */
	registerStyle(styleDefinition: StyleDefinition): ValidateResult<StyleDefinition> {
		// Check for duplicates
		if (this.styles[styleDefinition.key]) return { valid: false, message: `Style with key "${styleDefinition.key}" already registered` };

		// Register the full style
		this.styles = { ...this.styles, [styleDefinition.key]: styleDefinition };

		return { valid: true, value: styleDefinition };
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

	// ? --------------------------------------------------------- TERMINAL METHODS --------------------------------------------------------- //

	/**
	 * Registers a terminal definition in the registry.
	 * @param terminalDefinition - The terminal definition to register
	 */
	registerTerminal(terminalDefinition: TerminalDefinition): ValidateResult<TerminalDefinition> {
		// Check for duplicates
		if (this.terminals[terminalDefinition.key]) return { valid: false, message: `Terminal with key "${terminalDefinition.key}" already registered` };

		// Register the terminal
		this.terminals = { ...this.terminals, [terminalDefinition.key]: terminalDefinition };
		return { valid: true, value: terminalDefinition };
	}

	/**
	 * Retrieves all registered terminal definitions.
	 */
	getRegisteredTerminals(): Readonly<TerminalDefinitionRecord> {
		return { ...this.terminals };
	}

	/**
	 * Retrieves a specific terminal definition by its key.
	 * @param terminalKey - The terminal key to retrieve
	 */
	getRegisteredTerminal(terminalKey: TerminalKey): TerminalDefinition | undefined {
		return this.terminals[terminalKey];
	}

	// ? --------------------------------------------------------- NON-TERMINAL METHODS --------------------------------------------------------- //

	/**
	 * Registers a non-terminal production in the registry.
	 * @param nonTerminalDefinition - The non-terminal definition to register
	 */
	registerNonTerminal(nonTerminalDefinition: NonTerminalDefinition): ValidateResult<NonTerminalDefinition> {
		// Check for duplicates
		if (this.nonTerminals[nonTerminalDefinition.key]) return { valid: false, message: `Non-terminal with key "${nonTerminalDefinition.key}" already registered` };

		// Register the non-terminal
		this.nonTerminals = { ...this.nonTerminals, [nonTerminalDefinition.key]: nonTerminalDefinition };
		return { valid: true, value: nonTerminalDefinition };
	}

	/**
	 * Retrieves all registered non-terminal productions.
	 */
	getRegisteredNonTerminals(): Readonly<NonTerminalDefinitionRecord> {
		return { ...this.nonTerminals };
	}

	/**
	 * Retrieves a specific non-terminal production by its key.
	 * @param key - The non-terminal key to retrieve
	 */
	getRegisteredNonTerminal(key: NonTerminalKey): NonTerminalDefinition | undefined {
		return this.nonTerminals[key];
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
export const registerStyle = (styleDefinition: StyleDefinition): void => {
	const result = styleRegistry.registerStyle(styleDefinition);
	if (!result.valid) {
		devLog.error(`[Registry → Style]    ❌ Failed: ${styleDefinition.key} - ${result.message}`);
	}
};
export const registerStyles = (styleDefinitions: StyleDefinition[]) => styleDefinitions.forEach(registerStyle);
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

export const registerTerminal = (terminalDefinition: TerminalDefinition): void => {
	const result = styleRegistry.registerTerminal(terminalDefinition);
	if (!result.valid) {
		devLog.error(`[Registry → Terminal]  ❌ Failed: ${terminalDefinition.key} - ${result.message}`);
	}
};
export const registerTerminals = (terminalDefinitions: TerminalDefinition[]) => terminalDefinitions.forEach(registerTerminal);
export const getRegisteredTerminals = () => styleRegistry.getRegisteredTerminals();
export const getRegisteredTerminal = (terminalKey: TerminalKey) => styleRegistry.getRegisteredTerminal(terminalKey);

export const registerNonTerminal = (nonTerminalDefinition: NonTerminalDefinition): void => {
	const result = styleRegistry.registerNonTerminal(nonTerminalDefinition);
	if (!result.valid) {
		devLog.error(`[Registry → NonTerminal] ❌ Failed: ${nonTerminalDefinition.key} - ${result.message}`);
	}
};
export const registerNonTerminals = (nonTerminalDefinitions: NonTerminalDefinition[]) => nonTerminalDefinitions.forEach(registerNonTerminal);
export const getRegisteredNonTerminals = () => styleRegistry.getRegisteredNonTerminals();
export const getRegisteredNonTerminal = (key: NonTerminalKey) => styleRegistry.getRegisteredNonTerminal(key);
