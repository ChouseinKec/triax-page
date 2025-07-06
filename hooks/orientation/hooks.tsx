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
    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M205.66,221.66l-24,24a8,8,0,0,1-11.32-11.32L180.69,224H80a24,24,0,0,1-24-24V104a8,8,0,0,1,16,0v96a8,8,0,0,0,8,8H180.69l-10.35-10.34a8,8,0,0,1,11.32-11.32l24,24A8,8,0,0,1,205.66,221.66ZM80,72a8,8,0,0,0,5.66-13.66L75.31,48H176a8,8,0,0,1,8,8v96a8,8,0,0,0,16,0V56a24,24,0,0,0-24-24H75.31L85.66,21.66A8,8,0,1,0,74.34,10.34l-24,24a8,8,0,0,0,0,11.32l24,24A8,8,0,0,0,80,72Z"></path></svg>;

    const renderOrientationSelect = useCallback<ORIENTATION_RENDER['renderOrientationSelect']>(() => {
        return <DropdownSelect placeholder={icon} forcePlaceholder={true} options={options} value={currentOrientation.value} onChange={(value) => setOrientation(value)} />
    },
        [options, currentOrientation.value, setOrientation]
    );


    return useMemo(() => ({
        renderOrientationSelect
    }), [renderOrientationSelect]);


};