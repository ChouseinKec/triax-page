import type { BlockInstance, BlockStyleData, BlockType, BlockTag } from '@/types/block/block';

export interface BlockEditorStoreProps {
	selectedBlockID: string | null;
	allBlocks: Record<string, BlockInstance>;

	selectBlock: (blockID: string | null) => void;
	getBlock: (blockID: string) => BlockInstance | undefined;
	addBlock: (type: BlockType, parentID?: string) => void;
	deleteBlock: (blockID: string) => void;

	setBlockStyles: (blockID: string, style: BlockStyleData) => void;
	setBlockStyle: (blockID: string, device: string, orientation: string, pseudo: string, property: string, value: string) => void;
}
