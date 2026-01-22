// Types
import type { AttributeKey } from "@/core/block/attribute/definition/types";
import type { NodeID } from "@/core/block/node/instance/types/instance";

export interface PropertyActionsProps {
	NodeID: NodeID;
	property: AttributeKey;
}
