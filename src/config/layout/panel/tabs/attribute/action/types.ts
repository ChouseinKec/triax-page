// Types
import type { AttributeKey } from "@/core/block/attribute/types";
import type { NodeID } from "@/core/block/node/instance/types";

export interface PropertyActionsProps {
	NodeID: NodeID;
	property: AttributeKey;
}
