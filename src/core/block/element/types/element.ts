import type { AttributeKey } from '@/src/core/block/attribute/types';

/**
 * All supported HTML element tags.
 */
export type ElementTag =
	| 'body' //
	| 'main'
	| 'header'
	| 'footer'
	| 'address'
	| 'hgroup'
	| 'a'
	| 'button'
	| 'input'
	| 'select'
	| 'textarea'
	| 'label'
	| 'form'
	| 'fieldset'
	| 'legend'
	| 'option'
	| 'optgroup'
	| 'datalist'
	| 'output'
	| 'progress'
	| 'meter'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'pre'
	| 'blockquote'
	| 'figure'
	| 'figcaption'
	| 'ul'
	| 'ol'
	| 'li'
	| 'dl'
	| 'dt'
	| 'dd'
	| 'table'
	| 'thead'
	| 'tbody'
	| 'tfoot'
	| 'tr'
	| 'th'
	| 'td'
	| 'caption'
	| 'colgroup'
	| 'col'
	| 'img'
	| 'video'
	| 'audio'
	| 'iframe'
	| 'canvas'
	| 'source'
	| 'track'
	| 'picture'
	| 'object'
	| 'embed'
	| 'map'
	| 'area'
	| 'svg'
	| 'details'
	| 'summary'
	| 'dialog'
	| 'hr'
	| 'br'
	| 'div'
	| 'section'
	| 'article'
	| 'aside'
	| 'nav'
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
	| 'dfn'
	| 'var'
	| 'samp'
	| 'kbd'
	| 'time'
	| 'data'
	| 'wbr'
	| 'bdi'
	| 'bdo'
	| 'ruby'
	| 'rt'
	| 'rp';

/**
 * Description of an HTML element.
 */
export type ElementDescription = string;

/**
 * Record mapping element tags to their definitions.
 */
export type ElementRecord = Record<ElementTag, ElementDefinition>;

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
