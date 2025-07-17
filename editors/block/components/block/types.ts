import type { BlockData } from '@/types/block/block';

type BlockDataProps = Omit<BlockData, 'contentIDs'>;

export interface BlockProps extends BlockDataProps {
	/** Children blocks, can be recursive */
	content: BlockProps[];

	/** Whether this block is currently selected */
	isSelected: boolean;

	/** Whether this block has a selected child */
	hasSelectedChild: boolean;
}
