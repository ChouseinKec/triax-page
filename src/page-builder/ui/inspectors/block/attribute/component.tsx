"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { BlockAttributesProps } from "@/src/page-builder/ui/inspectors/block/types";

// Components
import BlockAttributesLayouts from "@/src/page-builder/ui/inspectors/block/attribute/layout/component";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

/**
 * BlockAttributes Component
 * Renders the attribute editor interface for the selected block.
 * Shows a fallback message when no block is selected.
 *
 * @returns ReactElement
 */
const BlockAttributes: React.FC<BlockAttributesProps> = () => {
    const selectedBlockID = useSelectedBlockID();

    return (
        <div className={CSS.BlockAttributes} >
            {selectedBlockID
                ? <BlockAttributesLayouts />
                : <p className={CSS.BlockAttributes__Empty}>
                    No block selected. Select a block to see attribute-specific settings.
                </p>
            }
        </div>
    );
};

export default BlockAttributes;

