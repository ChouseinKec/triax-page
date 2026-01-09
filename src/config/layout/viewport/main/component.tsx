"use client";
import React, { memo, useState, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Block from "@/src/config/layout/viewport/main/instance";
import OrientationSelect from "./orientation-select";
import PseudoSelect from "./pseudo-select";
import DeviceSelect from "./device-select";
import ActionGroup from "@/src/shared/components/group/action/component";

// Managers
import { useBlock } from "@/src/core/block/instance/managers";
import { getDefaultOrientationID, getDefaultPseudoID } from "@/src/core/layout/page/managers";

// Registries
import { getRegisteredDevices, getRegisteredOrientation, getRegisteredPseudo } from "@/src/core/layout/page/registries";
// Types
import type { DeviceInstance } from '@/src/core/layout/page/types';

/**
 * ViewportMainComponent
 * Renders the main viewport UI with devices grouped by category.
 * @returns ReactElement
 */
const ViewportMainComponent: React.FC = () => {
    const rootBlock = useBlock('body');
    const allDevices = useMemo(() => Object.values(getRegisteredDevices()), []);

    const defaultActiveIDs = allDevices.slice(0, 3).map(d => d.id);

    const [activeDeviceIDs, setActiveDeviceIDs] = useState<string[]>(defaultActiveIDs);

    const [deviceOrientations, setDeviceOrientations] = useState<Record<string, string>>({});
    const [devicePseudos, setDevicePseudos] = useState<Record<string, string>>({});

    const categorizedDevices = useMemo(() => {
        const result: Record<string, string[]> = {};
        activeDeviceIDs.forEach(deviceID => {
            const device = getRegisteredDevices()[deviceID];
            const category = device?.category || 'unknown';
            if (!result[category]) result[category] = [];

            result[category].push(deviceID);
        });
        return result;
    },
        [activeDeviceIDs]
    );

    const sortedDevices = useMemo(() => {
        return Object.entries(categorizedDevices).sort(([a, deviceIDsA], [b, deviceIDsB]) => {
            const minWidthA = Math.min(...deviceIDsA.map(id => allDevices.find(d => d.id === id)?.template?.width || Infinity));
            const minWidthB = Math.min(...deviceIDsB.map(id => allDevices.find(d => d.id === id)?.template?.width || Infinity));
            return minWidthA - minWidthB;
        });
    }, [categorizedDevices, allDevices]
    );

    // Helper function to calculate device dimensions based on orientation
    const getDeviceDimensions = (device: DeviceInstance | undefined, orientationValue: string | undefined) => {
        const baseWidth = device?.template?.width || 1920;
        const baseHeight = device?.template?.height || 1080;
        let deviceWidth: number;
        let deviceHeight: number;
        switch (orientationValue) {
            case 'all':
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

    // Component to render a single device
    const DeviceItem: React.FC<{ deviceID: string }> = ({ deviceID }) => {
        const device = getRegisteredDevices()[deviceID];
        const orientationID = deviceOrientations[deviceID] || getDefaultOrientationID();
        const pseudoID = devicePseudos[deviceID] || getDefaultPseudoID();
        const orientation = getRegisteredOrientation(orientationID);
        const orientationValue = orientation?.value;

        const { width: deviceWidth, height: deviceHeight } = getDeviceDimensions(device, orientationValue);

        return (
            <div key={deviceID} className={CSS.Device} style={{ width: `${deviceWidth}px`, height: `${deviceHeight}px` }}>
                <div className={CSS.Header}>
                    <ActionGroup>
                        <OrientationSelect value={orientationID} onChange={(value) => setDeviceOrientations(prev => ({ ...prev, [deviceID]: value }))} />
                        <PseudoSelect value={pseudoID} onChange={(value) => setDevicePseudos(prev => ({ ...prev, [deviceID]: value }))} />
                    </ActionGroup>
                </div>
                {rootBlock && <Block key={rootBlock.id} blockID={rootBlock.id} />}
            </div>
        );
    };

    return (
        <>
            <div className={CSS.Toolbar}>
                <ActionGroup>
                    <DeviceSelect value={activeDeviceIDs} onChange={(value) => setActiveDeviceIDs(value as string[])} />
                </ActionGroup>
            </div>

            <div className={CSS.Devices}>
                {sortedDevices.map(([category, deviceIDs]) => (
                    <div key={category} className={CSS.Category}>

                        <p>{category}</p>

                        {deviceIDs.map((deviceID) => (
                            <DeviceItem key={deviceID} deviceID={deviceID} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

ViewportMainComponent.displayName = "ViewportMainComponent";

export default memo(ViewportMainComponent);