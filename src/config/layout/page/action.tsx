// Types
import { ActionDefinition } from "@/core/layout/page/types";
import { registerActions } from '@/core/layout/page/registries';


/**
 * Workbench Select Action Instance
 * Defines the action for selecting workbenches in the page editor.
 */
export const CoreActions: ActionDefinition[] = [];

// Register actions directly
registerActions(CoreActions);
