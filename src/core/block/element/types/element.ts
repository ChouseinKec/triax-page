import type { AttributeKey } from '@/src/core/block/attribute/types';

/**
 * All supported HTML element tags.
 */
export type ElementTag = 'body' | 'div' | 'section' | 'article' | 'aside' | 'nav' | 'p' | 'span' | 'b' | 'strong' | 'i' | 'em' | 'u' | 'small' | 'mark' | 'sub' | 'sup' | 'code' | 'abbr' | 's' | 'del' | 'ins' | 'q' | 'cite' | 'dfn';

/**
 * Description of an HTML element.
 */
export type ElementDescription = string;

/**
 * Definition of an HTML element, including its attributes and allowed content.
 * These correspond to the official HTML specifications.
 */
export interface ElementDefinition {
	/** Array of supported attributes for this element */
	attributes: AttributeKey[];
	/** Array of allowed child element tags, null for any content */
	allowedContent: ElementTag[] | null;
	/** Human-readable description of the element */
	description: ElementDescription;
}
