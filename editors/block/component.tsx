"use client";
import React, { ReactElement, useEffect, useCallback, useMemo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { BlockEditorProps } from "./types";

// Components
import Blocks from "./components/blocks/component";
import BlockList from "./components/blocks-list/component";
import StyleEditor from "@/editors/style/component";

// Context
import { BlocksPanel, InspectorPanel } from "@/context/layout/manager";
// Hooks
import { useBlockManager } from "@/hooks/block/manager";

/**
 * BlockEditor Component
 * - Renders the main block editor UI.
 * - Registers the block add/list UI to the BlocksPanel via context.
 */
const BlockEditor: React.FC<BlockEditorProps> = (props: BlockEditorProps): ReactElement => {
    // Access the BlocksPanel context setter to register panel content
    const { selectBlock } = useBlockManager();

    // Memoize the block list UI so it doesn't change on every render
    const blocksList = useMemo(() => <BlockList key='block-list' />, []);
    const styleEditor = useMemo(() => <StyleEditor key='style-editor' />, []);

    const { addItem: addToLeft, removeItem: removeFromLeft } = BlocksPanel.usePanel();
    const { addItem: addToRight, removeItem: removeFromRight } = InspectorPanel.usePanel();

    useEffect(() => {
        const blockListIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" /></svg>;
        const styleEditorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M200,24H56A32,32,0,0,0,24,56V200a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V56A32,32,0,0,0,200,24Zm16,176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200a16,16,0,0,1,16,16ZM184,80a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Zm0,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm-32,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h64A8,8,0,0,1,152,160Z" /></svg>;

        // Register components
        addToLeft({ id: "block-list", component: blocksList, priority: 1, icon: blockListIcon , order: 10 });
        addToRight({ id: "style-editor", component: styleEditor, priority: 1, icon: styleEditorIcon , order: 10 });

        // Cleanup on unmount
        return () => {
            removeFromLeft("block-list");
            removeFromRight("style-editor")
        };
    }, [addToLeft, removeFromLeft, addToRight, removeFromRight, blocksList, styleEditor]
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