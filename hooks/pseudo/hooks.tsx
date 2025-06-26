import { useCallback, ReactElement, useMemo } from 'react';

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

    const renderPseudoSelect = useCallback<PSEUDO_RENDER['renderPseudoSelect']>(() => {
        return <DropdownSelect options={options} value={currentPseudo.value} onChange={(value) => setPseudo(value)} />
    },
        [options, currentPseudo.value, setPseudo]
    );

    return useMemo(() => ({
        renderPseudoSelect
    }), [renderPseudoSelect]);
};