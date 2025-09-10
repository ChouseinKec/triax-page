"use client";
import React, { memo } from "react";

// Styles
import CSS from "@/editors/block/components/attribute/style.module.scss";

// Types
import type { AttributesEditorProps } from "@/editors/block/types/component";

// Components
import AttributeEditorLayouts from "@/editors/block/components/attribute/layout/component";

// Managers
import { useSelectedBlockID } from "@/editors/block/managers/block";

/**
 * AttributeEditor Component
 * Renders the attribute editor interface for the selected block.
 * Shows a fallback message when no block is selected.
 *
 * @returns ReactElement
 */
const AttributeEditor: React.FC<AttributesEditorProps> = () => {
    const selectedBlockID = useSelectedBlockID();

    return (
        <div className={CSS.AttributeEditor} >
            {selectedBlockID
                ? <AttributeEditorLayouts />
                : <p className={CSS.AttributesEditor__Empty}>
                    No block selected. Select a block to see attribute-specific settings.
                </p>
            }
        </div>
    );
};

export default memo(AttributeEditor);

