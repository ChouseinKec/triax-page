"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedWorkbenchID } from "@/src/page/service/managers/page";
import { useWorkbenchs } from "@/src/page/service/managers/workbench";

// Types
import { WorkbenchDefinition } from "@/src/page/core/workbench/types";

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
    const workbenchs = useWorkbenchs();
    const selectedWorkbench = useSelectedWorkbenchID();
    const currentWorkbench = workbenchs[selectedWorkbench];

    if (!selectedWorkbench || !workbenchs[selectedWorkbench]) {
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