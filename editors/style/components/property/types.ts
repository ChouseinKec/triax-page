import type { CSSProperties } from '@/types/style/property';

/**
 * Represents a single layout property within the style editor.
 * This type defines the structure of a layout property, including its label,
 * alignment, grid position, visibility, and the component used to render it.
 * It is used to create a consistent interface for layout properties in the style editor.
 */
export interface LayoutProps {
	/** The label for the property, displayed in the UI */
	label: string | null;
	/** The alignment of the label in the UI */
	labelAlign?: string;
	/** The grid column position for the property in the layout */
	column?: string;
	/** The grid row position for the property in the layout */
	row?: string;
	/** The direction of the property in the layout (e.g., 'horizontal', 'vertical') */
	direction?: string;
	/** Whether the property is hidden in the UI */
	hidden?: boolean;
	/** Whether the property is disabled in the UI */
	disabled?: boolean;
	/** The CSS property associated with this layout property */
	property?: CSSProperties;
	/** The component that renders the property in the UI */
	component: () => React.ReactNode;
}

export interface LayoutContentProps {
	/** The component to render within the layout */
	component: () => React.ReactNode;
	/** The label for the property, displayed in the UI */
	label: string | null;
	/** The CSS property associated with this layout property */
    property?: CSSProperties;
}
