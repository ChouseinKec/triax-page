import { ReactElement, CSSProperties } from 'react';

// Types
import type { StyleKeys, StyleDefinition, StyleOptionDefinition } from '@/src/page-builder/core/block/style/types';
import type { OptionDefinition } from '@/src/shared/components/types/option';

/**
 * Props for the block style editor component.
 */
export interface BlockStylesProps {}

export interface BlockStylesLayoutsProps {}

/**
 * Props for the style editor layout component.
 * Defines the structure and content of the style editor.
 */
export type BlockStylesLayoutProps = {
	/** Label to display for the editor */
	label: string | ReactElement;
	/** Title of the style editor */
	title: string;
	/** Groups of styles to display */
	groups: BlockStylesGroupProps[];
};

/**
 * Props for style category components.
 * Groups related style properties by category.
 */
export type BlockStylesCategoryProps = {
	/** Groups of styles in this category */
	groups: BlockStylesGroupProps[];
};

/**
 * Props for a style group component.
 * Represents a collapsible group of related style properties.
 */
export type BlockStylesGroupProps = {
	/** Whether the group should be hidden */
	hidden?: boolean;
	/** Style properties in this group */
	properties: BlockStylesPropertyProps[];
	/** Whether the group can be expanded/collapsed */
	isExpandable?: boolean;
	/** Title for the divider between groups */
	dividerTitle?: string;
	/** Custom styles for the group */
	styles?: React.CSSProperties;
};

/**
 * Props for an individual style property component.
 * Defines how a single CSS property should be displayed and edited.
 */
export interface BlockStylesPropertyProps {
	/** Label for the property */
	label: string | null;
	/** Whether the property should be hidden */
	hidden?: boolean;
	/** Whether the property is disabled */
	disabled?: boolean;
	/** The CSS property key this property represents */
	property?: StyleKeys;
	/** Custom styles for the property */
	styles?: CSSProperties;
	/** Component function to render the property editor */
	component: () => React.ReactNode;
}

/**
 * Props for style value components.
 * Base interface for components that edit style values.
 */
export interface BlockStylesValue {
	/** Current value of the style property */
	value: string;

	/** The CSS property definition as an object */
	property: StyleDefinition;

	/** Callback when the value changes */
	onChange: (value: string) => void;
}

/**
 * Props for color style value editor components.
 */
export type BlockStylesValueColorProps = {
	/** Current color value */
	value: string;
	/** Callback when the color changes */
	onChange: (value: string) => void;
};

/**
 * Props for dimension style value editor components.
 * Used for properties like width, height, margin, padding.
 */
export type BlockStylesValueDimensionProps = {
	/** Current dimension value */
	value: string;
	/** Available unit options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};

/**
 * Props for function style value editor components.
 * Used for CSS functions like calc(), var(), etc.
 */
export type BlockStylesValueFunctionProps = {
	/** Current function value */
	value: string;
	/** Available function options */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};

/**
 * Props for integer style value editor components.
 * Used for properties that require integer values.
 */
export type BlockStylesValueIntegerProps = {
	/** Current integer value as string */
	value: string;
	/** Minimum allowed value */
	minValue?: number;
	/** Maximum allowed value */
	maxValue?: number;
	/** Available options for the value */
	options?: StyleOptionDefinition[];
	/** Whether to enforce strict integer validation */
	isStrict?: boolean;
	/** Callback when the value changes */
	onChange: (value: string) => void;
};

/**
 * Props for keyword style value editor components.
 * Used for CSS keyword values like 'auto', 'none', 'inherit'.
 */
export type BlockStylesValueKeywordProps = {
	/** Current keyword value */
	value: string;
	/** Available keyword options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};

/**
 * Props for link style value editor components.
 * Used for URL-based properties.
 */
export type BlockStylesValueLinkProps = {
	/** Current URL value */
	value: string;
	/** Callback when the URL changes */
	onChange: (value: string) => void;
};

/**
 * Props for number style value editor components.
 * Used for numeric CSS properties.
 */
export type BlockStylesValueNumberProps = {
	/** Current numeric value as string */
	value: string;
	/** Available number options */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
	/** Whether to force integer values only */
	forceInteger?: boolean;
};

/**
 * Props for slot style value editor components.
 * Used for properties with multiple configurable parts.
 */
export type BlockStylesSlotProps = {
	/** Current slot value */
	value: string;
	/** Available options for the slot */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};

/**
 * Props for multiple slot style value editor components.
 * Used for properties with multiple configurable slots.
 */
export type BlockStylesSlotsProps = {
	/** Current slot values */
	values: string[];
	/** Available options for each slot */
	options: StyleOptionDefinition[][];
	/** Callback when the values change */
	onChange: (values: string[]) => void;
};
