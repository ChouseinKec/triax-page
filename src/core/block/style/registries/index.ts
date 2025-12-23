import type { StyleDefinition, StyleKey, StyleDefinitionRecord } from '@/src/core/block/style/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateStyleDefinition } from '@/src/core/block/style/helpers';

/**
 * Class-based style registry for managing CSS property definitions
 */
class StyleRegistry {
	private styles: Readonly<StyleDefinitionRecord> = {};

	// ? --------------------------------------------------------- STYLE METHODS --------------------------------------------------------- //

	/**
	 * Registers a style definition in the style registry.
	 * @param style - The style definition to register
	 */
	registerStyle(styleDefinition: StyleDefinition): ValidateResult<StyleDefinition> {
		// Validate the style definition
		const styleValidation = validateStyleDefinition(styleDefinition);
		if (!styleValidation.valid) return { valid: false, message: `Failed to register style "${styleDefinition.key}": ${styleValidation.message}` };

		// Check for duplicates
		if (this.styles[styleValidation.value.key]) return { valid: false, message: `Style with key "${styleValidation.value.key}" already registered` };

		// Register the style
		this.styles = { ...this.styles, [styleValidation.value.key]: styleValidation.value };
		return { valid: true, value: styleValidation.value };
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
	getRegisteredStyle(key: StyleKey): StyleDefinition | undefined {
		return this.styles[key];
	}
}

// Create singleton instance
const styleRegistry = new StyleRegistry();

// Export the registry instance methods
export const registerStyle = (styleDefinition: StyleDefinition) => styleRegistry.registerStyle(styleDefinition);
export const getRegisteredStyles = () => styleRegistry.getRegisteredStyles();
export const getRegisteredStyle = (styleKey: StyleKey) => styleRegistry.getRegisteredStyle(styleKey);
