"use client";
import React, { useMemo } from "react";

// Managers
import { useSelectedWorkbenchID } from "@/src/page-builder/services/managers/page/queries";
import { setSelectedWorkbenchID } from "@/src/page-builder/services/managers/page/commands";
import { useWorkbenchs } from "@/src/page-builder/services/managers/workbench";

// Components
import RadioSelect from "@/src/shared/components/select/radio/component";

/**
 * WorkbenchSelect Component
 * Renders a radio select component for choosing the active workbench.
 *
 * @returns The rendered workbench selector component
 */
const WorkbenchSelect: React.FC = () => {
    const workbenchs = useWorkbenchs();
    const selectedWorkbench = useSelectedWorkbenchID();

    // Prepare options for the workbench selector
    const workbenchOptions = useMemo(() => {
        return Object.values(workbenchs).map((workbench) => ({
            name: workbench.title,
            value: workbench.id,
            icon: workbench.icon,
            order: workbench.order,
        })).sort((a, b) => a.order - b.order);
    }, [workbenchs]);

    return (
        <RadioSelect
            value={selectedWorkbench}
            options={workbenchOptions}
            onChange={setSelectedWorkbenchID}
            prioritizeIcons
        />
    );
};

export default WorkbenchSelect;
