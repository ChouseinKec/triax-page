import React from "react";
import WorkbenchSelect from "@/src/page-builder/ui/actions/workbench/select";

/**
 * Workbench Select Action Instance
 * Defines the action for selecting workbenches in the page editor.
 */
export const WorkbenchSelectAction = {
    id: "workbench-select",
    order: 10,
    render: () => <WorkbenchSelect />,
};
