// Types
import type { AttributeDefinition, AttributeKey, AttributeDefinitionRecord } from '@/src/core/block/attribute/types';
import type { ValidateResult } from '@/src/shared/types/result';

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
export const registerAttribute = (attributeDefinition: AttributeDefinition) => attributeRegistry.registerAttribute(attributeDefinition);
export const getRegisteredAttributes = () => attributeRegistry.getRegisteredAttributes();
export const getRegisteredAttribute = (attributeName: AttributeKey) => attributeRegistry.getRegisteredAttribute(attributeName);
