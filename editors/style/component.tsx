import React, { ReactElement, useCallback, useMemo, useState } from "react";
import CSS from './style.module.css';

// Components
import Layout from '@/editors/style/components/layout/component';

// Types 
import { StyleEditorProps } from './types';

// Hooks
import { useDeviceRender } from '@/hooks/device/hooks';
import { useOrientationRender } from '@/hooks/orientation/hooks';
import { usePseudoRender } from '@/hooks/pseudo/hooks';

const StyleEditor: React.FC<StyleEditorProps> = (props: StyleEditorProps): ReactElement => {
    const { renderDeviceSelect } = useDeviceRender();
    const { renderOrientationSelect } = useOrientationRender();
    const { renderPseudoSelect } = usePseudoRender();

    const deviceSelect = useMemo(() => renderDeviceSelect(), [renderDeviceSelect]);
    const orientationSelect = useMemo(() => renderOrientationSelect(), [renderOrientationSelect]);
    const pseudoSelect = useMemo(() => renderPseudoSelect(), [renderPseudoSelect]);

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    /**
     * Toggles the collapsed state of the style editor.
     * When collapsed, the editor will hide its controls and layout.
     */
    const handleCollapse = useCallback((): void => {
        setIsCollapsed((prev) => !prev);
    }, []);

    return (
        <div className={CSS.StyleEditor} data-is-collapsed={isCollapsed}>

            <div className={CSS.Controls}>
                {deviceSelect}
                {orientationSelect}
                {pseudoSelect}
            </div>

            <Layout />

            <button className={CSS.Toggle} onClick={handleCollapse}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H72a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h56v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H80V88h56a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z" /></svg>
            </button>
        </div>
    );
};

export default StyleEditor;