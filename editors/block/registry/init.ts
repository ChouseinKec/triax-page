import { registerBlock } from './registry';
import * as CoreBlocks from './definitions';

/**
 * Initializes the block registry by loading and registering all core block definitions.
 * Validates that core blocks exist and have required properties before registration.
 *
 * @throws Error if core blocks module is missing, empty, or contains invalid definitions
 */
(() => {
	// Check if CoreBlocks is a valid module and not empty
	if (!CoreBlocks || typeof CoreBlocks !== 'object' || Object.keys(CoreBlocks).length === 0) {
		throw new Error("[Triax] Error: './definitions' block module is missing, empty, or not a valid module. Please ensure you have at least one block exported in registry/blocks/definitions/index.ts.");
	}

	// Check for at least one valid block definition (has 'type')
	const validBlocks = Object.values(CoreBlocks).filter((block: any) => block && typeof block === 'object' && 'type' in block);

	if (validBlocks.length === 0) {
		throw new Error("[Triax] Error: './definitions' module does not export any valid block definitions (missing 'type' property).");
	}

	// Register all valid blocks
	validBlocks.forEach(registerBlock);
})();
