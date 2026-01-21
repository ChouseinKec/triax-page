// Types
import type { PanelKey } from '@/core/layout/panel/types';
import type { ReactNode, ComponentType } from 'react';

/**
 * Unique identifier for a panel tab
 */
export type TabKey = string;

/**
 * Display title of a panel tab
 */
export type TabTitle = string;

/**
 * Icon component or element for a panel tab
 */
export type TabIcon = ReactNode;

/**
 * React component to render as panel tab content
 */
export type TabComponent = ComponentType;

/**
 * Order value for sorting panel tabs within a panel
 */
export type TabOrder = number;

/**
 * Interface for panel tab definition used in the layout system.
 * Defines the structure and properties of a panel tab.
 * This is used to register panel tabs in the panel context.
 */
export interface TabDefinition {
	/** Unique identifier for the panel tab */
	key: TabKey;
	/** ID of the panel this tab belongs to */
	panelKey: PanelKey;
	/** Display title of the panel tab */
	title: TabTitle;
	/** Icon component or element for the panel tab */
	icon: TabIcon;
	/** React component to render as the tab content */
	component: TabComponent;
	/** Order of the panel tab within its panel, used for sorting */
	order: TabOrder;
}

/**
 * Record of all tabs by their ID.
 */
export type TabDefinitionRecord = Record<TabKey, TabDefinition>;
