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
export type AttributeKey =
	// Global attributes
	| 'id'
	| 'class'
	| 'title'
	| 'lang'
	| 'dir'
	| 'tabIndex'
	| 'hidden'
	| 'autoFocus'
	| 'draggable'
	| 'contentEditable'
	| 'spellCheck'
	| 'accessKey'
	| 'popover'
	| 'inputMode'
	| 'inert'
	| 'enterKeyHint'
	| 'translate'
	| 'virtualkeyboardpolicy'
	| 'text'
	// ARIA attributes
	| 'role'
	| 'aria-label'
	| 'aria-labelledby'
	| 'aria-describedby'
	| 'aria-description'
	| 'aria-details'
	| 'aria-current'
	| 'aria-controls'
	| 'aria-hidden'
	| 'aria-live'
	| 'aria-atomic'
	| 'aria-busy'
	| 'aria-keyshortcuts'
	| 'aria-roledescription'
	| 'aria-activedescendant'
	| 'aria-autocomplete'
	| 'aria-busy'
	| 'aria-checked'
	| 'aria-colcount'
	| 'aria-colindex'
	| 'aria-colindextext'
	| 'aria-colspan'
	| 'aria-disabled'
	| 'aria-errormessage'
	| 'aria-expanded'
	| 'aria-flowto'
	| 'aria-haspopup'
	| 'aria-invalid'
	| 'aria-level'
	| 'aria-modal'
	| 'aria-multiline'
	| 'aria-multiselectable'
	| 'aria-orientation'
	| 'aria-owns'
	| 'aria-posinset'
	| 'aria-pressed'
	| 'aria-readonly'
	| 'aria-relevant'
	| 'aria-required'
	| 'aria-rowcount'
	| 'aria-rowindex'
	| 'aria-rowindextext'
	| 'aria-rowspan'
	| 'aria-selected'
	| 'aria-setsize'
	| 'aria-sort'
	| 'aria-valuemax'
	| 'aria-valuemin'
	| 'aria-valuenow'
	| 'aria-valuetext'
	// Schema attributes
	| 'itemid'
	| 'itemprop'
	| 'itemref'
	| 'itemscope'
	| 'itemtype'
	// Element-specific attributes
	| 'cite'
	| 'datetime'
	| 'href'
	| 'src'
	| 'alt'
	| 'type'
	| 'name'
	| 'value'
	| 'placeholder'
	| 'disabled'
	| 'readonly'
	| 'required'
	| 'min'
	| 'max'
	| 'step'
	| 'pattern'
	| 'accept'
	| 'action'
	| 'method'
	| 'target'
	| 'rel'
	| 'download'
	| 'loading'
	| 'decoding'
	| 'sizes'
	| 'srcset'
	| 'width'
	| 'height'
	| 'controls'
	| 'autoplay'
	| 'loop'
	| 'muted'
	| 'poster'
	| 'preload'
	| 'for'
	| 'form'
	| 'formaction'
	| 'formmethod'
	| 'multiple'
	| 'selected'
	| 'cols'
	| 'rows'
	| 'wrap'
	| 'open'
	| 'reversed'
	| 'start'
	| 'colspan'
	| 'rowspan'
	| 'headers'
	| 'scope'
	| 'checked'
	| 'maxlength'
	| 'minlength'
	| 'autocomplete'
	| 'autofocus'
	| 'list'
	| 'size'
	| 'label'
	| 'high'
	| 'low'
	| 'optimum'
	| 'kind'
	| 'srclang'
	| 'default'
	| 'media'
	| 'as'
	| 'crossorigin'
	| 'referrerpolicy'
	| 'fetchpriority'
	| 'blocking';

/**
 * Categories for organizing HTML attributes.
 */
export type AttributeCategories = 'global' | 'accessibility' | 'schema' | 'element' | 'custom';

/**
 * The description of an HTML attribute.
 */
export type AttributeDescription = string;

/**
 *  Value type for HTML attributes.
 */
export type AttributeValue = string;

/**
 * Complete definition of an HTML attribute.
 * Includes name, syntax, description, and category information.
 */
export interface AttributeDefinition {
	/** The attribute name/key */
	name: AttributeKey;
	/** Syntax definition for the attribute's values */
	syntax: AttributeSyntaxes;
	/** Human-readable description of the attribute */
	description: AttributeDescription;
	/** Category for organizing the attribute */
	category: AttributeCategories;
}

export type AttributeRecord = Record<AttributeKey, AttributeDefinition>;
