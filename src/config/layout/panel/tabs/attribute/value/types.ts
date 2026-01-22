// Types
import type { AttributeKey } from '@/core/block/attribute/definition/types';
import type { NodeID } from '@/core/block/node/instance/types/instance';

/**
 * Props for attribute value components.
 * Base interface for components that edit attribute values.
 *
 * Seventh level in hierarchy: NodeAttributes -> Layouts -> Layout -> Category -> Group -> Property -> Value.
 */
export interface NodeAttributesValueProps {
	/** ID of the block being edited */
	NodeID: NodeID;
	/** Name of the attribute being edited */
	attribute: AttributeKey;
}
