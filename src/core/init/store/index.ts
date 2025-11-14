// Types
import type { StoreDefinition } from '@/src/core/init/store/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Generic store initialization function
 * Initializes a store using the provided initialization function
 *
 * @param config - Configuration object for the initialization
 * @param config.name - Store name for logging (e.g., "Page Store", "Layout Store")
 * @param config.initFn - Function that initializes the store
 */
export async function InitStore(config: StoreDefinition): Promise<void> {
	const { name, initFn } = config;
	try {
		await initFn();
		devLog.info(`[Init → Store]               ✔️ Initialized: ${name}`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		devLog.error(`[Init → Store]               ❌ Initialized: ${name}; Failed: ${errorMessage}`);
		throw error;
	}
}
