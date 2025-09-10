import { useBlockStore } from '@/editors/block/stores/block/store';
import usePageStore from '@/stores/page/store';
import { createBlock, getBlockDescendants } from '@/editors/block/utilities/block/block';
import { validateBlock } from '@/editors/block/helpers/block';
import { renderStylesEditor, renderAttributeEditor } from '@/editors/block/utilities/block/render';
import { isBlockDescendant } from '@/editors/block/utilities/block/block';
import type { BlockInstance, BlockTypes, BlockID, AttributeEditor, StylesEditor } from '@/editors/block/types';

export const useBlock = (blockID: BlockID): BlockInstance | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useBlock')) return;

	return useBlockStore((state) => state.allBlocks[blockID]);
};

export const useBlockType = (blockID: BlockID): BlockTypes | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useBlockType')) return;

	return useBlockStore((state) => state.allBlocks[blockID].type);
};

export const useBlockID = (blockID: BlockID): BlockID | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useBlockID')) return;

	return useBlockStore((state) => state.allBlocks[blockID].id);
};

export const useBlockContentIDs = (blockID: BlockID): BlockID[] | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useBlockContentIDs')) return;

	return useBlockStore((state) => state.allBlocks[blockID].contentIDs);
};

export const useAttributeEditor = (blockID: BlockID): AttributeEditor | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useAttributeEditor')) return;

	return useBlockStore((state) => state.allBlocks[blockID].attributes);
};

export const useStylesEditor = (blockID: BlockID): StylesEditor | null | undefined => {
	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!validateBlock(currentBlock, 'BlockManager → useStylesEditor')) return;

	return useBlockStore((state) => state.allBlocks[blockID].styles);
};

export const useRenderedStylesEditor = (blockID: BlockID): string | undefined => {
	const styles = useStylesEditor(blockID);
	const currentDevice = usePageStore((state) => state.currentDevice);
	const currentOrientation = usePageStore((state) => state.currentOrientation);
	const currentPseudo = usePageStore((state) => state.currentPseudo);

	if (!styles) return undefined;

	return renderStylesEditor(styles, blockID, currentDevice, currentOrientation, currentPseudo);
};

export const useRenderedAttributeEditor = (blockID: BlockID): Record<string, string | boolean> | null => {
	const attributes = useAttributeEditor(blockID);
	if (attributes === undefined) return null;
	return renderAttributeEditor(attributes);
};

export const useIsBlockSelected = (blockID: BlockID): boolean => {
	const store = useBlockStore.getState();
	if (!validateBlock(store.allBlocks[blockID], 'selectBlock')) return false;

	return useBlockStore((state) => state.selectedBlockID === blockID);
};

export const useRootBlocks = (): BlockInstance[] => {
	return useBlockStore((state) => state.rootBlocks);
};

export const getSelectedBlockID = (): BlockID | null => {
	return useBlockStore.getState().selectedBlockID;
};

export const useSelectedBlockType = (): BlockTypes | undefined => {
	return useBlockStore((state) => {
		const id = state.selectedBlockID;
		if (!id) return undefined;
		return state.allBlocks[id].type;
	});
};

export const useSelectedBlockID = (): BlockID | undefined => {
	return useBlockStore((state) => {
		const id = state.selectedBlockID;
		if (!id) return undefined;
		return state.allBlocks[id].id;
	});
};

export const useHasBlockSelectedContent = (blockID: BlockID): boolean => {
	return useBlockStore((state) => {
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID || selectedBlockID === blockID) return false;

		const currentBlock = state.allBlocks[blockID];
		if (!validateBlock(currentBlock, 'useHasBlockSelectedContent')) return false;

		return isBlockDescendant(currentBlock, selectedBlockID, state.allBlocks);
	});
};

export const addBlock = (type: BlockTypes, parentID?: BlockID) => {
	const store = useBlockStore.getState();
	const newBlock = createBlock(type, parentID);
	if (!parentID) return store.updateBlocks({ [newBlock.id]: newBlock });

	const parentBlock = store.allBlocks[parentID];
	if (!validateBlock(parentBlock, 'addBlock')) return;

	store.updateBlocks({
		[parentID]: {
			...parentBlock,
			contentIDs: [...parentBlock.contentIDs, newBlock.id],
		},
		[newBlock.id]: newBlock,
	});
};

