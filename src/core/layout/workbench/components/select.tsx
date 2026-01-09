"use client";
import React, { useMemo } from "react";

// Managers
import { useSelectedWorkbenchKey, setSelectedWorkbenchID } from "@/src/core/layout/page/managers/";

// Components
import RadioSelect from "@/src/shared/components/select/radio/component";

// Registry
import { getRegisteredWorkbenchs } from "@/src/core/layout/workbench/registries";

/**
 * WorkbenchSelect Component
 * Renders a radio select component for choosing the active workbench.
 *
 * @returns The rendered workbench selector component
 */
const WorkbenchSelect: React.FC = () => {
    const workbenchDefinitions = getRegisteredWorkbenchs();
    const selectedWorkbenchKey = useSelectedWorkbenchKey();

    // Prepare options for the workbench selector
    const workbenchOptions = useMemo(() => {
        return Object.values(workbenchDefinitions).map((workbench) => ({
            name: workbench.title,
            value: workbench.key,
            icon: workbench.icon,
            order: workbench.order,
        })).sort((a, b) => a.order - b.order);
    }, [workbenchDefinitions]);

    return (
        <RadioSelect
            value={selectedWorkbenchKey}
            options={workbenchOptions}
            onChange={setSelectedWorkbenchID}
            prioritizeIcons
            clearable={false}
        />
    );
};

export default WorkbenchSelect;
