export type Position = "top" | "bottom" | "left" | "right";
export type Role = 'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'group' | 'region';
export interface FloatRevealProps {
    /** Reference to the target element that triggers the float */
    targetRef: React.RefObject<HTMLElement | null>;

    /** Content to display in the floating element */
    children: React.ReactNode;

    /** Preferred position relative to the target element */
    position?: Position;

    /** External control override (undefined = hover controlled, boolean = parent controlled) */
    isOpen?: boolean;

    /** Delay for hover show/hide transitions in milliseconds */
    hoverDelay?: number;

    /** Whether to close the float when Escape key is pressed */
    closeOnEscape?: boolean;

    /** ARIA role for the floating element */
    role?: Role;

    /** ARIA label for the floating element */
    ariaLabel?: string;

    /** Whether the float is modal (traps focus) */
    ariaModal?: boolean;

    /** Callback function when visibility state changes */
    onVisibilityChange?: (isVisible: boolean) => void;
}