"use client";
import React, { ReactElement, useEffect, useCallback, useMemo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { BlockEditorProps } from "./types";

// Components
import Blocks from "./components/blocks/component";
import AddBlock from "./components/blocks-list/component";
import StyleEditor from "@/editors/style/component";

// Context
import { LeftPanel, ViewPanel, RightPanel } from "@/context/layout/manager";
// Hooks
import { useBlockManager } from "@/hooks/block/manager";

/**
 * BlockEditor Component
 * - Renders the main block editor UI.
 * - Registers the block add/list UI to the LeftPanel via context.
 */
const BlockEditor: React.FC<BlockEditorProps> = (props: BlockEditorProps): ReactElement => {
    // Access the LeftPanel context setter to register panel content
    const { getSelectedBlock, selectBlock } = useBlockManager();

    // Memoize the block list UI so it doesn't change on every render
    const blocksList = useMemo(() => <AddBlock />, []);
    const styleEditor = useMemo(() => <StyleEditor />, []);
    const selectedBlock = getSelectedBlock();


    const { addItem: addToLeft, removeItem: removeFromLeft } = LeftPanel.usePanel();
    const { addItem: addToRight, removeItem: removeFromRight } = RightPanel.usePanel();

    useEffect(() => {
        const blockListIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" /></svg>;
        const styleEditorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M200,24H56A32,32,0,0,0,24,56V200a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V56A32,32,0,0,0,200,24Zm16,176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200a16,16,0,0,1,16,16ZM184,80a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Zm0,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm-32,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h64A8,8,0,0,1,152,160Z" /></svg>

        // Register components
        addToLeft({ id: "block-list", component: blocksList, priority: 1, icon: blockListIcon });

        if (selectedBlock) addToRight({ id: "style-editor", component: styleEditor, priority: 1, icon: styleEditorIcon });

        // Cleanup on unmount
        return () => {
            removeFromLeft("block-list");
            removeFromRight("style-editor");
        };
    }, [addToLeft, removeFromLeft, blocksList, selectedBlock]);


    const handleClick = useCallback((e: React.MouseEvent) => {
        selectBlock(null);
        // Prevent default behavior to avoid unwanted side effects
        e.preventDefault();
        e.stopPropagation();
    }, []);

    return (
        <div className={CSS.BlockEditor} onClick={handleClick}>
            <Blocks />
        </div>
    );
};

export default BlockEditor;