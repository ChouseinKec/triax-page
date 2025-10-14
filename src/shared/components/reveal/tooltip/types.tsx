import { Anchor } from "@/src/shared/components/reveal/float/types";

/** Props for the TooltipReveal component */
export interface TooltipRevealProps {
    /** Reference to the target element that triggers the tooltip */
    targetRef: React.RefObject<HTMLElement | null>;
    /** Content to display in the tooltip */
    children: React.ReactNode;
    /** Preferred position relative to the target element */
    anchor?: Anchor;
    /** Delay for hover show/hide transitions in milliseconds */
    hoverDelay?: number;
    /** Optional class name for custom styling */
    className?: string;
}