export const deleteBlock = (blockID: BlockID) => {
	const store = useBlockStore.getState();
	const currentBlock = store.allBlocks[blockID];
	if (!validateBlock(currentBlock, 'deleteBlock')) return;

	const parentBlock = store.allBlocks[currentBlock.parentID!];
	if (validateBlock(parentBlock, 'deleteBlock')) {
		const updatedParent: BlockInstance = {
			...parentBlock,
			contentIDs: parentBlock.contentIDs.filter((childID) => childID !== blockID),
		};
		store.updateBlocks({ [currentBlock.parentID!]: updatedParent });
	}

	const allBlocks = store.getAllBlocks();
	const blocksToDelete = getBlockDescendants([blockID], allBlocks);
	store.deleteBlocks(blocksToDelete);

	const currentSelectedID = store.getSelectedBlockID();
	if (blockID === currentSelectedID) store.selectBlock(null);
};

export const selectBlock = (blockID: BlockID | null) => {
	const store = useBlockStore.getState();
	const selectedBlockID = store.getSelectedBlockID();
	if (blockID === selectedBlockID) return;

	if (blockID && !validateBlock(store.allBlocks[blockID], 'selectBlock')) return;

	store.selectBlock(blockID);
};

export const getBlockPreviousSibling = (blockID: BlockID) => {
	const store = useBlockStore.getState();

	const currentBlock = store.allBlocks[blockID];
	if (!validateBlock(currentBlock, 'getBlockPreviousSibling')) return null;

	if (!currentBlock.parentID) return null;
	const parentBlock = store.allBlocks[currentBlock.parentID];
	if (!validateBlock(parentBlock, 'getBlockPreviousSibling')) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex <= 0) return null;

	const previousSiblingID = parentBlock.contentIDs[currentIndex - 1];
	const previousBlock = store.allBlocks[previousSiblingID];
	if (!validateBlock(previousBlock, 'getBlockPreviousSibling')) return null;

	return previousBlock;
};

export const getBlockNextSibling = (blockID: BlockID) => {
	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;

	const currentBlock = allBlocks[blockID];
	const currentParentID = currentBlock.parentID;
	if (!validateBlock(currentBlock, 'getBlockNextSibling')) return null;
	if (!currentParentID) return null;

	const parentBlock = allBlocks[currentParentID];
	const parentBlockContentIDs = parentBlock.contentIDs;
	if (!validateBlock(parentBlock, 'getBlockNextSibling')) return null;

	const currentIndex = parentBlockContentIDs.indexOf(blockID);
	if (currentIndex === -1 || currentIndex >= parentBlockContentIDs.length - 1) return null;

	const nextSiblingID = parentBlockContentIDs[currentIndex + 1];
	const nextBlock = allBlocks[nextSiblingID];

	if (!validateBlock(nextBlock, 'getBlockNextSibling')) return null;

	return nextBlock;
};

export const getNextBlock = (blockID: BlockID) => {
	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;
	const currentBlock = allBlocks[blockID];
	const currentBlockContentIDs = currentBlock.contentIDs;
	const currentParentID = currentBlock.parentID;

	if (!validateBlock(currentBlock, 'getNextBlock')) return null;

	if (currentBlockContentIDs && currentBlockContentIDs.length > 0) {
		const firstChildBlock = allBlocks[currentBlockContentIDs[0]];
		if (validateBlock(firstChildBlock, 'getNextBlock')) {
			return firstChildBlock;
		}
	}

	const nextSibling = getBlockNextSibling(blockID);
	if (nextSibling) return nextSibling;

	if (currentParentID) {
		const parentNextSibling = getBlockNextSibling(currentParentID);
		if (parentNextSibling) return parentNextSibling;
	}

	return null;
};

export const getPreviousBlock = (blockID: BlockID) => {
	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;
	const currentBlock = allBlocks[blockID];
	const currentParentID = currentBlock.parentID;

	if (!validateBlock(currentBlock, 'getPreviousBlock')) return null;

	const previousSibling = getBlockPreviousSibling(blockID);
	if (previousSibling) {
		const previousContentIDs = previousSibling.contentIDs;

		if (previousContentIDs && previousContentIDs.length > 0) {
			const lastChildID = previousContentIDs[previousContentIDs.length - 1];
			const lastChildBlock = allBlocks[lastChildID];
			if (validateBlock(lastChildBlock, 'getPreviousBlock')) {
				return lastChildBlock;
			}
		}
		return previousSibling;
	}

	if (currentParentID) {
		const parentBlock = allBlocks[currentParentID];
		if (validateBlock(parentBlock, 'getPreviousBlock')) {
			return parentBlock;
		}
	}
	return null;
};
