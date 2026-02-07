"use client";
import React, { useMemo, useState, useEffect, useCallback, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Block from "@/config/layout/view/block/block";
import OrientationSelect from "./orientation-select";
import PseudoSelect from "./pseudo-select";
import ActionGroup from "@/shared/components/group/action/component";

// Managers
import { useBlockNode } from "@/core/block/node/managers";
import { getDeviceDefinition, getOrientationDefinition, getDefaultOrientationKey, getDefaultPseudoKey, useIsDeviceSelected } from "@/core/layout/page/managers";
import { setSelectedDeviceKey, setSelectedOrientationKey, setSelectedPseudoKey } from "@/core/layout/page/managers";

// Types
import type { DeviceDefinition } from '@/core/layout/page/types';

interface DeviceProps {
    deviceKey: string;
}

/**
 * Calculates device dimensions based on definition and orientation.
 * @param device - The device definition object
 * @param orientationValue - The orientation key ('default', 'landscape', etc.)
 * @returns Object with width and height
 */
const getDeviceDimensions = (device: DeviceDefinition | undefined, orientationValue: string | undefined) => {
    const baseWidth = device?.template?.width || 1920;
    const baseHeight = device?.template?.height || 1080;
    let deviceWidth: number;
    let deviceHeight: number;
    switch (orientationValue) {
        case 'default':
            deviceWidth = baseWidth;
            deviceHeight = baseHeight;
            break;
        case 'landscape':
            deviceWidth = Math.max(baseWidth, baseHeight);
            deviceHeight = Math.min(baseWidth, baseHeight);
            break;
        default:
            deviceWidth = Math.min(baseWidth, baseHeight);
            deviceHeight = Math.max(baseWidth, baseHeight);
            break;
    }
    return { width: deviceWidth, height: deviceHeight };
};

/**
 * Device Component
 * Renders a single device viewport with controls and content.
 * Handles device selection, orientation/pseudo changes, and displays the block tree.
 */
const Device: React.FC<DeviceProps> = ({ deviceKey }) => {
    // Local state for orientation and pseudo selections
    const [orientationKey, setOrientationKey] = useState(getDefaultOrientationKey());
    const [pseudoKey, setPseudoKey] = useState(getDefaultPseudoKey());

    // Check if this device is currently selected
    const isDeviceSelected = useIsDeviceSelected(deviceKey);

    // Fetch the root block for this device
    const rootBlock = useBlockNode('html');

    // Handle device selection on click
    const handleClick = useCallback((e: React.MouseEvent) => {
        if (isDeviceSelected) return;

        setSelectedDeviceKey(deviceKey);
        setSelectedOrientationKey(orientationKey);
        setSelectedPseudoKey(pseudoKey);
    }, [isDeviceSelected, deviceKey, orientationKey, pseudoKey]
    );

    // Sync orientation and pseudo state when device selection changes
    useEffect(() => {
        if (isDeviceSelected) {
            setSelectedOrientationKey(orientationKey);
            setSelectedPseudoKey(pseudoKey);
        }
    }, [isDeviceSelected, orientationKey, pseudoKey]
    );

    // Memoize device and orientation definitions for performance
    const device = useMemo(() => getDeviceDefinition(deviceKey), [deviceKey]);
    const orientation = useMemo(() => getOrientationDefinition(orientationKey), [orientationKey]);
    const dimensions = useMemo(() => getDeviceDimensions(device, orientation?.key), [device, orientation?.key]);


    return (
        <div className={`${CSS.Device} device-${deviceKey}`} data-is-selected={isDeviceSelected} style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }} onClickCapture={handleClick}>

            <div className={CSS.Header}>
                <span className={CSS.Title}>{`${deviceKey} (${dimensions.width}x${dimensions.height})`}</span>
                <ActionGroup>
                    <OrientationSelect value={orientationKey} onChange={setOrientationKey} />
                    <PseudoSelect value={pseudoKey} onChange={setPseudoKey} />
                </ActionGroup>
            </div>

            {/* Render the root block if available */}
            {
                rootBlock
                    ? <Block key={rootBlock.id} nodeID={rootBlock.id} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} isDeviceSelected={isDeviceSelected} />
                    : null
            }
        </div>
    );
};

Device.displayName = "Device";

export default memo(Device);