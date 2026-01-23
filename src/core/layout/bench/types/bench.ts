import { ReactNode, ReactElement, ComponentType } from 'react';

/**
 * Unique identifier for the BenchEditor
 * Must be unique across all registered BenchEditors.
 * Used to reference the BenchEditor in the application.
 */
export type BenchKey = string;

/**
 * Title of the BenchEditor
 */
export type BenchName = string;

/**
 * Icon of the BenchEditor, displayed in the UI
 */
export type BenchIcon = string | ReactElement | ReactNode;

/**
 * Order of the BenchEditor in the selection list
 */
export type BenchOrder = number;

/**
 * Registry of all BenchEditors by their ID.
 */
export type BenchRegistry = Record<BenchKey, BenchDefinition>;

/**
 * Props for the main component to render for the BenchEditor
 */
export type BenchComponentProps = {};

/**
 * The main component to render for the BenchEditor
 */
export type BenchComponent = ComponentType<BenchComponentProps>;

/**
 * Defines the structure for workbench configurations in the page builder.
 * BenchEditores provide different editing contexts and toolsets.
 */
export interface BenchDefinition {
	/** Unique identifier for the BenchEditor	 */
	key: BenchKey;
	/** Name of the BenchEditor */
	name: BenchName;
	/** Icon of the BenchEditor, displayed in the UI */
	icon: BenchIcon;
	/** Order of the BenchEditor in the selection list */
	order: BenchOrder;
	/** The main component to render for the BenchEditor */
	component: BenchComponent;
}

/**
 * Record type for storing multiple BenchDefinitions keyed by their BenchKey.
 */
export type RegisteredBenches = Record<BenchKey, BenchDefinition>;
