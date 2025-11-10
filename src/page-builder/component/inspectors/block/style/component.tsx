"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesLayouts from "@/src/page-builder/component/inspectors/block/style/layout/component";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/service/managers/block";

/**
 * BlockStyles Component
 *
 * The main style inspector panel that displays CSS property controls for the currently selected block in the page builder.
 * Conditionally renders comprehensive style editing interface or informative fallback when no block is selected.
 * Serves as the primary interface for visual block customization and property management.
 *
 * @returns Rendered style inspector panel with block-specific controls or selection prompt
 *
 * @note Relies on block selection state to determine which style controls to display
 */
const BlockStyles: React.FC = () => {
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