"use client";
import React from "react";

// Constants
import { DEFAULT_ORIENTATION_ID } from "@/src/page-builder/core/page/constants/defaults";

// Managers
import { getAllOrientations, useSelectedOrientationID, setSelectedOrientationID } from "@/src/page-builder/services/managers/page";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";

/**
 * OrientationSelect Component
 * Renders a Dropdown select component for choosing the active orientation.
 *
 * @returns The rendered orientation selector component
 */
const OrientationSelect: React.FC = () => {
    const allOrientations = getAllOrientations();
    const selectedOrientationID = useSelectedOrientationID() || DEFAULT_ORIENTATION_ID;
    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
        <path d="M205.66,221.66l-24,24a8,8,0,0,1-11.32-11.32L180.69,224H80a24,24,0,0,1-24-24V104a8,8,0,0,1,16,0v96a8,8,0,0,0,8,8H180.69l-10.35-10.34a8,8,0,0,1,11.32-11.32l24,24A8,8,0,0,1,205.66,221.66ZM80,72a8,8,0,0,0,5.66-13.66L75.31,48H176a8,8,0,0,1,8,8v96a8,8,0,0,0,16,0V56a24,24,0,0,0-24-24H75.31L85.66,21.66A8,8,0,1,0,74.34,10.34l-24,24a8,8,0,0,0,0,11.32l24,24A8,8,0,0,0,80,72Z" />
    </svg>

    return (
        <DropdownSelect
            key={selectedOrientationID}
            searchable={true}
            groupable={true}
            placeholder={icon}
            forcePlaceholder={true}
            options={allOrientations}
            value={selectedOrientationID}
            onChange={(value) => setSelectedOrientationID(value)}
        />
    );
};

export default OrientationSelect;

