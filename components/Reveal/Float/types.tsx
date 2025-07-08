/**
 * Props for the FloatReveal component.
 * Defines the expected properties for a floating reveal element.
 */
export type Position = "top" | "bottom" | "left" | "right";

export interface FloatRevealProps {
    /** Reference to the target element that triggers the float */
    targetRef: React.RefObject<HTMLElement | null>;

    /** Preferred position relative to the target element */
    position?: Position;

    /** Content to display in the floating element */
    children: React.ReactNode;

    /** External control override (undefined = hover controlled, boolean = parent controlled) */
    isOpen?: boolean;

    /** Delay for hover show/hide transitions in milliseconds */
    hoverDelay?: number;

    /** Whether to close the float when Escape key is pressed */
    closeOnEscape?: boolean;

    /** Callback function when visibility state changes */
    onVisibilityChange?: (isVisible: boolean) => void;

    /** ARIA role for the floating element */
    role?: 'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'group' | 'region';

    /** ARIA label for the floating element */
    ariaLabel?: string;

    /** Whether the float is modal (traps focus) */
    ariaModal?: boolean;
}