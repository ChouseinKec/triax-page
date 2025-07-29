import { ReactNode } from 'react';
import type { StylePropertyKeys } from '@/types/style/property';
import * as CoreBlocks from '@/registry/blocks/core';

export const BlockDefinitions = CoreBlocks;

/**
 * All valid HTML block-level tags supported by the system.
 * These correspond to official HTML tags (e.g. 'div', 'p', 'section').
 */
export type BlockTag = 'a' | 'abbr' | 'address' | 'article' | 'aside' | 'audio' | 'b' | 'blockquote' | 'br' | 'button' | 'code' | 'data' | 'del' | 'div' | 'dl' | 'em' | 'footer' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'header' | 'hgroup' | 'hr' | 'i' | 'image' | 'input' | 'ins' | 'kbd' | 'label' | 'main' | 'mark' | 'menu' | 'meter' | 'nav' | 'section' | 'ol' | 'output' | 'p' | 'picture' | 'pre' | 'q' | 'samp' | 'small' | 'span' | 'strong' | 'sub' | 'sup' | 'table' | 'textarea' | 'time' | 'u' | 'var' | 'wbr' | 'video' | 'ul' | 'li' | 'dt' | 'dd' | 'caption' | 'colgroup' | 'col' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'td' | 'th' | 'form' | 'select' | 'fieldset' | 'legend' | 'optgroup' | 'option' | 'progress' | 'img' | 's' | 'cite';

export type BlockType = 'text' | 'container' | 'media';

export type BlockAttributeValue = string | number | boolean | null;

/**
 * Block style data structure for responsive and pseudo-class styles.
 */
export type BlockStyleData = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in StylePropertyKeys]?: string;
			};
		};
	};
};

export type BlockAttributeData = {
	[key: string]: BlockAttributeValue;
};

/**
 * Blueprint/definition for a block type (core or plugin).
 * - `render` is a function that receives a BlockInstance and returns JSX.
 */
export interface BlockDefinition {
	type: BlockType;
	tag: BlockTag;
	tags?: BlockTag[];
	permittedContent?: BlockTag[] | null;
	permittedParent?: BlockTag[] | null;
	icon?: string | ReactNode;
	styles?: BlockStyleData | null;
	category?: string; 
	render: (instance: BlockInstance, children?: ReactNode) => ReactNode;
}

/**
 * Instance of a block in the editor (with unique ID and state).
 */
export interface BlockInstance {
	id: string;
	tag: BlockTag;
	tags?: BlockTag[];
	type: BlockType;

	styles: BlockStyleData | null;
	attributes: BlockAttributeData | null;

	parentID: string | null;
	contentIDs: string[];

	permittedContent: BlockTag[] | null;
	permittedParent: BlockTag[] | null;
}
