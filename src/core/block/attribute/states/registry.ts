// Types
import type { AttributeDefinition, AttributeKey, AttributeDefinitionRecord } from '@/core/block/attribute/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based attribute registry for managing HTML attribute definitions
 */
class AttributeRegistry {
	private attributes: AttributeDefinitionRecord = {};

	/**
	 * Registers an attribute definition in the attribute registry.
	 * @param attributeDefinition - The attribute definition to register
	 */
	registerAttribute(attributeDefinition: AttributeDefinition): ValidateResult<AttributeDefinition> {
		// Check for duplicates
		if (this.attributes[attributeDefinition.key]) return { valid: false, message: `Attribute with name "${attributeDefinition.key}" already registered` };

		// Register the attribute
		this.attributes = { ...this.attributes, [attributeDefinition.key]: attributeDefinition };

		return { valid: true, value: attributeDefinition };
	}

	/**
	 * Retrieves all registered attribute definitions.
	 */
	getRegisteredAttributes(): Readonly<AttributeDefinitionRecord> {
		return { ...this.attributes };
	}

	/**
	 * Retrieves a specific attribute definition by its name.
	 * @param attributeName - The attribute name to retrieve
	 */
	getRegisteredAttribute(attributeName: AttributeKey): AttributeDefinition | undefined {
		return this.attributes[attributeName];
	}
}

// Create singleton instance
const attributeRegistry = new AttributeRegistry();

// Export the registry instance methods
export const registerAttribute = (attributeDefinition: AttributeDefinition): void => {
  const result = attributeRegistry.registerAttribute(attributeDefinition);
  if (!result.valid) {
    devLog.error(`[Registry → Attribute] ❌ Failed: ${attributeDefinition.key} - ${result.message}`);
  }
};
export const registerAttributes = (attributeDefinitions: AttributeDefinition[]) => attributeDefinitions.forEach(registerAttribute);
export const getRegisteredAttributes = () => attributeRegistry.getRegisteredAttributes();
export const getRegisteredAttribute = (attributeName: AttributeKey) => attributeRegistry.getRegisteredAttribute(attributeName);
