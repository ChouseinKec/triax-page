/** Possible anchor positions for the floating element */
export type Anchor = "top" | "bottom" | "left" | "right";

/** Props for the FloatReveal component */
export interface FloatRevealProps {
    /** Reference to the target element that triggers the float */
    targetRef: React.RefObject<HTMLElement | null>;
    /** Content to display in the floating element */
    children: React.ReactNode;
    /** Controls whether the float is visible (required for controlled behavior) */
    isOpen: boolean;
    /** Preferred position relative to the target element */
    anchor?: Anchor;
    /** Optional offset in pixels from the target element */
    offset?: number;
    /** Whether to automatically close on outside clicks or Escape key */
    autoClose?: boolean;
    /** Whether to close the float when Escape key is pressed */
    closeOnEscape?: boolean;
    /** Optional class name for custom styling */
    className?: string;
    /** Callback function when visibility state changes (for auto-close) */
    onVisibilityChange?: (isVisible: boolean) => void;
}