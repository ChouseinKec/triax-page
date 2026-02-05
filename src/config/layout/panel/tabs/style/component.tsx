"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedBlockNodeID } from "@/core/block/node/managers";
import { useSelectedBlockNodeIsStyleEditable } from "@/core/block/node/managers";


// Components
import TabGroup from "@/shared/components/group/tab/component";

// Renderers
import { renderDisplayTab } from "./tabs/display";
import { renderSizeTab } from "./tabs/size";
import { renderFontTab } from "./tabs/font";
import { renderBackgroundTab } from "./tabs/background";
import { renderBorderTab } from "./tabs/border";
import { renderEffectTab } from "./tabs/effect";

// Tab icons object
const TAB_ICONS = {
    display: (
        <svg aria-label="Display & Layout Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" />
        </svg>
    ),
    size: (
        <svg aria-label="Size & Overflow Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M136,112H48a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V120A8,8,0,0,0,136,112Zm-8,88H56V128h72Zm88-16v16a16,16,0,0,1-16,16H176a8,8,0,0,1,0-16h24V184a8,8,0,0,1,16,0Zm0-72v32a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm0-56V72a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h16A16,16,0,0,1,216,56Zm-64-8a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,48ZM40,80V56A16,16,0,0,1,56,40H72a8,8,0,0,1,0,16H56V80a8,8,0,0,1-16,0Z" />
        </svg>
    ),
    font: (
        <svg aria-label="Font & Text Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M60.59,175.24a8,8,0,0,0,10.65-3.83L87.9,136h80.2l16.66,35.41a8,8,0,1,0,14.48-6.82l-64-136a8,8,0,0,0-14.48,0l-64,136A8,8,0,0,0,60.59,175.24ZM128,50.79,160.57,120H95.43ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Z" />
        </svg>
    ),
    background: (
        <svg aria-label="Background & Mask Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
        </svg>
    ),
    border: (
        <svg aria-label="Border & Outline Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M200,80v32a8,8,0,0,1-16,0V88H160a8,8,0,0,1,0-16h32A8,8,0,0,1,200,80ZM96,168H72V144a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z" />
        </svg>
    ),
    effect: (
        <svg aria-label="Effects Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path fill="black" d="M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z" />
        </svg>
    ),
};

/**
 * StyleInspector Component
 *
 * The main style inspector panel that displays CSS property controls for the currently selected block in the page builder.
 * Conditionally renders comprehensive style editing interface or informative fallback when no block is selected.
 * Serves as the primary interface for visual block customization and property management.
 *
 * @returns Rendered style inspector panel with block-specific controls or selection prompt
 *
 * @note Relies on block selection state to determine which style controls to display
 */
const StyleInspector: React.FC = () => {
    const selectedNodeID = useSelectedBlockNodeID();
    const isStyleable = useSelectedBlockNodeIsStyleEditable();

    // Define tabs with renderers
    const tabItems = selectedNodeID
        ? [
            { label: TAB_ICONS.display, title: "Display & Layout", content: renderDisplayTab(selectedNodeID) },
            { label: TAB_ICONS.size, title: "Size & Position", content: renderSizeTab(selectedNodeID) },
            { label: TAB_ICONS.font, title: "Font & Text", content: renderFontTab(selectedNodeID) },
            { label: TAB_ICONS.background, title: "Background & Mask", content: renderBackgroundTab(selectedNodeID) },
            { label: TAB_ICONS.border, title: "Border & Outline", content: renderBorderTab(selectedNodeID) },
            { label: TAB_ICONS.effect, title: "Effects", content: renderEffectTab(selectedNodeID) },
        ]
        : [];

    const renderContent = () => {
        if (!selectedNodeID) {
            return (
                <p className={CSS.Empty}>
                    No block selected. Select a block to see style-specific settings.
                </p>
            );
        }

        if (!isStyleable) {
            return (
                <p className={CSS.Empty}>
                    The selected block's element does not support style customization.
                </p>
            );
        }

        return (
            <div className={CSS.Layout}>
                <TabGroup items={tabItems} />
            </div>
        )
    };
    return <div className={CSS.StyleInspector}>{renderContent()}</div>;
};

export default StyleInspector;