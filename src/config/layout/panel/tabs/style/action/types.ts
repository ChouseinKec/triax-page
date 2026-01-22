// Types
import type { StyleKey } from "@/core/block/style/definition/types";
import type { NodeID } from "@/core/block/node/instance/types/instance";

export interface PropertyActionsProps {
    NodeID: NodeID;
    property: StyleKey;
}