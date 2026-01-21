import type { ComponentType, ReactNode } from 'react';
import type { BenchKey } from '@/core/layout/workbench/types';

/**
 * Unique identifier for the Viewport
 * Must be unique across all registered Viewports.
 * Used to reference the Viewport in the application.
 */
export type ViewKey = string;

/**
 * Title of the Viewport
 */
export type ViewTitle = string;

/**
 * Props for the main component to render for the Workbench
 */
export type ViewComponentProps = {};

/**
 * The main component to render for the Workbench
 */
export type ViewComponent = ComponentType<ViewComponentProps>;

/**
 *  Icon representation for the Viewport
 */
export type ViewIcon = ReactNode;

/**
 * Defines the structure for viewport configurations in the page builder.
 * Viewports provide different editing contexts and toolsets.
 */
export interface ViewDefinition {
	/** Unique identifier for the Viewport */
	key: ViewKey;
	/** Associated workbench key */
	benchKey: BenchKey;
	/**  Icon representation for the Viewport */
	icon: ViewIcon;
	/** Title of the Viewport */
	title: ViewTitle;
	/** Main React component for the Viewport (optional) */
	component: ViewComponent;
}

/**
 * Registry mapping workbench IDs to their viewport definitions
 */
export type ViewDefinitionRecord = Record<ViewKey, ViewDefinition>;
