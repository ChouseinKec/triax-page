"use client";
import React, { useMemo } from "react";

// Managers
import { getPseudoDefinitions, getDefaultPseudoKey } from "@/core/layout/page/managers";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

/**
 * PseudoSelect Component
 * Renders a Dropdown select component for choosing the active pseudo state.
 *
 * @param props - The props for the component
 */
const PseudoSelect: React.FC<Props> = ({ value, onChange }) => {
    const options = useMemo(() => getPseudoDefinitions().filter(pseudo => !pseudo.hidden).map(pseudo => ({
        name: pseudo.name,
        value: pseudo.key,
        hidden: pseudo.hidden,
    })), []
    );

    const defaultKey = useMemo(() => getDefaultPseudoKey(), []);


    const handleChange = (newValue: string) => {
        if (!newValue || newValue.trim().length === 0) newValue = defaultKey;

        onChange(newValue);
    }

    if (!value || value === defaultKey) return (
        <DropdownSelect
            key={"default-pseudo"}
            searchable={true}
            groupable={true}
            options={options}
            placeholder={"Pseudo"}
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

export default PseudoSelect;
