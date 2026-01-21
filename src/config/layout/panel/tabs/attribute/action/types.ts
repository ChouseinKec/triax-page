// Types
import type { AttributeKey } from "@/core/block/attribute/types";
import type { BlockID } from "@/core/block/instance/types";

export interface PropertyActionsProps {
	blockID: BlockID;
	property: AttributeKey;
}
