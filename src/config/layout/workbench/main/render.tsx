"use client";
import { useEffect, memo, useCallback } from "react";

// Managers
import { registerBarAction, unregisterBarAction } from "@/src/core/layout/bar/managers";

// Components
import DeviceSelect from "@/src/config/shared/component/device-select";
import OrientationSelect from "@/src/config/shared/component/orientation-select";
import PseudoSelect from "@/src/config/shared/component/pseudo-select";

// Styles
import CSS from "./styles.module.scss";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const WorkbenchMainRender: React.FC = () => {
    const renderDeviceSelect = useCallback(() => <DeviceSelect />, []);
    const renderOrientationSelect = useCallback(() => <OrientationSelect />, []);

    useEffect(() => {
        const barID = "workbenchmain-actions";
        const deviceActionID = "workbenchmain-select-device";
        const orientationActionID = "workbenchmain-select-orientation";
        const pseudoActionID = "workbenchmain-select-pseudo";

        registerBarAction(barID, {
            id: deviceActionID,
            title: 'Device Select',
            order: 5,
            render: renderDeviceSelect,
        });

        registerBarAction(barID, {
            id: orientationActionID,
            title: 'Orientation Select',
            order: 10,
            render: renderOrientationSelect,
        });

        registerBarAction(barID, {
            id: pseudoActionID,
            title: 'Pseudo Select',
            order: 15,
            render: () => <PseudoSelect />,
        });

        // Cleanup: unregister bar action on unmount
        return () => {
            unregisterBarAction(barID, deviceActionID);
            unregisterBarAction(barID, orientationActionID);
            unregisterBarAction(barID, pseudoActionID);
        };

    }, [renderDeviceSelect, renderOrientationSelect]
    );

    return (
        <div className={CSS.WorkbenchMain} />
    );
}

export default memo(WorkbenchMainRender);