// Registry
import { registerBlock } from '.';

// Config
import { CoreBlocks } from '@/src/page/config/block';

// Types
import type { BlockDefinition } from '@/src/page/core/block/block/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Initialize and register core blocks
 */
function initializeBlocks() {
	const blocks = CoreBlocks.filter((block): block is BlockDefinition => {
		if (!block || typeof block !== 'object' || !('type' in block)) {
			devLog.warn('[BlockInit] Skipping invalid block definition');
			return false;
		}
		return true;
	});

	if (blocks.length === 0) {
		devLog.warn('[BlockInit] No valid core blocks found to register');
		return;
	}

	devLog.info('[BlockInit] Initializing Blocks:');

	blocks.forEach((block) => {
		const result = registerBlock(block);
		if (result.valid) {
			devLog.info(`         ${block.type} registration successful.`);
		} else {
			devLog.error(`         ${block.type} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register all core block components
 */
export async function initializeRegistry(): Promise<void> {
	return new Promise<void>((resolve) => {
		initializeBlocks();
		resolve();
	});
}
