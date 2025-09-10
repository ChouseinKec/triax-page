"use client";

import React, { memo } from "react";

// Styles
import CSS from "@/editors/block/components/style/styles.module.scss";

// Components
import StylesEditorLayouts from "@/editors/block/components/style/layout/component"; 

// Types
import type { StylesEditorProps } from "@/editors/block/types/component";

// Managers
import { useSelectedBlockID } from "@/editors/block/managers/block";

/**
 * StylesEditor Component
 * Displays style controls for the currently selected block.
 * Shows a fallback message when no block is selected.
 *
 * @returns The rendered style controls or fallback message
 */
const StylesEditor: React.FC<StylesEditorProps> = () => {
    // Get the currently selected block ID
    const selectedBlockID = useSelectedBlockID();
    return (
        <div className={CSS.StylesEditor}>
            {/* Render style layout if a block is selected, otherwise show fallback */}
            {selectedBlockID
                ? <StylesEditorLayouts />
                : <p className={CSS.StylesEditor__Empty}>
                    No block selected. Select a block to see style-specific settings.
                </p>
            }
        </div>
    );
};

export default memo(StylesEditor);