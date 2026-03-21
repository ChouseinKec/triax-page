// Types
import type { UnitDefinitionRecord } from '@/core/block/style/types';

// Registry
import { getRegisteredUnits } from '@/core/block/style/state/registry';

export function getUnitDefinitions(): UnitDefinitionRecord {
	return getRegisteredUnits();
}
