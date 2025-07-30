"use client";
import React, { ReactElement, useEffect, useCallback, useMemo, memo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { BlockEditorProps } from "./types";

// Components
import Blocks from "./components/blocks/component";
import List from "./components/list/component";
import Hierarchy from "./components/hierarchy/component";
import StyleEditor from "@/editors/style/component";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";
import { useLayoutManager } from "@/hooks/layout/manager";

/**
 * BlockEditor Component
 * Renders the main block editor UI and registers block-related tabs to the layout panels.
 * @param props - BlockEditorProps
 * @returns ReactElement
 */
const BlockEditor: React.FC<BlockEditorProps> = (props: BlockEditorProps): ReactElement => {
    // Get block selection handler from block manager
    const { selectBlock } = useBlockManager();

    // Memoize block list and style editor components for performance
    const blocksList = useMemo(() => <List key="block-list" />, []);
    const blockHierarchy = useMemo(() => <Hierarchy key="block-hierarchy" />, []);
    const styleEditor = useMemo(() => <StyleEditor key="style-editor" />, []);

    // Get tab registration methods from layout manager
    const { registerTab, unregisterTab } = useLayoutManager();

    /**
     * Register block-related tabs to layout panels on mount.
     * Unregister them on unmount for cleanup.
     */
    useEffect(() => {
        // SVG icons for tabs
        const blockListIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
            </svg>
        );
        const styleEditorIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M200,24H56A32,32,0,0,0,24,56V200a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V56A32,32,0,0,0,200,24Zm16,176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200a16,16,0,0,1,16,16ZM184,80a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,80Zm0,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,120Zm-32,40a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h64A8,8,0,0,1,152,160Z" />
            </svg>
        );

        // Register tabs to panels
        registerTab("block-list", {
            id: "block-list",
            content: blocksList,
            title: "Block List",
            icon: blockListIcon,
            order: 10,
        });
        registerTab("block-hierarchy", {
            id: "block-hierarchy",
            content: blockHierarchy,
            title: "Block Hierarchy",
            icon: blockListIcon,
            order: 10,
        });
        registerTab("block-inspector", {
            id: "block-style",
            content: styleEditor,
            title: "Style Editor",
            icon: styleEditorIcon,
            order: 10,
        });

        // Cleanup: unregister tabs on unmount
        return () => {
            unregisterTab("block-list", "block-list");
            unregisterTab("block-inspector", "block-style");
            unregisterTab("block-inspector", "block-style2");
        };
    }, [blocksList, styleEditor, registerTab, unregisterTab]
    );

    /**
     * Handles click events on the editor background.
     * Deselects any selected block and prevents event propagation.
     * @param e - React mouse event
     */
    const handleClick = useCallback((e: React.MouseEvent) => {
        selectBlock(null);
        e.preventDefault();
        e.stopPropagation();
    }, [selectBlock]
    );

    return (
        <div className={CSS.BlockEditor} onClick={handleClick}>
            <Blocks />
        </div>
    );
};

export default memo(BlockEditor);