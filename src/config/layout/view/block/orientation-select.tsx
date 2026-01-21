"use client";
import React, { useMemo } from "react";

// Managers
import { getOrientationDefinitions, getDefaultOrientationKey } from "@/core/layout/page/managers";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";


interface Props {
    value: string;
    onChange: (value: string) => void;
}

/**
 * OrientationSelect Component
 * Renders a Dropdown select component for choosing the active orientation.
 *
 * @param props - The props for the component
 */
const OrientationSelect: React.FC<Props> = ({ value, onChange }) => {
    const options = useMemo(() => getOrientationDefinitions().filter(orientation => !orientation.hidden).map(orientation => ({
        name: orientation.name,
        value: orientation.key,
        hidden: orientation.hidden,
    })), []
    );

    const defaultKey = useMemo(() => getDefaultOrientationKey(), []);


    const handleChange = (value: string) => {
        if (!value || value.trim().length === 0) value = defaultKey;
        onChange(value);
    }

    if (!value || value === defaultKey) return (
        <DropdownSelect
            key={"default-orientation"}
            searchable={true}
            groupable={true}
            options={options}
            placeholder={"Orientation"}
            forcePlaceholder={true}
            value={""}
            onChange={handleChange}
        />
    )

    return (
        <DropdownSelect
            key={value}
            searchable={true}
            groupable={true}
            options={options}
            value={value}
            onChange={handleChange}
        />
    );
};

export default OrientationSelect;

