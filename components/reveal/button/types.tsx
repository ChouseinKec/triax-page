import { ReactNode } from 'react';
export type ButtonRevealProps = {
    /** The content to be revealed */
    children: ReactNode | null | undefined;

    /**Title for the expand section */
    title: string;

    /** Optional icon to display alongside the title */
    icon: ReactNode | null | undefined;

    /** Optional className for the component */
    className?: string;

    /** Optional flag to indicate if the button is selected */
    isSelected?: boolean;

    /** Optional variation for the button style */
    variation?: "primary" | "secondary";

    /** Optional click handler for the button */
    onButtonClick?: () => void;

    /** Optional click handler for the arrow icon */
    onArrowClick?: () => void;
};
