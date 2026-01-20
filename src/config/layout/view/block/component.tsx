"use client";
import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Device from "./device";

// Managers
import { useData } from "@/src/core/layout/viewport/managers";

// Registries
import { getRegisteredDevices } from "@/src/core/layout/page/registries";

/**
 * ViewComponentBlock
 * Renders the main viewport UI with devices grouped by category.
 * Displays multiple device previews, sorted by width and category priority.
 */
const ViewComponentBlock: React.FC = () => {
    // Fetch active device IDs from viewport data
    const activeDeviceIDs = useData('block', 'activeDeviceIDs') as string[] || [];

    // Memoize the list of all registered devices for performance
    const allDevices = useMemo(() => Object.values(getRegisteredDevices()), []);

    // Sort active device IDs by width (descending) for consistent ordering
    const sortedActiveDeviceIDs = useMemo(() => {
        return [...activeDeviceIDs].sort((a, b) => {
            const deviceA = allDevices.find(d => d.key === a);
            const deviceB = allDevices.find(d => d.key === b);
            const widthA = deviceA?.template?.width || 0;
            const widthB = deviceB?.template?.width || 0;
            return widthB - widthA; // Descending: biggest first
        });
    }, [activeDeviceIDs, allDevices]
    );

    // Group devices by category for organized display
    const categorizedDevices = useMemo(() => {
        const result: Record<string, string[]> = {};
        sortedActiveDeviceIDs.forEach(deviceKey => {
            const device = getRegisteredDevices()[deviceKey];
            const category = device?.category || 'unknown';
            if (!result[category]) result[category] = [];

            result[category].push(deviceKey);
        });
        return result;
    },
        [sortedActiveDeviceIDs]
    );

    // Sort categories with 'default' first, then by minimum width
    const sortedDevices = useMemo(() => {
        return Object.entries(categorizedDevices).sort(([a, deviceKeysA], [b, deviceKeysB]) => {
            if (a === 'default') return -1;
            if (b === 'default') return 1;
            const minWidthA = Math.min(...deviceKeysA.map(key => allDevices.find(d => d.key === key)?.template?.width || Infinity));
            const minWidthB = Math.min(...deviceKeysB.map(key => allDevices.find(d => d.key === key)?.template?.width || Infinity));
            return minWidthB - minWidthA;
        });
    }, [categorizedDevices, allDevices]
    );

    return (
        <div className={CSS.Devices}>
            {
                sortedDevices.map(([category, deviceIDs]) => (

                    <div key={category} className={CSS.Category}>

                        {deviceIDs.map((deviceKey) => {
                            return (
                                <Device
                                    key={deviceKey}
                                    deviceKey={deviceKey}
                                />
                            );
                        })}

                    </div>

                ))
            }

        </div>
    );
};

ViewComponentBlock.displayName = "ViewComponentBlock";
export default memo(ViewComponentBlock);