// Types
import type { AttributeKey } from "@/src/core/block/attribute/types";
import type { BlockID } from "@/src/core/block/instance/types";

export interface PropertyActionsProps {
	blockID: BlockID;
	property: AttributeKey;
}
