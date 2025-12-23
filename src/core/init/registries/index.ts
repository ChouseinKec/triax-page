// Types
import type { RegistryDefinition } from '@/src/core/init/registries/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Generic registry initialization function
 * Validates and registers items of any type using a provided registration function
 *
 * @template T - The type of items being registered
 * @param config - Configuration object for the initialization
 * @param config.category - Category name for logging (e.g., "Block", "Panel", "Device")
 * @param config.items - Array of items to register
 * @param config.registerFn - Function that registers a single item and returns validation result
 * @param config.getIdFn - Function that extracts an identifier from an item for logging
 * @param config.validateFn - Optional function to validate an item before registration
 */

export function InitRegistry<T>(config: RegistryDefinition<T>) {
	const { category, items, registerFn, getIdFn, validateFn } = config;

	// Resolve items (supports lazy getter) and filter valid items if validator provided
	const validItems = items.filter(validateFn);

	if (validItems.length === 0) {
		devLog.warn(`[Init → Registry]		      ❌ No valid core ${category.toLowerCase()}s found to register`);
		return { category, total: 0, success: 0, failed: 0, failedIds: [] };
	}

	let success = 0;
	const failedIds: string[] = [];

	for (const item of validItems) {
		const id = getIdFn(item);
		const result = registerFn(item);
		if (result.valid) {
			success++;
		} else {
			failedIds.push(id);
		}
	}

	// Collapsed summary logging
	if (failedIds.length === 0) {
		devLog.info(`[Init → Registry]		      ✔️ Registered: ${success}/${validItems.length} ${category.toLowerCase()}(s)`);
	} else {
		devLog.error(`[Init → Registry]		      ✔️ Registered: ${success}/${validItems.length} ${category.toLowerCase()}(s) / Failed: ❌ ${failedIds.length} -> ${failedIds.join(', ')}`);
	}
}
