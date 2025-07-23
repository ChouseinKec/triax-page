import type { BlockInstance, BlockStyleData, BlockType } from '@/types/block/block';
import type { DeviceName } from '@/types/page/device';
import type { PseudoName } from '@/types/page/pseudo';
import type { OrientationName } from '@/types/page/orientation';

export interface BlockStoreProps {
	selectedBlockID: string | null;
	allBlocks: Record<string, BlockInstance>;

	selectBlock: (blockID: string | null) => void;
	getBlock: (blockID: string) => BlockInstance | undefined;
	addBlock: (type: BlockType, parentID?: string) => void;
	deleteBlock: (blockID: string) => void;

	setBlockStyles: (blockID: string, style: BlockStyleData) => void;
	setBlockStyle: (blockID: string, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, property: string, value: string) => void;
}
