"use client";

import { useCallback, ReactElement, useMemo } from "react";

// Components
import DropdownSelect from '@/components/select/dropdown/component';

// Store
import usePseudoStore from '@/stores/pseudo/store';

// Types
interface PSEUDO_RENDER {
    renderPseudoSelect: () => ReactElement;
}


export const usePseudoRender = (): PSEUDO_RENDER => {
    const options = usePseudoStore(useCallback(store => store.getPseudos(), []));
    const currentPseudo = usePseudoStore(useCallback(store => store.getPseudo(), []));
    const setPseudo = usePseudoStore(useCallback(store => store.setPseudo, []));
    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path></svg>

    const renderPseudoSelect = useCallback<PSEUDO_RENDER['renderPseudoSelect']>(() => {
        return <DropdownSelect placeholder={icon} forcePlaceholder={true} options={options} value={currentPseudo.value} onChange={(value) => setPseudo(value)} />
    },
        [options, currentPseudo.value, setPseudo]
    );

    return useMemo(() => ({
        renderPseudoSelect
    }), [renderPseudoSelect]);
};