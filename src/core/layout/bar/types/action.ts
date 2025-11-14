import { ReactNode } from 'react';

/**
 * Unique identifier for a bar action
 */
export type BarActionID = string;

/**
 * Display title of a bar action
 */
export type BarActionTitle = string;

/**
 * Order value for sorting bar actions within a bar
 */
export type BarActionOrder = number;

/**
 * Render function for a bar action content
 */
export type BarActionRender = () => ReactNode;

/**
 * Represents an action within a LayoutBar.
 * This defines the structure of an action that can be registered in a LayoutBar.
 * This is used to render the content of the LayoutBar.
 */
export interface BarActionInstance {
    /** Unique identifier for the action */
    id: BarActionID;
    /** Title of the action */
    title: BarActionTitle;
    /** Priority of the action, used for sorting */
    order: BarActionOrder;
    /** Content of the action */
    render: BarActionRender;
}

/**
 * Record of all bar actions by their ID.
 */
export type BarActionRecord = Record<BarActionID, BarActionInstance>;

