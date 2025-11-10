"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesLayouts from "@/src/page-builder/component/inspectors/block/style/layout/component";

// Managers
import { useSelectedBlockID, canBlockHaveStyles } from "@/src/page-builder/service/managers/block";

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
    const selectedBlockID = useSelectedBlockID();
    const canHaveStyles = selectedBlockID ? canBlockHaveStyles(selectedBlockID) : false;

    const renderContent = () => {
        if (!selectedBlockID) {
            return (
                <p className={CSS.Empty}>
                    No block selected. Select a block to see style-specific settings.
                </p>
            );
        }
        if (!canHaveStyles) {
            return (
                <p className={CSS.Empty}>
                    The selected block does not have configurable styles.
                </p>
            );
        }
        return <BlockStylesLayouts />;
    };
    return <div className={CSS.BlockStyles}>{renderContent()}</div>;
};

export default BlockStyles;