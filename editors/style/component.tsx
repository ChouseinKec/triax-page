import React, { useMemo } from "react";
import CSS from './style.module.scss';

// Components
import Layout from '@/editors/style/components/layout/component';

// Types 
import { StyleEditorProps } from './types';

// Hooks
import { useBlockManager } from '@/hooks/block/manager';

const StyleEditor: React.FC<StyleEditorProps> = () => {
    const { getSelectedBlock } = useBlockManager();

    const selectedBlock = getSelectedBlock();



    return (
        <div className={CSS.StyleEditor} >
            {
                selectedBlock
                    ? <Layout />
                    : <p className={CSS.Fallback}>No block selected. Please select a block to see style-specific settings.</p>
            }
        </div>
    );
};

export default StyleEditor;