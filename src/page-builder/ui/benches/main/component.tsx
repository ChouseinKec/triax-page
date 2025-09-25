"use client";
import { useCallback, useEffect, memo } from "react";

// Managers
import { getAllDevices, useSelectedDeviceID, setSelectedDeviceID } from "@/src/page-builder/services/managers/page";
import { registerBarAction, unregisterBarAction } from "@/src/page-builder/services/managers/layout/bar";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";

// Styles
import CSS from "./styles.module.scss";


/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const MainRender: React.FC = () => {
    const allDevices = getAllDevices();
    const selectedDeviceID = useSelectedDeviceID() || '';

    const renderDeviceSelect = useCallback(() => {
        const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z" /></svg>;

        return (
            <DropdownSelect
                key={selectedDeviceID}
                searchable={true}
                groupable={true}
                placeholder={icon}
                forcePlaceholder={true}
                options={allDevices}
                value={selectedDeviceID}
                onChange={(value) => setSelectedDeviceID(value)}
            />
        )
    }
        , [selectedDeviceID, setSelectedDeviceID, allDevices]
    );

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

    }, [renderDeviceSelect, registerBarAction, unregisterBarAction, selectedDeviceID]
    );

    return (
        <div className={CSS.WorkbenchMain} />
    );
}

export default memo(MainRender);