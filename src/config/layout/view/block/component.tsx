"use client";
import React, { memo, useMemo } from "react";
import { createPortal } from "react-dom";

// Types
import type { ViewComponentProps } from '@/core/layout/view/types';

// Styles
import CSS from "./styles.module.scss";

// Components
import Device from "./device";
import ActionGroup from "@/shared/components/group/action/component";
import TagSelect from "./tag-select";

// Managers
import { useData } from "@/core/layout/view/managers";
import { useSelectedDefinitionKey } from "@/core/block/node/managers";
import { getDeviceDefinitions, getDeviceDefinition } from "@/core/layout/page/managers/queries/device";

// Queries
import { getActionDefinitions } from "@/core/block/node/managers/queries/action";

/**
 * ViewBlockComponent
 * Renders the main viewport UI with devices grouped by category.
 * Displays multiple device previews, sorted by width and category priority.
 */
const ViewBlockComponent: React.FC<ViewComponentProps> = ({ actionContainerRef }) => {
    // Fetch active device IDs from viewport data
    const activeDeviceIDs = useData('block', 'activeDeviceIDs') as string[] || [];

    // Get selected node for actions
    const selectedNodeKey = useSelectedDefinitionKey();

    // Get actions for the selected node
    const nodeActions = selectedNodeKey ? getActionDefinitions(selectedNodeKey) : [];

    // Memoize the list of all registered devices for performance
    const allDevices = useMemo(() => {
        return getDeviceDefinitions()
    },
        []
    );

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
            const device = getDeviceDefinition(deviceKey);
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
        <>
            {actionContainerRef.current && createPortal(
                <div className={CSS.Toolbar}>
                    <TagSelect />
                    <span className={CSS.Divider} />

                    <ActionGroup>
                        {nodeActions.map((action) => (
                            <action.component key={action.key} />
                        ))}
                    </ActionGroup>
                </div>,
                actionContainerRef.current
            )}

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
        </>
    );
};

ViewBlockComponent.displayName = "ViewBlockComponent";
export default memo(ViewBlockComponent);