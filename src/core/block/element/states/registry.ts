// Types
import type { ElementDefinition, ElementKey, RegisteredElements } from '@/core/block/element/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based element registry for managing HTML element definitions
 */
class ElementRegistry {
	private elements: Readonly<RegisteredElements> = {};

	/**
	 * Registers an element definition in the element registry.
	 * @param elementDefinition - The element definition to register
	 */
	registerElement(elementDefinition: ElementDefinition): ValidateResult<ElementDefinition> {
		// Check for duplicates
		if (this.elements[elementDefinition.key]) return { valid: false, message: `Element with key "${elementDefinition.key}" already registered` };

		// Register the element
		this.elements = { ...this.elements, [elementDefinition.key]: elementDefinition };

		return { valid: true, value: elementDefinition };
	}

	/**
	 * Retrieves all registered element definitions.
	 */
	getRegisteredElements(): Readonly<RegisteredElements> {
		return { ...this.elements };
	}

	/**
	 * Retrieves a specific element definition by its tag.
	 * @param elementKey - The element tag to retrieve
	 */
	getRegisteredElement(elementKey: ElementKey): ElementDefinition | undefined {
		return this.elements[elementKey];
	}
}

// Create singleton instance
const elementRegistry = new ElementRegistry();

// Export the registry instance methods
export const registerElement = (elementDefinition: ElementDefinition): void => {
  const result = elementRegistry.registerElement(elementDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → Element]  ❌ Failed: ${elementDefinition.key} - ${result.message}`);
  }
};
export const registerElements = (elementDefinitions: ElementDefinition[]) => elementDefinitions.forEach(registerElement);
export const getRegisteredElements = () => elementRegistry.getRegisteredElements();
export const getRegisteredElement = (elementKey: ElementKey) => elementRegistry.getRegisteredElement(elementKey);
