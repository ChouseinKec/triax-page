// Types
import type { StyleKey } from "@/core/block/style/types";
import type { BlockID } from "@/core/block/instance/types";

export interface PropertyActionsProps {
    blockID: BlockID;
    property: StyleKey;
}