"use client";
import { useEffect, memo, useCallback } from "react";

// Types
import type { WorkbenchComponentProps } from "@/src/core/layout/workbench/types";

// Managers
import { registerBarAction, unregisterBarAction } from "@/src/core/layout/bar/managers";

// Components
import DeviceSelect from "@/src/config/layout/viewport/main/device-select";
import OrientationSelect from "@/src/config/layout/viewport/main/orientation-select";
import PseudoSelect from "@/src/config/layout/viewport/main/pseudo-select";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const WorkbenchMainComponent: React.FC<WorkbenchComponentProps> = ({ children }) => {
    const renderDeviceSelect = useCallback(() => <DeviceSelect />, []);
    const renderOrientationSelect = useCallback(() => <OrientationSelect />, []);

    useEffect(() => {
        // const barID = "workbenchmain-actions";
        // const deviceActionID = "workbenchmain-select-device";
        // const orientationActionID = "workbenchmain-select-orientation";
        // const pseudoActionID = "workbenchmain-select-pseudo";

        // registerBarAction(barID, {
        //     id: deviceActionID,
        //     title: 'Device Select',
        //     order: 5,
        //     render: renderDeviceSelect,
        // });

        // registerBarAction(barID, {
        //     id: orientationActionID,
        //     title: 'Orientation Select',
        //     order: 10,
        //     render: renderOrientationSelect,
        // });

        // registerBarAction(barID, {
        //     id: pseudoActionID,
        //     title: 'Pseudo Select',
        //     order: 15,
        //     render: () => <PseudoSelect />,
        // });


        // // Cleanup: unregister bar action on unmount
        // return () => {
        //     unregisterBarAction(barID, deviceActionID);
        //     unregisterBarAction(barID, orientationActionID);
        //     unregisterBarAction(barID, pseudoActionID);
        // };

    }, [renderDeviceSelect, renderOrientationSelect]
    );

    return (
        <>
            {children}
        </>
    );
}

export default memo(WorkbenchMainComponent);