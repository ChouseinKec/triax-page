import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { ElementTag } from '@/src/core/block/element/types';

// Core global attributes retained for basic elements
export const BASE_GLOBAL_ATTRIBUTES: AttributeKey[] = [
	'id', //
	'class',
	'title',
	'lang',
	'dir',
	'tabIndex',
	'hidden',
	'draggable',
	'contentEditable',
	'spellCheck',
	'accessKey',
	'inert',
	'translate',
];

// General (non-widget) ARIA attributes preserved
export const GENERAL_ARIA_ATTRIBUTES: AttributeKey[] = [
	'role', //
	'aria-label',
	'aria-labelledby',
	'aria-describedby',
	'aria-description',
	'aria-details',
	'aria-current',
	'aria-controls',
	'aria-hidden',
	'aria-live',
	'aria-atomic',
	'aria-busy',
	'aria-keyshortcuts',
	'aria-roledescription',
];

// Attributes specific to text-bearing inline elements
export const TEXT_ONLY_ATTRIBUTES: AttributeKey[] = ['text'];

// ============================================
// ATTRIBUTE PRESETS (element-specific)
// ============================================

// Links and interactive controls
export const LINK_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'href', 'target', 'rel', 'download', 'referrerpolicy', 'type'
];

export const BUTTON_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'type','disabled','name','value','form','formaction','formmethod'
];

export const INPUT_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'type','name','value','placeholder','disabled','readonly','required','min','max','step','pattern','accept','checked',
	'maxlength','minlength','autocomplete','autofocus','list','multiple','size','form'
];

export const SELECT_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'name','required','multiple','disabled','size','form','autocomplete','autofocus'
];

export const TEXTAREA_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'name','placeholder','required','disabled','readonly','maxlength','minlength','rows','cols','wrap','form','autocomplete','autofocus'
];

export const LABEL_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'for','form'
];

export const DETAILS_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'open'
];

export const DIALOG_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'open'
];

// Media and embedded
export const IMAGE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'alt','src','srcset','sizes','width','height','loading','decoding','crossorigin','referrerpolicy','fetchpriority'
];

export const IFRAME_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','name','referrerpolicy','loading','width','height'
];

export const CANVAS_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'width','height'
];

export const AUDIO_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','preload','autoplay','loop','muted','controls','crossorigin'
];

export const VIDEO_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','preload','autoplay','loop','muted','controls','poster','width','height','crossorigin'
];

export const SOURCE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','type','srcset','sizes','media'
];

export const TRACK_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'kind','src','srclang','label','default'
];

export const OBJECT_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'type','name','form','width','height'
];

export const EMBED_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','type','width','height'
];

export const MAP_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'name'
];

export const AREA_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'alt','href','target','download','rel','referrerpolicy'
];

// Flow/structure specifics
export const BLOCKQUOTE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'cite'
];

export const OL_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'reversed','start','type'
];

export const LI_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	...TEXT_ONLY_ATTRIBUTES,
	'value'
];

// Table specifics
export const TH_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	...TEXT_ONLY_ATTRIBUTES,
	'scope','colspan','rowspan','headers'
];

export const TD_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	...TEXT_ONLY_ATTRIBUTES,
	'colspan','rowspan','headers'
];

// Phrasing content: inline/text-level elements
export const PHRASING_CONTENT: ElementTag[] = [
	'span','b','strong','i','em','u','small','mark','sub','sup','code','abbr','s','del','ins','q','cite','dfn',
	'var','samp','kbd','time','data','wbr','bdi','bdo','ruby','rt','rp','a'
];

// Flow content: broad set of block-level and inline elements for general containers
export const FLOW_CONTENT: ElementTag[] = [
	// Sectioning and structural
	'div','section','article','aside','nav','header','footer','main','address','hgroup',
	// Text containers and blocks
	'p','pre','blockquote','figure','figcaption',
	// Headings
	'h1','h2','h3','h4','h5','h6',
	// Lists
	'ul','ol','li','dl','dt','dd',
	// Tables
	'table','thead','tbody','tfoot','tr','th','td','caption','colgroup','col',
	// Forms and controls
	'form','fieldset','legend','label','input','select','textarea','button','datalist','optgroup','option','output','progress','meter',
	// Interactive containers
	'details','summary','dialog',
	// Media and embedded
	'img','video','audio','iframe','canvas','source','track','picture','object','embed','map','area','svg',
	// Phrasing / inline semantics
	'a','span','b','strong','i','em','u','small','mark','sub','sup','code','abbr','s','del','ins','q','cite','dfn',
	'var','samp','kbd','time','data','wbr','bdi','bdo','ruby','rt','rp',
	// Other voids
	'hr','br'
];

// Flow content without header/footer (for header/footer themselves)
export const FLOW_NO_HEADER_FOOTER: ElementTag[] = FLOW_CONTENT.filter(t => t !== 'header' && t !== 'footer');

// Flow content without forms (for form itself)
export const FLOW_NO_FORM: ElementTag[] = FLOW_CONTENT.filter(t => t !== 'form');

// Flow content without li (for li itself)
export const FLOW_NO_LI: ElementTag[] = FLOW_CONTENT.filter(t => t !== 'li');

// Flow content with figcaption (for figure)
export const FLOW_WITH_FIGCAPTION: ElementTag[] = [...FLOW_CONTENT, 'figcaption'];

// Flow content with legend (for fieldset)
export const FLOW_WITH_LEGEND: ElementTag[] = [...FLOW_CONTENT, 'legend'];

// Flow content with summary (for details)
export const FLOW_WITH_SUMMARY: ElementTag[] = [...FLOW_CONTENT, 'summary'];

// Phrasing content with source/track (for audio/video)
export const PHRASING_WITH_MEDIA: ElementTag[] = [...PHRASING_CONTENT, 'source','track'];

// Phrasing content with area (for map)
export const PHRASING_WITH_AREA: ElementTag[] = [...PHRASING_CONTENT, 'area'];

// Phrasing content with rt/rp (for ruby)
export const PHRASING_WITH_RUBY: ElementTag[] = [...PHRASING_CONTENT, 'rt','rp'];

// Specific element sets
export const LIST_ITEM_ONLY: ElementTag[] = ['li'];
export const DESCRIPTION_LIST_CONTENT: ElementTag[] = ['dt','dd'];
export const SELECT_CONTENT: ElementTag[] = ['option','optgroup'];
export const OPTION_ONLY: ElementTag[] = ['option'];
export const HEADINGS_ONLY: ElementTag[] = ['h1','h2','h3','h4','h5','h6'];
export const TABLE_SECTIONS: ElementTag[] = ['caption','colgroup','thead','tbody','tfoot','tr'];
export const COL_ONLY: ElementTag[] = ['col'];
export const TR_ONLY: ElementTag[] = ['tr'];
export const TABLE_CELLS: ElementTag[] = ['th','td'];
export const PICTURE_CONTENT: ElementTag[] = ['source','img'];
export const VOID_CONTENT: ElementTag[] = [];
