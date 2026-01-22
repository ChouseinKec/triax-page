// Types
import type { StyleKey } from "@/core/block/style/types";
import type { NodeID } from "@/core/block/node/instance/types";

export interface PropertyActionsProps {
    NodeID: NodeID;
    property: StyleKey;
}