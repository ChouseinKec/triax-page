import type { HTMLPropertyKey } from './attribute/property';

/**
 * All valid HTML block-level tags supported by the system.
 * These correspond to official HTML tags (e.g. 'div', 'p', 'section').
 */
export type HTMLElementTag =
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
export interface HTMLElementDefinition {
	attributes: HTMLPropertyKey[];
	allowedContent: HTMLElementTag[] | null;
	description: string;
}
