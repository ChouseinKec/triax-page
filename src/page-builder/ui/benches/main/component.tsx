"use client";
import { useEffect, memo, useCallback } from "react";

// Managers
import { useSelectedDeviceID } from "@/src/page-builder/services/managers/page";
import { registerBarAction, unregisterBarAction } from "@/src/page-builder/services/managers/layout/bar";

// Components
import DeviceSelect from "@/src/page-builder/ui/actions/device";

// Styles
import CSS from "./styles.module.scss";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const MainRender: React.FC = () => {
    const selectedDeviceID = useSelectedDeviceID() || '';
    const renderDeviceSelect = useCallback(() => <DeviceSelect />, []);

    useEffect(() => {
        const barID = "workbenchmain-actions";
        const actionID = "workbenchmain-select-device";
        registerBarAction(barID, {
            id: actionID,
            title: 'DeviceDefinition Select',
            order: 5,
            render: renderDeviceSelect,
        });

        // Cleanup: unregister bar action on unmount
        return () => {
            unregisterBarAction(barID, actionID)
        };

    }, [renderDeviceSelect, selectedDeviceID]
    );

    return (
        <div className={CSS.WorkbenchMain} />
    );
}

export default memo(MainRender);