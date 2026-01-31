"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedNodeID, useSelectedElementKey } from "@/core/block/node/managers";
import { isElementAttributeEditable } from "@/core/block/element/managers/queries/definition";

// Components
import TabGroup from "@/shared/components/group/tab/component";

// Renderers
import { renderGlobalTab } from "./tabs/global";
import { renderAccessibilityTab } from "./tabs/accessibility";


// Tab icons object
const TAB_ICONS = {
    global: (
        <svg aria-label="Global Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" />
        </svg>
    ),
    accessibility: (
        <svg aria-label="Specific Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M224,56V200a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56ZM56,56V200H200V56Z" />
        </svg>
    ),
};

const BlockAttribute: React.FC = () => {
    const selectedNodeID = useSelectedNodeID();
    const selectedElementKey = useSelectedElementKey();
    const isAttributeEditable = selectedElementKey
        ? isElementAttributeEditable(selectedElementKey)
        : false;

    const tabItems = selectedNodeID
        ? [
            { label: TAB_ICONS.global, title: 'Global', content: renderGlobalTab(selectedNodeID) },
            { label: TAB_ICONS.accessibility, title: 'Accessibility', content: renderAccessibilityTab(selectedNodeID) },
        ]
        : [];

    const renderContent = () => {
        if (!selectedNodeID) {
            return (
                <p className={CSS.Empty}>
                    No block selected. Select a block to see attribute-specific settings.
                </p>
            );
        }

        if (!isAttributeEditable) {
            return (
                <p className={CSS.Empty}>
                    The selected block's element does not support attribute customization.
                </p>
            );
        }

        return (
            <div className={CSS.Layout}>
                <TabGroup items={tabItems} />
            </div>
        );
    };

    return <div className={CSS.BlockAttribute}>{renderContent()}</div>;
};

export default BlockAttribute;
