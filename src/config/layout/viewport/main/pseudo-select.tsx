"use client";
import React from "react";

// Managers
import { getAllPseudos } from "@/src/core/layout/page/managers";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";

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
    const allPseudos = getAllPseudos().filter(pseudo => !pseudo.hidden);
    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
        <path d="M168,132.69,214.08,115l.33-.13A16,16,0,0,0,213,85.07L52.92,32.8A15.95,15.95,0,0,0,32.8,52.92L85.07,213a15.82,15.82,0,0,0,14.41,11l.78,0a15.84,15.84,0,0,0,14.61-9.59l.13-.33L132.69,168,184,219.31a16,16,0,0,0,22.63,0l12.68-12.68a16,16,0,0,0,0-22.63ZM195.31,208,144,156.69a16,16,0,0,0-26,4.93c0,.11-.09.22-.13.32l-17.65,46L48,48l159.85,52.2-45.95,17.64-.32.13a16,16,0,0,0-4.93,26h0L208,195.31Z" />
    </svg>

    return (
        <DropdownSelect
            key={value}
            searchable={true}
            groupable={true}
            placeholder={icon}
            forcePlaceholder={true}
            options={allPseudos}
            value={value}
            onChange={onChange}
        />
    );
};

export default PseudoSelect;
