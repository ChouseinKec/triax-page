"use client";
import { useEffect, memo, useCallback } from "react";

// Managers
import { registerBarAction, unregisterBarAction } from "@/src/page-builder/services/managers/layout/bar";

// Components
import DeviceSelect from "@/src/page-builder/ui/actions/device";
import OrientationSelect from "@/src/page-builder/ui/actions/orientation";

// Styles
import CSS from "./styles.module.scss";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const MainRender: React.FC = () => {
    const renderDeviceSelect = useCallback(() => <DeviceSelect />, []);
    const renderOrientationSelect = useCallback(() => <OrientationSelect />, []);

    useEffect(() => {
        const barID = "workbenchmain-actions";
        const deviceActionID = "workbenchmain-select-device";
        const orientationActionID = "workbenchmain-select-orientation";

        registerBarAction(barID, {
            id: deviceActionID,
            title: 'DeviceDefinition Select',
            order: 5,
            render: renderDeviceSelect,
        });

        registerBarAction(barID, {
            id: orientationActionID,
            title: 'Orientation Select',
            order: 10,
            render: renderOrientationSelect,
        });

        // Cleanup: unregister bar action on unmount
        return () => {
            unregisterBarAction(barID, deviceActionID);
            unregisterBarAction(barID, orientationActionID);
        };

    }, [renderDeviceSelect, renderOrientationSelect]
    );

    return (
        <div className={CSS.WorkbenchMain} />
    );
}

export default memo(MainRender);