import { registerBlock } from './registry';
import * as CoreBlocks from './core';

// Check if CoreBlocks is a valid module and not empty
if (!CoreBlocks || typeof CoreBlocks !== 'object' || Object.keys(CoreBlocks).length === 0) {
	throw new Error("[Triax] Error: './core' block module is missing, empty, or not a valid module. Please ensure you have at least one block exported in registry/blocks/core/index.ts.");
}

// Check for at least one valid block definition (has 'type')
const validBlocks = Object.values(CoreBlocks).filter((block: any) => block && typeof block === 'object' && 'type' in block);

if (validBlocks.length === 0) {
	throw new Error("[Triax] Error: './core' module does not export any valid block definitions (missing 'type' property).");
}

// Register all valid blocks
validBlocks.forEach(registerBlock);
