// Constants
import { StylePropertyKeys } from '@/types/style/property';

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
	parent: string | null;
	children: string[];
}
