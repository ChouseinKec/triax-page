// Types
import { ActionDefinition } from "@/src/core/layout/page/types";

// Component
import WorkbenchSelect from "@/src/core/layout/workbench/components/select";

/**
 * Workbench Select Action Instance
 * Defines the action for selecting workbenches in the page editor.
 */
export const CoreActions: ActionDefinition[] = [
    {
        id: "workbench-select",
        order: 10,
        component: WorkbenchSelect
    }
];
