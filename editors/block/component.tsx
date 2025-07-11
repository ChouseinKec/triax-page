import React, { ReactElement, useCallback, useMemo } from "react";
import CSS from './style.module.css';

// Types 
import type { BlockEditorProps } from "./types";

// Components
import Blocks from "./components/blocks/component";


const BlockEditor: React.FC<BlockEditorProps> = (props: BlockEditorProps): ReactElement => {



    return (
        <div className={`${CSS.BlockEditor}`} >
            <Blocks />
        </div>
    );
};

export default BlockEditor;