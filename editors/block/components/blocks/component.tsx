import React, { useCallback, memo, useMemo } from "react";
import CSS from './styles.module.css';

// Stores
import useBlockStore from "@/stores/block/store";

// Types 
import { BlocksProps } from "./types";

// Components
import Block from "../block/component";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

const Blocks: React.FC<BlocksProps> = (props: BlocksProps) => {
    const setSelected = useBlockStore(state => state.setSelected);
    const selectedBlock = useBlockStore(state => state.selectedBlock);
    const allBlocks = useBlockStore(state => state.allBlocks);

    const { addBlock } = useBlockManager();

    const renderBlocks = useMemo(() => {
        const blocks = Object.values(allBlocks);

        return blocks.map(block => (
            <Block key={block.id} isSelected={selectedBlock === block.id} {...block} />
        ));
    }, [allBlocks, selectedBlock]);


    /**
     * Handles adding a new block to the editor.
     * This function is called when the user clicks the add block button.
    */
    const handleAddBlock = useCallback(() => {
        addBlock();
    }, [addBlock]);

    return (
        <div className={`${CSS.Blocks}`} >
            {renderBlocks}
            <button className={CSS.Blocks__addButton} onClick={handleAddBlock}>
                Add Block
            </button>
        </div>
    )

};

export default memo(Blocks);