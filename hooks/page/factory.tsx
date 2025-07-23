import { useCallback, ReactNode } from "react";

// Components
import DropdownSelect from '@/components/select/dropdown/component';

// Store
import usePageStore from '@/stores/page/store';

interface PageFactory {
	renderDeviceSelect: () => ReactNode;
}

export const usePageFactory = (): PageFactory => {
	const { currentDevice, setDevice, allDevices } = usePageStore();

	const renderDeviceSelect = useCallback<PageFactory['renderDeviceSelect']>(() => {
		const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z" /></svg>;

		return (
			<DropdownSelect
				searchable={true}
				grouped={true}
				placeholder={icon}
				forcePlaceholder={true}
				options={allDevices}
				value={currentDevice.value}
				onChange={(value) => setDevice(value as any)}
			/>
		)

	},
		[currentDevice, setDevice, allDevices]
	);


	return {
		renderDeviceSelect

	};


};