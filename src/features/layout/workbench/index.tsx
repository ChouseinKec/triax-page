"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedWorkbenchID } from "@/src/core/layout/page/managers";
import { getWorkbenchInstance } from "@/src/core/layout/workbench/managers";

// Types
import { WorkbenchDefinition } from "@/src/core/layout/workbench/types";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

/**
 * WorkbenchWrapper Component
 * Wraps and renders a workbench definition with proper key handling for hook consistency.
 *
 * @param workbench - The workbench definition to render
 * @returns The rendered workbench component
 */
const Workbench: React.FC<{ workbench: WorkbenchDefinition }> = ({ workbench }) => {
    return workbench.render();
};

/**
 * WorkbenchEditor Component
 * Renders the workbench editor UI, including the current workbench and workbench selection actions.
 *
 * @returns The rendered workbench editor with selection controls
 */
const WorkbenchEditor: React.FC = () => {
    const selectedWorkbench = useSelectedWorkbenchID();
    const currentWorkbench = getWorkbenchInstance(selectedWorkbench);


    if (!selectedWorkbench || !currentWorkbench) {
        devLog.error("[WorkbenchEditor] No workbench found for the current selection.", { selectedWorkbenchID: selectedWorkbench });
        return null;
    }

    return (
        <div className={CSS.WorkbenchEditor}>
            <Workbench key={selectedWorkbench} workbench={currentWorkbench} />
        </div>
    );
};

export default memo(WorkbenchEditor);