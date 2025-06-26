import { LayoutProps } from '@/editors/style/components/property/types';

/**
 * Represents a group of style properties in the layout editor.
 * Each group can define its grid layout and visibility state.
 */
export type LayoutGroup = {
    /** Optional CSS grid column configuration for the group layout. */
    columns?: string;
    /** Optional CSS grid row configuration for the group layout. */
    rows?: string;
    /** Optional flag indicating whether the group should be hidden. */
    hidden?: boolean;
    /** An array of style properties within this group. */
    properties: LayoutProps[];
    /** Optional flag indicating whether the group is expandable. */
    isExpandable?: boolean;
};
