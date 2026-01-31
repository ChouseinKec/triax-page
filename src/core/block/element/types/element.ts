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
 * Record of element tags that can only appear a limited number of times as children.
 */
export type ElementUniqueChildren = Partial<Record<ElementKey, number>>;

/**
 * Array of element tag groups that must appear in a specific order.
 */
export type ElementOrderedChildren = ElementKey[][];

/**
 * Array of element tags that cannot appear as ancestors.
 */
export type ElementForbiddenAncestors = ElementKey[];

/**
 * Array of allowed attribute keys for an element.
 */
export type ElementAllowedAttributes = AttributeKey[];

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
	/** Record of element tags that can only appear a limited number of times as children, null if no restrictions */
	uniqueChildren: ElementUniqueChildren | null;
	/** Array of element tag groups that must appear in a specific order, null if no ordering required */
	orderedChildren: ElementOrderedChildren | null;
	/** Array of element tags that cannot appear as ancestors, null if no restrictions */
	forbiddenAncestors: ElementForbiddenAncestors | null;
	
	/** Whether the element's styles can be edited by users */
	isStyleEditable?: boolean;
	/** Whether the element's attributes can be edited by users */
	isAttributeEditable?: boolean;
	/** Whether the element can be deleted by users */
	isDeletable?: boolean;
	/** Whether the element can be cloned by users */
	isElementCloneable?: boolean;
	/** Whether the element can be copied by users */
	isElementCopyable?: boolean;
	/** Whether the element can be reordered by dragging or moving */
	isOrderable?: boolean;

}

/**
 * Record mapping element tags to their definitions.
 */
export type RegisteredElements = Record<ElementKey, ElementDefinition>;
