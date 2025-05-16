import { STYLE_PROPERTY } from '@/editors/style/layout/components/property/typse';

/**
 * Represents a group of style properties in the layout editor.
 * Each group can define its grid layout and visibility state.
 *
 * @param {string} [columns] - Optional CSS grid column configuration for the group layout.
 * @param {string} [rows] - Optional CSS grid row configuration for the group layout.
 * @param {boolean} [hidden] - Optional flag indicating whether the group should be hidden.
 * @param {STYLE_PROPERTY[]} properties - An array of style properties within this group.
 */
export type STYLE_LAYOUT_GROUP = {
    columns?: string;
    rows?: string;
    hidden?: boolean;
    properties: STYLE_PROPERTY[];
};
