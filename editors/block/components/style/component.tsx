import React from "react";
import CSS from './style.module.scss';

// Components
import Layout from './layout/component';

// Types 
import { BlockStyleProps } from './types';

// Hooks
import { useBlockManager } from '@/hooks/block/manager';

/**
 * BlockStyle displays style controls for the currently selected block.
 * If no block is selected, it shows a fallback message.
 */
const BlockStyles: React.FC<BlockStyleProps> = () => {
    // Get the currently selected block from the block manager
    const { getSelectedBlock } = useBlockManager();
    const selectedBlock = getSelectedBlock();

    return (
        <div className={CSS.BlockStyles}>
            {/* Render style layout if a block is selected, otherwise show fallback */}
            {selectedBlock
                ? <Layout />
                : <p className={CSS.Fallback}>
                    No block selected. Select a block to see style-specific settings.
                </p>
            }
        </div>
    );
};

export default BlockStyles;