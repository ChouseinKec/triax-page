"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedBlockNodeID } from "@/core/block/node/managers";
import { useSelectedBlockAttributeIsEditable, useSelectedBlockAttributesAllowed } from "@/core/block/attribute/managers";

// Components
import TabGroup from "@/shared/components/group/tab/component";

// Renderers
import { renderGlobalTab } from "./tabs/global";
import { renderAccessibilityTab } from "./tabs/accessibility";
import { renderElementTab } from "./tabs/element";

// Tab icons object
const TAB_ICONS = {
    global: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
        </svg>
    ),
    accessibility: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z" />
        </svg>
    ),
    element: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
        </svg>
    ),
};

const BlockAttribute: React.FC = () => {
    const selectedNodeID = useSelectedBlockNodeID();
    const isAttributeEditable = useSelectedBlockAttributeIsEditable();
    const allowedAttributes = useSelectedBlockAttributesAllowed();

    const tabItems = selectedNodeID
        ? [
            { label: TAB_ICONS.element, title: 'Element', content: renderElementTab(selectedNodeID) },
            { label: TAB_ICONS.global, title: 'Global', content: renderGlobalTab(selectedNodeID) },
            { label: TAB_ICONS.accessibility, title: 'Accessibility', content: renderAccessibilityTab(selectedNodeID) },
        ]
        : [];

    const renderContent = () => {
        if (!isAttributeEditable) {
            return (
                <p className={CSS.Empty}>
                    The selected block-node's element does not support attribute customization.
                </p>
            );
        }

        if (!allowedAttributes || allowedAttributes.length === 0) {
            return (
                <p className={CSS.Empty}>
                    The selected block-node does not have any attributes available for customization.
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
