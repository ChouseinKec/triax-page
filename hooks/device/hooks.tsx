import { useCallback, ReactElement, useMemo } from 'react';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';

// Store
import useDeviceStore from '@/stores/device/store';

// Types
interface DEVICE_RENDER {
    renderDeviceSelect: () => ReactElement;
}


export const useDeviceRender = (): DEVICE_RENDER => {
    // Use more specific selectors to prevent unnecessary updates
    const options = useDeviceStore(useCallback(store => store.getDevices(), []));
    const currentDevice = useDeviceStore(useCallback(store => store.getDevice(), []));
    const setDevice = useDeviceStore(useCallback(store => store.setDevice, []));

    const renderDeviceSelect = useCallback<DEVICE_RENDER['renderDeviceSelect']>(() => {
        return <DropdownSelect options={options} value={currentDevice.value} onChange={(value) => setDevice(value)} />
    },
        [options, currentDevice.value, setDevice]
    );



    return useMemo(() => ({
        renderDeviceSelect
    }), [renderDeviceSelect]);
};