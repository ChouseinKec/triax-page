import { useCallback, ReactElement } from 'react';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';

// Store
import usePseudoStore from '@/stores/pseudo/store';

// Types
interface PSEUDO_RENDER {
    renderPseudoSelect: () => ReactElement;
}


export const usePseudoRender = (): PSEUDO_RENDER => {
    const { getPseudos, getPseudo, setPseudo } = usePseudoStore();


    const renderPseudoSelect = useCallback<PSEUDO_RENDER['renderPseudoSelect']>(() => {
        const options = getPseudos();
        const currentPseudo = getPseudo();

        return <DropdownSelect options={options} value={currentPseudo.value} onChange={(value) => setPseudo(value)} />

    },
        [getPseudo, getPseudos, setPseudo]
    );



    return {
        renderPseudoSelect,
    };
};