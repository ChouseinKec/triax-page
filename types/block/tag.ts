/**
 * All valid HTML block-level tags supported by the system.
 * These correspond to official HTML tags (e.g. 'div', 'p', 'section').
 */
export type BlockTagKeys = 'a' | 'abbr' | 'address' | 'article' | 'aside' | 'audio' | 'b' | 'blockquote' | 'br' | 'button' | 'code' | 'data' | 'del' | 'div' | 'dl' | 'em' | 'footer' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'header' | 'hgroup' | 'hr' | 'i' | 'image' | 'input' | 'ins' | 'kbd' | 'label' | 'main' | 'mark' | 'menu' | 'meter' | 'nav' | 'section' | 'ol' | 'output' | 'p' | 'picture' | 'pre' | 'q' | 'samp' | 'small' | 'span' | 'strong' | 'sub' | 'sup' | 'table' | 'textarea' | 'time' | 'u' | 'var' | 'wbr' | 'video' | 'ul' | 'li' | 'dt' | 'dd' | 'caption' | 'colgroup' | 'col' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'td' | 'th' | 'form' | 'select' | 'fieldset' | 'legend' | 'optgroup' | 'option' | 'progress' | 'img' | 's' | 'cite';

/**
 * All valid content model types for block-level tags.
 * These correspond to the HTML content categories (e.g. 'flow', 'phrasing', 'sectioning').
 */
export type BlockTagType = 'flow' | 'phrasing' | 'sectioning' | 'heading' | 'embedded' | 'interactive' | 'form' | 'palpable';

/**
 * Represents a block-level HTML tag with its associated content model and properties.
 */
export interface BlockTagData {
	/**
	 * The HTML tag associated with the block (e.g. 'div', 'p').
	 * Used for matching, validation, and rendering.
	 */
	tag: BlockTagKeys;
	/**
	 * Content that can be nested inside this block.
	 * An array of allowed tag names, or null if any content is allowed.
	 */
	permittedContent: BlockTagKeys[] | null;
	/**
	 * Parent blocks that can contain this block.
	 * An array of allowed parent tag names, or null if any parent is allowed.
	 */
	permittedParent: BlockTagKeys[] | null;
	/**
	 * Whether this block can contain raw text content.
	 */
	permittedRawText?: boolean;
	/**
	 * Whether this block can contain rich text content (e.g. formatting, inline tags).
	 */
	permittedRichText?: boolean;
	/**
	 * The type of content this block represents (flow, phrasing, sectioning, etc.).
	 * Used for content model validation and categorization.
	 */
	type: BlockTagType;
}
