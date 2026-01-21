// Types
import type { BarDefinition } from '@/core/layout/bar/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateBarDefinition } from '@/core/layout/bar/helpers/validators';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based layout registry for managing panels, bars, and infos
 */
class BarRegistry {
	private bars: Record<string, BarDefinition> = {};

	/**
	 * Registers a LayoutBar definition in the layout context.
	 * @param bar - The LayoutBar definition to register.
	 * @returns Success status with optional error message
	 */
	registerBar(bar: BarDefinition): ValidateResult<BarDefinition> {
		// Validate bar
		const validation = validateBarDefinition(bar);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.bars[bar.id]) {
			return { valid: false, message: `Bar with id "${bar.id}" already registered` };
		}

		// Register bar
		this.bars = { ...this.bars, [bar.id]: bar };
		return { valid: true, value: bar };
	}

	/**
	 * Retrieves all registered LayoutBars.
	 */
	getRegisteredBars(): Readonly<Record<string, BarDefinition>> {
		return { ...this.bars };
	}

	/**
	 * Retrieves a specific bar by ID.
	 */
	getBarById(id: string): BarDefinition | undefined {
		return this.bars[id];
	}
}

// Create singleton instance and initialization tracking
const barRegistry = new BarRegistry();

// Export the registry instance methods
export const registerBar = (bar: BarDefinition): void => {
  const result = barRegistry.registerBar(bar);
  if (!result.valid) {
    devLog.error(`[Registry → Bar]      ❌ Failed: ${bar.id} - ${result.message}`);
  }
};
export const registerBars = (bars: BarDefinition[]) => bars.forEach(registerBar);
export const getRegisteredBars = () => barRegistry.getRegisteredBars();
export const getBarById = (id: string) => barRegistry.getBarById(id);
