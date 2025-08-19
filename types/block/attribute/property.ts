import type { HTMLValueSyntax } from './value';

export type HTMLPropertyKey =
	| 'accessKey'
	| 'autoFocus'
	| 'class'
	| 'contentEditable'
	| 'dir'
	| 'draggable'
	| 'enterKeyHint'
	| 'hidden'
	| 'id'
	| 'inert'
	| 'inputMode'
	| 'itemid'
	| 'itemprop'
	| 'itemref'
	| 'itemscope'
	| 'itemtype'
	| 'lang'
	| 'popover'
	| 'spellCheck'
	| 'tabIndex'
	| 'title'
	| 'translate'

	// ARIA attributes
	| 'role'
	| 'aria-atomic'
	| 'aria-busy'
	| 'aria-controls'
	| 'aria-current'
	| 'aria-describedby'
	| 'aria-description'
	| 'aria-details'
	| 'aria-disabled'
	| 'aria-dropeffect'
	| 'aria-errormessage'
	| 'aria-flowto'
	| 'aria-grabbed'
	| 'aria-haspopup'
	| 'aria-hidden'
	| 'aria-invalid'
	| 'aria-keyshortcuts'
	| 'aria-label'
	| 'aria-labelledby'
	| 'aria-live'
	| 'aria-owns'
	| 'aria-relevant'
	| 'aria-roledescription'

	// Specific
	| 'cite'
	| 'datetime'

	// Custom for editor
	| 'text';

export type HTMLPropertyCategory = 'global' | 'accesibility' | 'schema' | 'specific' | 'custom';

export interface HTMLPropertyDefinition {
	name: HTMLPropertyKey;
	syntax: HTMLValueSyntax;
	description: string;
	category: HTMLPropertyCategory;
}
