import type { ComponentType, ReactNode } from 'react';
import type { BenchKey } from '@/core/layout/bench/types';

/**
 * Unique identifier for the ViewEditor
 * Must be unique across all registered ViewEditors.
 * Used to reference the ViewEditor in the application.
 */
export type ViewKey = string;

/**
 * Title of the ViewEditor
 */
export type ViewTitle = string;

/**
 * Props for the main component to render for the BenchEditor
 */
export type ViewComponentProps = {};

/**
 * The main component to render for the BenchEditor
 */
export type ViewComponent = ComponentType<ViewComponentProps>;

/**
 *  Icon representation for the ViewEditor
 */
export type ViewIcon = ReactNode;

/**
 * Defines the structure for viewport configurations in the page builder.
 * ViewEditors provide different editing contexts and toolsets.
 */
export interface ViewDefinition {
	/** Unique identifier for the ViewEditor */
	key: ViewKey;
	/** Associated workbench key */
	benchKey: BenchKey;
	/**  Icon representation for the ViewEditor */
	icon: ViewIcon;
	/** Title of the ViewEditor */
	title: ViewTitle;
	/** Main React component for the ViewEditor (optional) */
	component: ViewComponent;
}

/**
 * Registry mapping workbench IDs to their viewport definitions
 */
export type RegisteredViews = Record<ViewKey, ViewDefinition>;
