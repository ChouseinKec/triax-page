"use client";

import React, { useEffect } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesLayouts from "@/src/page-builder/ui/inspectors/block/style/layout/component";

// Types
import type { BlockStylesProps } from "@/src/page-builder/ui/inspectors/block/types";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

/**
 * BlockStyles Component
 * Displays style controls for the currently selected block.
 * Shows a fallback message when no block is selected.
 *
 * @returns The rendered style controls or fallback message
 */
const BlockStyles: React.FC<BlockStylesProps> = () => {
    // Get the currently selected block ID
    const selectedBlockID = useSelectedBlockID();

    return (
        <div className={CSS.BlockStyles}>
            {/* Render style layout if a block is selected, otherwise show fallback */}
            {selectedBlockID
                ? <BlockStylesLayouts />
                : <p className={CSS.BlockStyles__Empty}>
                    No block selected. Select a block to see style-specific settings.
                </p>
            }
        </div>
    );
};

export default BlockStyles;