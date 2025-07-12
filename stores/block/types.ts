import { BlockData, BlockStyleData } from '@/types/block/block';

export interface BlockEditorStoreProps {
	selectedBlock: string | null;
	allBlocks: Record<string, BlockData>;

	getSelected: () => string | null;
	selectBlock: (blockID: string) => void;
	getBlock: (blockID: string) => BlockData | undefined;
	addBlock: (parentID?: string) => void;
	deleteBlock: (blockID: string) => void;

	getBlockStyles: (blockID: string) => BlockStyleData | undefined;
	setBlockStyles: (blockID: string, style: BlockStyleData) => void;
	setBlockStyle: (blockID: string, device: string, orientation: string, pseudo: string, property: string, value: string) => void;
}
