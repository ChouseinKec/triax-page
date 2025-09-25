"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Block from "./block";

// Managers
import { useBlock } from "@/src/page-builder/services/managers/block";

/**
 * BlockEditor Component
 * Renders the main block editor UI and registers block-related tabs to the layout LayoutPanels.
 * @param props - BlockEditorProps
 * @returns ReactElement
 */
const BlockView: React.FC = () => {
    const rootBlock = useBlock('body');

    return (
        <div className={CSS.BlockView}>
            {rootBlock && <Block key={rootBlock.id} blockID={rootBlock.id} />}
        </div>
    );
};

export default memo(BlockView);