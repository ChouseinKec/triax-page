import { createContext, useContext } from 'react';
import type { BlockStyleData } from '@/types/block/block';
import type { BlockTagKeys } from '@/types/block/tag';

export interface BlockEditorContextType {
	addBlock: (tag: BlockTagKeys, parentID?: string) => void;
	selectBlock: (blockID: string) => void;
	deleteBlock: (blockID: string) => void;

	generateCSS: (blockID: string, styles: BlockStyleData) => string | null;
	blocksNode: HTMLDivElement | null;
}

export const BlockEditorContext = createContext<BlockEditorContextType | undefined>(undefined);

export const useBlockEditorContext = () => {
	const context = useContext(BlockEditorContext);
	if (!context) throw new Error('[Block] BlockEditorContext must be used within a BlockEditorContext.Provider');
	return context;
};
