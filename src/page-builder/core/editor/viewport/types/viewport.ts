import { ReactNode } from 'react';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Unique identifier for the Viewport
 *
 * Must be unique across all registered Viewports.
 *
 * Used to reference the Viewport in the application.
 *
 * Example: "block", "behaviour"
 */
export type ViewportID = 'block';

/**
 * Title of the Viewport
 */
export type ViewportTitle = string;

/**
 * Registry mapping workbench IDs to their viewport definitions
 */
export type ViewportRegistry = Record<WorkbenchID, ViewportDefinition>;

/**
 * Function that renders the viewport component
 */
export type ViewportRender = () => ReactNode;

/**
 * Defines the structure for viewport configurations in the page builder.
 *
 * Viewports provide different editing contexts and toolsets.
 */
export interface ViewportDefinition {
	/** Unique identifier for the Viewport */
	id: ViewportID;
	/** Title of the Viewport */
	title: ViewportTitle;
	/** ID of the Workbench the Viewport belongs to */
	workbenchID: WorkbenchID;
	/** Main React component for the Viewport (optional) */
	render: ViewportRender;
}
