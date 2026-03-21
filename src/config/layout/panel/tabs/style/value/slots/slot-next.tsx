"use client";
import React from "react";

// Types
import type { SlotNextProps } from "./types";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";
import RadioSelect from "@/shared/components/select/radio/component";

const SlotNext: React.FC<SlotNextProps> = ({ options, onChange }) => {
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
                className="SlotNext"
                options={options}
                onChange={handleChange}
                placeholder="..."
                forcePlaceholder={true}
                groupable={true}
                searchable={true}
                multiselectable={false}
                value=""
            />
    );
};

SlotNext.displayName = "SlotNext";
export default SlotNext;
