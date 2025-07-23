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
import { LeftPanel, RightPanel } from "@/context/layout/manager";
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
        const blockListIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" /></svg>;
        const styleEditorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M200,24H56A32,32,0,0,0,24,56V200a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V56A32,32,0,0,0,200,24Zm16,176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200a16,16,0,0,1,16,16ZM184,80a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Zm0,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm-32,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h64A8,8,0,0,1,152,160Z" /></svg>;
        const questionIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" /></svg>

        // Register components
        addToLeft({ id: "block-list", component: blocksList, priority: 1, icon: blockListIcon });
        addToLeft({ id: "block-tree", component: <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', color: 'white', height: '100%' }}>Just A Test</div>, priority: 1, icon: questionIcon });

        if (selectedBlock) addToRight({ id: "style-editor", component: styleEditor, priority: 1, icon: styleEditorIcon });
        addToRight({ id: "style-raw", component: <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', color: 'white', height: '100%' }}>Just A Test</div>, priority: 1, icon: questionIcon });

        // Cleanup on unmount
        return () => {
            removeFromLeft("block-list");
            removeFromLeft("block-tree");
            removeFromRight("style-editor")
            removeFromRight("style-raw");
        };
    }, [addToLeft, removeFromLeft, blocksList, addToRight, removeFromRight, styleEditor, selectedBlock]
    );


    const handleClick = useCallback((e: React.MouseEvent) => {
        selectBlock(null);

        // Prevent default behavior to avoid unwanted side effects
        e.preventDefault();
        e.stopPropagation();
    }, []
    );

    return (
        <div className={CSS.BlockEditor} onClick={handleClick}>
            <Blocks />
        </div>
    );
};

export default BlockEditor;