// Types
import type { AttributeKey } from '@/core/block/attribute/types';
import type { BlockID } from '@/core/block/instance/types';

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
