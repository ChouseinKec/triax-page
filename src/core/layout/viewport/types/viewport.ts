import { ComponentType } from 'react';

// Types
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

/**
 * Unique identifier for the Viewport
 * Must be unique across all registered Viewports.
 * Used to reference the Viewport in the application.
 */
export type ViewportID = string;

/**
 * Title of the Viewport
 */
export type ViewportTitle = string;

/**
 * Registry mapping workbench IDs to their viewport definitions
 */
export type ViewportDefinitionRecord = Record<WorkbenchKey, ViewportDefinition>;

/**
 * Props for the main component to render for the Workbench
 */
export type ViewportComponentProps = {};

/**
 * The main component to render for the Workbench
 */
export type ViewportComponent = ComponentType<ViewportComponentProps>;

/**
 * Defines the structure for viewport configurations in the page builder.
 * Viewports provide different editing contexts and toolsets.
 */
export interface ViewportDefinition {
	/** Unique identifier for the Viewport */
	id: ViewportID;
	/** Title of the Viewport */
	title: ViewportTitle;
	/** ID of the Workbench the Viewport belongs to */
	workbenchKey: WorkbenchKey;
	/** Main React component for the Viewport (optional) */
	component: ViewportComponent;
}
