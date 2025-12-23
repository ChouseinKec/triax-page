import type { StyleDefinition, StyleKey, StyleDefinitionRecord, UnitKey, UnitDefinition, UnitDefinitionRecord } from '@/src/core/block/style/types';
import type { ValidateResult } from '@/src/shared/types/result';

/**
 * Class-based style registry for managing CSS property definitions
 */
class StyleRegistry {
	private styles: Readonly<StyleDefinitionRecord> = {};
	private units: Readonly<UnitDefinitionRecord> = {};

	// ? --------------------------------------------------------- STYLE METHODS --------------------------------------------------------- //

	/**
	 * Registers a style definition in the style registry.
	 * @param style - The style definition to register
	 */
	registerStyle(styleDefinition: StyleDefinition): ValidateResult<StyleDefinition> {
		// Check for duplicates
		if (this.styles[styleDefinition.key]) return { valid: false, message: `Style with key "${styleDefinition.key}" already registered` };

		// Register the style
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
export const registerStyle = (styleDefinition: StyleDefinition) => styleRegistry.registerStyle(styleDefinition);
export const getRegisteredStyles = () => styleRegistry.getRegisteredStyles();
export const getRegisteredStyle = (styleKey: StyleKey) => styleRegistry.getRegisteredStyle(styleKey);

export const registerUnit = (unitDefinition: UnitDefinition) => styleRegistry.registerUnit(unitDefinition);
export const getRegisteredUnits = () => styleRegistry.getRegisteredUnits();
export const getRegisteredUnit = (unitKey: UnitKey) => styleRegistry.getRegisteredUnit(unitKey);
