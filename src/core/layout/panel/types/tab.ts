import { ReactNode } from 'react';

// Types
import type { PanelID } from '@/src/core/layout/panel/types';


/**
 * Unique identifier for a panel tab
 */
export type PanelTabID = string;

/**
 * Display title of a panel tab
 */
export type PanelTabTitle = string;

/**
 * Icon component or element for a panel tab
 */
export type PanelTabIcon = ReactNode;

/**
 * React component to render as panel tab content
 */
export type PanelTabComponent = React.ComponentType;

/**
 * Order value for sorting panel tabs within a panel
 */
export type PanelTabOrder = number;

/**
 * Interface for panel tab definition used in the layout system.
 * Defines the structure and properties of a panel tab.
 * This is used to register panel tabs in the panel context.
 */
export interface PanelTabDefinition {
    /** Unique identifier for the panel tab */
    id: PanelTabID;
    /** ID of the panel this tab belongs to */
    panelID: PanelID;
    /** Display title of the panel tab */
    title: PanelTabTitle;
    /** Icon component or element for the panel tab */
    icon: PanelTabIcon;
    /** React component to render as the tab content */
    component: PanelTabComponent;
    /** Order of the panel tab within its panel, used for sorting */
    order: PanelTabOrder;
}

/**
 * Represents a tab within a LayoutPanel.
 * This defines the structure of a tab that can be registered in a LayoutPanel.
 * This is used to render the content of the LayoutPanel.
 */
export interface PanelTabInstance {
    /** Unique identifier for the tab */
    id: PanelTabID;
    /** Title of the tab */
    title: PanelTabTitle;
    /** Content of the tab */
    render: () => PanelTabComponent;
    /** Icon for the tab, displayed in the LayoutPanel header */
    icon: () => PanelTabIcon;
    /** Priority of the tab, used for sorting */
    order: PanelTabOrder;
}

/**
 * Record of all tabs by their ID.
 */
export type PanelTabRecord = Record<PanelTabID, PanelTabInstance>;
