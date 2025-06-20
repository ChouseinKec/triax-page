import { LayoutProps } from '@/editors/style/components/property/types';

/**
 * Represents a group of style properties in the layout editor.
 * Each group can define its grid layout and visibility state.
 *
 * @param {string} [columns] - Optional CSS grid column configuration for the group layout.
 * @param {string} [rows] - Optional CSS grid row configuration for the group layout.
 * @param {boolean} [hidden] - Optional flag indicating whether the group should be hidden.
 * @param {LayoutProps[]} properties - An array of style properties within this group.
 */
export type LayoutGroup = {
    columns?: string;
    rows?: string;
    hidden?: boolean;
    properties: LayoutProps[];
};
