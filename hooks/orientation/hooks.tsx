import { useCallback, ReactElement, useMemo } from 'react';

// Components
import DropdownSelect from '@/components/select/dropdown/component';

// Store
import useOrientationStore from '@/stores/orientation/store';

// Types
interface ORIENTATION_RENDER {
    renderOrientationSelect: () => ReactElement;
}


export const useOrientationRender = (): ORIENTATION_RENDER => {
    const options = useOrientationStore(useCallback(store => store.getOrientations(), []));
    const currentOrientation = useOrientationStore(useCallback(store => store.getOrientation(), []));
    const setOrientation = useOrientationStore(useCallback(store => store.setOrientation, []));

    const renderOrientationSelect = useCallback<ORIENTATION_RENDER['renderOrientationSelect']>(() => {
        return <DropdownSelect options={options} value={currentOrientation.value} onChange={(value) => setOrientation(value)} />
    },
        [options, currentOrientation.value, setOrientation]
    );


    return useMemo(() => ({
        renderOrientationSelect
    }), [renderOrientationSelect]);


};