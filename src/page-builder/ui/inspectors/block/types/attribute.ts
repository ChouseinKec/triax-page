import { ReactElement, CSSProperties } from 'react';

// Types
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { BlockID } from '@/src/page-builder/core/block/block/types';

/**
 * Props for the block attribute editor component.
 *
 * Root component in the attributes editor hierarchy.
 */
export interface BlockAttributesProps {}

/**
 * Props for the attributes editor layouts container
 * (handles multiple layout configurations).
 *
 * Second level in hierarchy: BlockAttributes -> Layouts.
 */
export interface BlockAttributesLayoutsProps {}

/**
 * Props for a single attributes editor layout
 * (defines structure for one layout instance).
 *
 * Third level in hierarchy: BlockAttributes -> Layouts -> Layout.
 */
export interface BlockAttributesLayoutProps {
	/** Label to display for the editor */
	label: string | ReactElement;
	/** Title of the attribute editor */
	title: string;
	/** Groups of attributes to display */
	groups: BlockAttributesGroupProps[];
}

/**
 * Props for an attribute category component.
 * Represents a collection of attribute groups.
 *
 * Fourth level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category.
 */
export interface BlockAttributesCategoryProps {
	/** Groups of attributes in this category */
	groups: BlockAttributesGroupProps[];
}

/**
 * Props for an attribute group component.
 * Represents a collapsible group of related attributes.
 *
 * Fifth level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category -> Group.
 */
export interface BlockAttributesGroupProps {
	/** Whether the group should be hidden */
	hidden?: boolean;
	/** Properties/attributes in this group */
	properties: BlockAttributesPropertyProps[];
	/** Whether the group can be expanded/collapsed */
	isExpandable?: boolean;
	/** Title for the divider between groups */
	dividerTitle?: string;
	/** Custom styles for the group */
	styles?: React.CSSProperties;
}

/**
 * Props for an individual attribute property component.
 * Defines how a single attribute should be displayed and edited.
 *
 * Sixth level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category -> Group -> Property.
 */
export interface BlockAttributesPropertyProps {
	/** Label for the property */
	label: string | null;
	/** Whether the property should be hidden */
	hidden?: boolean;
	/** Whether the property is disabled */
	disabled?: boolean;
	/** The HTML attribute key this property represents */
	property?: AttributeKey;
	/** Custom styles for the property */
	styles?: CSSProperties;
	/** Component function to render the property editor */
	component: () => React.ReactNode;
}

/**
 * Props for attribute value components.
 * Base interface for components that edit attribute values.
 *
 * Seventh level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category -> Group -> Property -> Value.
 */
export interface BlockAttributesValueProps {
	/** ID of the block being edited */
	blockID: BlockID;
	/** Name of the attribute being edited */
	attribute: AttributeKey;
}
