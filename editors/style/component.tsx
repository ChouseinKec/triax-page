import React, { ReactElement, useMemo } from 'react';
import CSS from './style.module.css';

// Components
import Layout from '@/editors/style/components/layout/component';

// Types 
import { StyleEditorProps } from '@/editors/style/types';

// Hooks
import { useDeviceRender } from '@/hooks/device/hooks';
import { useOrientationRender } from '@/hooks/orientation/hooks';
import { usePseudoRender } from '@/hooks/pseudo/hooks';

const StyleEditor: React.FC<StyleEditorProps> = (props: StyleEditorProps): ReactElement => {
    const { className = '' } = props;
    const { renderDeviceSelect } = useDeviceRender();
    const { renderOrientationSelect } = useOrientationRender();
    const { renderPseudoSelect } = usePseudoRender();

    const deviceSelect = useMemo(() => renderDeviceSelect(), [renderDeviceSelect]);
    const orientationSelect = useMemo(() => renderOrientationSelect(), [renderOrientationSelect]);
    const pseudoSelect = useMemo(() => renderPseudoSelect(), [renderPseudoSelect]);

    return (
        <div className={`${CSS.Styles} ${className}`}>

            <div className={CSS.Styles_Controls}>
                {deviceSelect}
                {orientationSelect}
                {pseudoSelect}
            </div>

            <Layout />
        </div>
    );
};

export default StyleEditor;