import type { BlockInstance, BlockStyleDefinition, BlockType } from '@/types/block/block';
import type { HTMLElementTag } from '@/types/block/element';
import type { DeviceName } from '@/types/page/device';
import type { PseudoName } from '@/types/page/pseudo';
import type { OrientationName } from '@/types/page/orientation';
import type { HTMLPropertyKey } from '@/types/block/attribute/property';

export interface BlockStoreProps {
	selectedBlockID: string | null;
	allBlocks: Record<string, BlockInstance>;

	selectBlock: (blockID: string | null) => void;
	getBlock: (blockID: string) => BlockInstance | undefined;
	addBlock: (type: BlockType, parentID?: string) => void;
	deleteBlock: (blockID: string) => void;

	setBlockStyles: (blockID: string, style: BlockStyleDefinition) => void;
	setBlockStyle: (blockID: string, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, property: string, value: string) => void;

	setBlockAttribute: (blockID: string, attribute: HTMLPropertyKey, value: string) => void;
	setBlockTag: (blockID: string, tag: HTMLElementTag) => void;
}
