import { useCallback, ReactElement } from 'react';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';

// Store
import useDeviceStore from '@/stores/device/store';

// Types
interface DEVICE_RENDER {
    renderDeviceSelect: () => ReactElement;
}


export const useDeviceRender = (): DEVICE_RENDER => {
    const { getDevices, getDevice, setDevice, } = useDeviceStore();
    const renderDeviceSelect = useCallback<DEVICE_RENDER['renderDeviceSelect']>(() => {
        const options = getDevices();
        const currentDevice = getDevice();

        return <DropdownSelect options={options} value={currentDevice.value} onChange={(value) => setDevice(value)} />

    },
        [getDevice, getDevices, setDevice]
    );



    return {
        renderDeviceSelect,
    };
};