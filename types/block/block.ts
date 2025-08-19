import { ReactNode } from 'react';
import type { CSSPropertyKey } from '@/types/block/style/property';
import type { HTMLPropertyKey } from './attribute/property';
import type { HTMLElementTag } from './element';
export type BlockType = 'text' | 'container' | 'media';

/**
 * Block style data structure for responsive and pseudo-class styles.
 */
export type BlockStyleDefinition = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in CSSPropertyKey]?: string;
			};
		};
	};
};

/**
 * Blueprint/definition for a block type (core or plugin).
 * - `render` is a function that receives a BlockInstance and returns JSX.
 */
export interface BlockDefinition {
	type: BlockType;
	tag: HTMLElementTag;
	tags: HTMLElementTag[];
	permittedContent?: BlockType[] | null;
	permittedParent?: BlockType[] | null;
	icon?: string | ReactNode;
	styles?: BlockStyleDefinition | null;
	category?: string;
	render: (instance: BlockInstance, children?: ReactNode) => ReactNode;
}

/**
 * Instance of a block in the editor (with unique ID and state).
 */
export interface BlockInstance {
	id: string;
	tag: HTMLElementTag;
	type: BlockType;

	styles: BlockStyleDefinition | null;
	attributes: Partial<Record<HTMLPropertyKey, string> | null>;

	parentID: string | null;
	contentIDs: string[];

}
