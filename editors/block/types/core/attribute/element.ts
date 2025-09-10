import type { AttributeKeys } from './attribute';

/**
 * All supported HTML element tags.
 * Includes container and text elements supported by the editor.
 */
export type ElementTags =
	// Container tags
	| 'div'
	| 'section'
	| 'article'
	| 'aside'
	| 'nav'

	// Text tags
	| 'p'
	| 'span'
	| 'b'
	| 'strong'
	| 'i'
	| 'em'
	| 'u'
	| 'small'
	| 'mark'
	| 'sub'
	| 'sup'
	| 'code'
	| 'abbr'
	| 's'
	| 'del'
	| 'ins'
	| 'q'
	| 'cite'
	| 'dfn';

/**
 * Definition of an HTML element, including its attributes and allowed content.
 * These correspond to the official HTML specifications.
 */
export interface ElementDefinition {
	/** Array of supported attributes for this element */
	attributes: AttributeKeys[];
	/** Array of allowed child element tags, null for any content */
	allowedContent: ElementTags[] | null;
	/** Human-readable description of the element */
	description: string;
}
