"use client";
import React, { useEffect, useMemo, memo } from "react";

// Styles
import CSS from "@/editors/block/style.module.scss";

// Types
import type { BlocksEditorProps } from "@/editors/block/types/component";

// Components
import BlocksCanvas from "@/editors/block/components/canvas/component";
import BlockPicker from "@/editors/block/components/picker/component";
import BlocksHierarchy from "@/editors/block/components/hierarchy/component";
import AttributeEditor from "@/editors/block/components/attribute/component";
import Style from "@/editors/block/components/style/component";

// Context
import { BlockProvider } from "@/editors/block/context";
import { useLayoutContext } from "@/editors/layout/context";

/**
 * BlockEditor Component
 * Renders the main block editor UI and registers block-related tabs to the layout panels.
 * @param props - BlockEditorProps
 * @returns ReactElement
 */
const BlocksEditor: React.FC<BlocksEditorProps> = () => {
    const { registerPanelTab, unregisterPanelTab } = useLayoutContext();

    const blocksList = useMemo(() => <BlockPicker key="block-list" />, []);
    const blockHierarchy = useMemo(() => <BlocksHierarchy key="block-hierarchy" />, []);
    const blockStyle = useMemo(() => <Style key="style-editor" />, []);
    const blockAttribute = useMemo(() => <AttributeEditor key="attribute-editor" />, []);

    /**
     * Register block-related tabs to layout panels on mount.
     * Unregister them on unmount for cleanup.
     */
    useEffect(() => {
        const blockListIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
            </svg>
        );
        const blockStyleIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z" />
            </svg>
        );
        const blockAttributeIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z" />
            </svg>
        );

        registerPanelTab("block-list", {
            id: "block-list",
            content: blocksList,
            title: "Block List",
            icon: blockListIcon,
            order: 10,
        });

        registerPanelTab("block-hierarchy", {
            id: "block-hierarchy",
            content: blockHierarchy,
            title: "Block Hierarchy",
            icon: blockListIcon,
            order: 10,
        });

        registerPanelTab("block-inspector", {
            id: "block-style",
            content: blockStyle,
            title: "Block Styles",
            icon: blockStyleIcon,
            order: 10,
        });

        registerPanelTab("block-inspector", {
            id: "block-attribute",
            content: blockAttribute,
            title: "Block Attributes",
            icon: blockAttributeIcon,
            order: 10,
        });

        // Cleanup: unregister tabs on unmount
        return () => {
            unregisterPanelTab("block-list", "block-list");
            unregisterPanelTab("block-inspector", "block-style");
            unregisterPanelTab("block-inspector", "block-attribute");
        };
    }, []
    );

    return (
        <div className={CSS.BlockEditor}>
            <BlockProvider>
                <BlocksCanvas />
            </BlockProvider>
        </div>
    );
};

export default memo(BlocksEditor);