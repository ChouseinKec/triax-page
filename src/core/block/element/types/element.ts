import type { AttributeKey } from '@/core/block/attribute/types';

/**
 * All supported HTML element tags.
 */
export type ElementKey = string;

/**
 * Description of an HTML element.
 */
export type ElementDescription = string;

/**
 * Array of element tags that cannot appear as ancestors.
 */
export type ElementForbiddenAncestors = ElementKey[];

/**
 * Array of allowed attribute keys for an element.
 */
export type ElementAllowedAttributes = AttributeKey[];

export type ElementStructure = {
	/** The HTML element tag that this constraint applies to */
	key: ElementKey;
	/** Ordering constraint: number = required position (0=first, 1=second, etc.), null = any order allowed */
	order: number | null;
	/** Minimum number of this element that must be present (0 = optional) */
	min: number;
	/** Maximum number of this element allowed (null = unlimited) */
	max: number | null;
};

/**
 * Definition of an HTML element, including its attributes and allowed content.
 * These correspond to the official HTML specifications.
 */
export interface ElementDefinition {
	/** The HTML tag for this element */
	key: ElementKey;
	/** Human-readable description of the element */
	description: ElementDescription;

	/** Array of supported attributes for this element */
	allowedAttributes: ElementAllowedAttributes;
	/** Array of allowed child element tags, null for any content */
	allowedChildren: ElementKey[] | null;
	/** Array of element tags that cannot appear as ancestors, null if no restrictions */
	forbiddenAncestors: ElementForbiddenAncestors | null;

	structure: ElementStructure[] | null;

	/** Whether the element's styles can be edited by users */
	isStyleEditable?: boolean;
	/** Whether the element's attributes can be edited by users */
	isAttributeEditable?: boolean;
}

/**
 * Record mapping element tags to their definitions.
 */
export type RegisteredElements = Record<ElementKey, ElementDefinition>;
