// Types
import type { StyleKey } from "@/core/block/style/types";
import type { NodeID } from "@/core/block/node/types/instance";

export interface PropertyActionsProps {
    nodeID: NodeID;
    property: StyleKey;
}