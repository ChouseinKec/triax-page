"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockAttributesLayouts from "@/src/page-builder/component/inspectors/block/attribute/layout/component";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/service/managers/block";

/**
 * BlockAttributes Component
 * Renders the attribute editor interface for the selected block.
 * Shows a fallback message when no block is selected.
 *
 * @returns ReactElement
 */
const BlockAttributes: React.FC = () => {
    const selectedBlockID = useSelectedBlockID();

    return (
        <div className={CSS.BlockAttributes} >
            {selectedBlockID
                ? <BlockAttributesLayouts />
                : <p className={CSS.Empty}>
                    No block selected. Select a block to see attribute-specific settings.
                </p>
            }
        </div>
    );
};

BlockAttributes.displayName = "BlockAttributes";
export default BlockAttributes;

