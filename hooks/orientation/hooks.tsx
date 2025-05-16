import { useCallback, ReactElement } from 'react';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';

// Store
import useOrientationStore from '@/stores/orientation/store';

// Types
interface ORIENTATION_RENDER {
    renderOrientationSelect: () => ReactElement;
}


export const useOrientationRender = (): ORIENTATION_RENDER => {
    const { getOrientations, getOrientation, setOrientation, } = useOrientationStore();

    const renderOrientationSelect = useCallback<ORIENTATION_RENDER['renderOrientationSelect']>(() => {
        const options = getOrientations();
        const currentOrientation = getOrientation();

        return <DropdownSelect options={options} value={currentOrientation.value} onChange={(value) => setOrientation(value)} />

    },
        [getOrientation, getOrientations, setOrientation]
    );




    return {
        renderOrientationSelect,
    };
};