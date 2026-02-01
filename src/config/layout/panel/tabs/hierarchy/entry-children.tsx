import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import Entry from "./entry";

interface EntryChildrenProps {
    canHaveChildren: boolean;
    hasChildren: boolean;
    nodeChildIDs: NodeID[];
}

/**
 * Children Component
 *
 * Renders child entries recursively for hierarchy nodes that can have children.
 */
const Children: React.FC<EntryChildrenProps> = ({
    canHaveChildren,
    hasChildren,
    nodeChildIDs,
}) => {
    if (!canHaveChildren) return null;

    const children = hasChildren
        ? nodeChildIDs.map((childID: NodeID) => (
            <Entry key={childID} nodeID={childID} />
        ))
        : null;

    return (
        <div className={CSS.Content}>
            {children}
        </div>
    );
};

Children.displayName = "Children";

export default memo(Children);
export { type EntryChildrenProps };