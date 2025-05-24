import { ReactElement } from "react";

/**
 * Represents a single style property within a layout group.
 * Defines UI rendering details and display behavior for a style input component.
 *
 * @param {string | null} label - The label to display for the property, or null for no label.
 * @param {string} [labelAlign] - Optional alignment of the label (e.g., 'left', 'right', 'center').
 * @param {string} [column] - Optional CSS grid column placement for the property component.
 * @param {string} [row] - Optional CSS grid row placement for the property component.
 * @param {string} [direction] - Optional layout direction for internal elements (e.g., 'row', 'column').
 * @param {boolean} [hidden] - Optional flag to conditionally hide the property in the UI.
 * @param {boolean} [disabled] - Optional flag to disable interaction with the property.
 * @param {function} component - A function that returns the React component for rendering the style input.
 */
export type STYLE_PROPERTY = {
    label: string | null;
    labelAlign?: string;
    column?: string;
    row?: string;
    direction?: string;
    hidden?: boolean;
    disabled?: boolean;
    component: () => React.ReactNode;
};
