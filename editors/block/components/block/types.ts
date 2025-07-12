import { BlockData } from '@/types/block/block';

export interface BlockProps extends BlockData {
	/** Whether this block is currently selected */
	isSelected?: boolean;
}
