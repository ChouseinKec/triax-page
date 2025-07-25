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


    if (!selectedBlock) return null;

    return (
        <div className={CSS.StyleEditor} >
            <Layout />
        </div>
    );
};

export default StyleEditor;