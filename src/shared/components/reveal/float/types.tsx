export type Anchor = "top" | "bottom" | "left" | "right";
export interface FloatRevealProps {
    /** Reference to the target element that triggers the float */
    targetRef: React.RefObject<HTMLElement | null>;

    /** Content to display in the floating element */
    children: React.ReactNode;

    /** Preferred position relative to the target element */
    anchor?: Anchor;

    /** Controls whether the float is visible (required for controlled behavior) */
    isOpen: boolean;

    /** Whether to automatically close on outside clicks or Escape key */
    autoClose?: boolean;

    /** Whether to close the float when Escape key is pressed */
    closeOnEscape?: boolean;

    /** Optional class name for custom styling */
    className?: string;

    /** Callback function when visibility state changes (for auto-close) */
    onVisibilityChange?: (isVisible: boolean) => void;
}