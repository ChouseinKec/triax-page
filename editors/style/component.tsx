import React, { ReactElement, useMemo } from "react";
import CSS from './style.module.scss';

// Components
import Layout from '@/editors/style/components/layout/component';

// Types 
import { StyleEditorProps } from './types';


const StyleEditor: React.FC<StyleEditorProps> = (props: StyleEditorProps): ReactElement => {
    return (
        <div className={CSS.StyleEditor} >
            <Layout />
        </div>
    );
};

export default StyleEditor;