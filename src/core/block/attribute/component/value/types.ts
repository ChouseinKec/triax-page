// Types
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { BlockID } from '@/src/core/block/instance/types';

/**
 * Props for attribute value components.
 * Base interface for components that edit attribute values.
 *
 * Seventh level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category -> Group -> Property -> Value.
 */
export interface BlockAttributesValueProps {
	/** ID of the block being edited */
	blockID: BlockID;
	/** Name of the attribute being edited */
	attribute: AttributeKey;
}
