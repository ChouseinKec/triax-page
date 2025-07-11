import React, { useCallback, memo, useMemo } from "react";
import CSS from './styles.module.css';

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Types 
import { BlockProps } from './types';

const Block: React.FC<BlockProps> = (props: BlockProps) => {
    const { generateBlockStyles } = useBlockManager();
    const {
        id,
        parent,
        children,
        styles,
        isSelected = false
    } = props;

    const blockStyles = useMemo(() => {
        return generateBlockStyles(id, styles);
    }, [id, generateBlockStyles, styles]
    );

    return (
        <div id={`block-${id}`} className={CSS.Block} data-is-selected={isSelected}>
            {id}
            <style>{blockStyles}</style>
        </div>
    );
};

export default memo(Block);