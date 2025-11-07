"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockRender from "./block";

// Managers
import { useBlock } from "@/src/page-builder/services/managers/block";
import { useSelectedDevice, useSelectedOrientation } from "@/src/page-builder/services/managers/page";

/**
 * BlockEditor Component
 * Renders the main block editor UI and registers block-related tabs to the layout LayoutPanels.
 * @param props - BlockEditorProps
 * @returns ReactElement
 */
const BlockView: React.FC = () => {
    const rootBlock = useBlock('body');
    const selectedDevice = useSelectedDevice();
    const selectedOrientation = useSelectedOrientation();
    
    // Format device info: Device-Name (widthxheight) Orientation
    const deviceName = selectedDevice?.value === 'all' ? 'Default' : (selectedDevice?.name || 'Default');
    const deviceWidth = selectedDevice?.template?.width || 'w';
    const deviceHeight = selectedDevice?.template?.height || 'h';
    const orientationName = selectedOrientation?.value === 'all' ? 'none' : (selectedOrientation?.name || 'none');
    const deviceInfo = `${deviceName} (${deviceWidth}x${deviceHeight}) - ${orientationName}`;

    return (
        <div className={CSS.BlockView}>
            <div className={CSS.Header}>
                {deviceInfo}
            </div>

            {rootBlock && <BlockRender key={rootBlock.id} blockID={rootBlock.id} />}
            
        </div>
    );
};

export default memo(BlockView);