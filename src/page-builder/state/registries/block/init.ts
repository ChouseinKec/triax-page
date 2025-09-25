// Registry
import { registerBlock } from '.';

// Config
import { CoreBlocks } from '@/src/page-builder/config/blocks';

// Types
import type { BlockDefinition } from '@/src/page-builder/core/block/block/types';

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

	const results: Array<{ id: string; status: string; core: string }> = [];

	blocks.forEach((block) => {
		const result = registerBlock(block);
		results.push({
			id: block.type,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'block',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register all core block components
 */
export function initializeRegistry() {
	initializeBlocks();
}

// Auto-initialize on module load
initializeRegistry();
