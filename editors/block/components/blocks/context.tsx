import { createContext, useContext } from "react";
import type { BlockData,BlockStyleData } from "@/types/block/block";

export interface BlockEditorContextType {
    allBlocks: Record<string, BlockData>;
    selectedBlockID: string | null;
    addBlock: (parentID?: string) => void;
    selectBlock: (blockID: string) => void;
    deleteBlock: (blockID: string) => void;
    getBlock: (blockID: string) => BlockData | undefined;
    getBlockStyles: (blockID: string) => BlockStyleData | undefined;
    getBlockCSS: (blockID: string) => string | null;

    getBlockChildren: (blockID: string) => string[] | undefined;
    getBlockParent: (blockID: string) => string | null;
    getBlockSelectedChild: (blockID: string) => string | null;

}

export const BlockEditorContext = createContext<BlockEditorContextType | undefined>(undefined);

export const useBlockEditorContext = () => {
    const context = useContext(BlockEditorContext);
    if (!context) throw new Error("[Block] BlockEditorContext must be used within a BlockEditorContext.Provider");
    return context;
};