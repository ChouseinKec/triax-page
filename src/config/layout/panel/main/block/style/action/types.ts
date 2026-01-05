// Types
import type { StyleKey } from "@/src/core/block/style/types";
import type { BlockID } from "@/src/core/block/instance/types";

export interface PropertyActionsProps {
    blockID: BlockID;
    property: StyleKey;
}