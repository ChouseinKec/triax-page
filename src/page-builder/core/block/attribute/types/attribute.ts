// Types
import { OptionDefinition } from '@/src/shared/components/types/option';

/**
 * Separator characters used in HTML attribute values.
 */
export type AttributeSeparators = ',' | ' ';

/**
 * Supported HTML attribute value types.
 */
export type AttributeTypes = 'list' | 'number' | 'boolean' | 'string';

/**
 * Syntax definition for list-type HTML attributes.
 * Attributes that accept multiple values from a predefined set.
 */
export type AttributeListSyntax = {
	/** Type identifier for list attributes */
	type: 'list';
	/** Available options for the attribute */
	options: OptionDefinition[];
	/** Separator character for multiple values */
	separator?: AttributeSeparators;
};

/**
 * Syntax definition for number-type HTML attributes.
 * Attributes that accept numeric values within a range.
 */
export type AttributeNumberSyntax = {
	/** Type identifier for number attributes */
	type: 'number';
	/** Minimum allowed value */
	min?: number;
	/** Maximum allowed value */
	max?: number;
};

/**
 * Syntax definition for radio-type HTML attributes.
 * Attributes that accept boolean or enumerated values.
 */
export type AttributeRadioSyntax = {
	/** Type identifier for radio attributes */
	type: 'radio';
	/** Available options (optional for boolean attributes) */
	options: OptionDefinition[];
};

/**
 * Syntax definition for string-type HTML attributes.
 * Attributes that accept arbitrary string values.
 */
export type AttributeStringSyntax = {
	/** Type identifier for string attributes */
	type: 'string';
};

/**
 * Union type for all HTML attribute syntax definitions.
 */
export type AttributeSyntaxes = AttributeListSyntax | AttributeNumberSyntax | AttributeRadioSyntax | AttributeStringSyntax;

/**
 * All supported HTML attribute keys.
 * Includes global, ARIA, and element-specific attributes.
 */
export type AttributeKeys = 'accessKey' | 'autoFocus' | 'class' | 'contentEditable' | 'dir' | 'draggable' | 'enterKeyHint' | 'hidden' | 'id' | 'inert' | 'inputMode' | 'itemid' | 'itemprop' | 'itemref' | 'itemscope' | 'itemtype' | 'lang' | 'popover' | 'spellCheck' | 'tabIndex' | 'title' | 'translate' | 'role' | 'aria-atomic' | 'aria-busy' | 'aria-controls' | 'aria-current' | 'aria-describedby' | 'aria-description' | 'aria-details' | 'aria-disabled' | 'aria-dropeffect' | 'aria-errormessage' | 'aria-flowto' | 'aria-grabbed' | 'aria-haspopup' | 'aria-hidden' | 'aria-invalid' | 'aria-keyshortcuts' | 'aria-label' | 'aria-labelledby' | 'aria-live' | 'aria-owns' | 'aria-relevant' | 'aria-roledescription' | 'cite' | 'datetime' | 'text';

/**
 * Categories for organizing HTML attributes.
 */
export type AttributeCategories = 'global' | 'accesibility' | 'schema' | 'specific' | 'custom';

/**
 * The description of an HTML attribute.
 */
export type AttributeDescription = string;

/**
 * Complete definition of an HTML attribute.
 * Includes name, syntax, description, and category information.
 */
export interface AttributeDefinition {
	/** The attribute name/key */
	name: AttributeKeys;
	/** Syntax definition for the attribute's values */
	syntax: AttributeSyntaxes;
	/** Human-readable description of the attribute */
	description: AttributeDescription;
	/** Category for organizing the attribute */
	category: AttributeCategories;
}
