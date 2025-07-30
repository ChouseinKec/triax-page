import { LayoutProps } from '@/editors/style/components/layout/components/property/types';

/**
 * Represents a group of style properties in the layout editor.
 * Each group can define its grid layout and visibility state.
 */
export type LayoutGroup = {
    /** Optional flag indicating whether the group should be hidden. */
    hidden?: boolean;
    /** An array of style properties within this group. */
    properties: LayoutProps[];
    /** Optional flag indicating whether the group is expandable. */
    isExpandable?: boolean;
    /** Optional title for the expandable group. */
    dividerTitle?: string;
    /** Optional CSS styles to apply to the group container. */
    styles?: React.CSSProperties;
};
