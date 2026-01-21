"use client";
import React, { useMemo } from "react";

// Managers
import { getDeviceDefinitions } from "@/core/layout/page/managers";
import { useData, setData } from "@/core/layout/viewport/managers";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";



const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
    <path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z" />
</svg>;

/**
 * DeviceSelect Component
 * Renders a Dropdown select component for choosing the active device.
 *
 * @returns The rendered device selector component
 */
const DeviceSelect: React.FC = () => {
    const allDevices = useMemo(() => getDeviceDefinitions().map(device => ({
        name: device.name,
        value: device.key,
        category: device.category,
        hidden: device.hidden,
    })),
        []
    );

    const activeDeviceIDs = useData('block', 'activeDeviceIDs') as string[] || [];


    const handleChange = (value: string[]) => {
        // Ensure 'default' is included if not already present
        if (!value.includes('default')) value = [...value, 'default'];

        setData('block', 'activeDeviceIDs', value);
    }

    return (
        <DropdownSelect
            key={'device-select'}
            searchable={true}
            groupable={true}
            placeholder={icon}
            forcePlaceholder={true}
            options={allDevices}
            value={activeDeviceIDs}
            multiselectable={true}
            onChange={handleChange}
            closeOnSelect={false}
        />
    )
};

export default DeviceSelect;
