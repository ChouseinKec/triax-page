/**
 * Props for the FloatReveal component.
 * 
 * @param {React.ReactNode} children - Content to be revealed when expanded
*/
export type Position = "top" | "bottom" | "left" | "right";


export interface FloatRevealProps {
    targetRef: React.RefObject<HTMLElement | null>;
    position?: Position;
    children: React.ReactNode;
    style?: React.CSSProperties;
    isOpen?: boolean; // Parent-controlled state
}