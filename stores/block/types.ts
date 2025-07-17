import type { BlockData, BlockStyleData } from '@/types/block/block';
import type { BlockTagKeys } from '@/types/block/tag';

export interface BlockEditorStoreProps {
	selectedBlockID: string | null;
	allBlocks: Record<string, BlockData>;

	selectBlock: (blockID: string) => void;
	getBlock: (blockID: string) => BlockData | undefined;
	addBlock: (tag: BlockTagKeys, parentID?: string) => void;
	deleteBlock: (blockID: string) => void;

	setBlockStyles: (blockID: string, style: BlockStyleData) => void;
	setBlockStyle: (blockID: string, device: string, orientation: string, pseudo: string, property: string, value: string) => void;
}
