import { ReactNode } from 'react';

/** Represents a single tab item with a title and collapsible content. */
export type TabProps = {
    /** The label for the tab, displayed in the tab header */
    label: string | ReactNode;
    /** The title of the tab, displayed in the tab header */
    title: string;
    /** The content to display within the tab */
    content: ReactNode;
};
