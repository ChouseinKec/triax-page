// Types
import type { StylePropertyKeys } from '@/types/style/property';
import type { BlockTagKeys } from './tag';

export type BlockStyleData = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in StylePropertyKeys]?: string;
			};
		};
	};
};

export interface BlockData {
	id: string;
	styles: BlockStyleData;
	parentID: string | null;
	contentIDs: string[];

	tag: BlockTagKeys;
	permittedContent: BlockTagKeys[] | null;
	permittedParent: BlockTagKeys[] | null;
}
