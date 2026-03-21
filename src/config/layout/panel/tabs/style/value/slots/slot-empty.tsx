"use client";
import React from "react";

// Types
import type { SlotEmptyProps } from "./types";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";
import RadioSelect from "@/shared/components/select/radio/component";

const SlotEmpty: React.FC<SlotEmptyProps> = ({ options, onChange }) => {
    const isRadio = options.every(option => !!option.icon);

    const handleChange = (value: string) => {
        const token = options.find(o => o.value === value)?.token;
        if (!token) return;
        onChange(token);
    };

    return (
        isRadio
            ? <RadioSelect
                options={options}
                multiselectable={false}
                onChange={handleChange}
                value=""
            />
            : <DropdownSelect
                options={options}
                onChange={(value: string) => handleChange(value)}
                searchable={true}
                groupable={true}
                multiselectable={false}
                value=""
            />
    );
};

SlotEmpty.displayName = "SlotEmpty";
export default SlotEmpty;
