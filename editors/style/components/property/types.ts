import type { CSSProperties } from '@/types/style/property';
import type { CSSProperties as OfficialCSSProperties } from 'react';
/**
 * Represents a single layout property within the style editor.
 * This type defines the structure of a layout property, including its label,
 * alignment, grid position, visibility, and the component used to render it.
 * It is used to create a consistent interface for layout properties in the style editor.
 */
export interface LayoutProps {
	/** The label for the property, displayed in the UI */
	label: string | null;
	/** The grid column position for the property in the layout */
	column?: string;
	/** The grid row position for the property in the layout */
	row?: string;
	/** Whether the property is hidden in the UI */
	hidden?: boolean;
	/** Whether the property is disabled in the UI */
	disabled?: boolean;
	/** The CSS property associated with this layout property */
	property?: CSSProperties;
	/** The CSS styles applied to the property in the UI */
	styles?: OfficialCSSProperties;
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
