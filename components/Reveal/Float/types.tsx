/**
 * Props for the FloatReveal component.
 * 
 * @param {React.ReactNode} children - Content to be revealed when expanded
*/
export type Position = "top" | "bottom" | "left" | "right";


export interface FLOAT_REVEAL {
    targetRef: React.RefObject<HTMLElement | null>; 
    position?: Position;
    children: React.ReactNode;
    className?: string;
}