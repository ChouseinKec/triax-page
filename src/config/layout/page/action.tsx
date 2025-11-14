import React from "react";
import WorkbenchSelect from "@/src/config/shared/component/workbench-select";

/**
 * Workbench Select Action Instance
 * Defines the action for selecting workbenches in the page editor.
 */
export const WorkbenchSelectAction = {
    id: "workbench-select",
    order: 10,
    render: () => <WorkbenchSelect />,
};
