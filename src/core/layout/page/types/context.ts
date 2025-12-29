// Types
import type { DeviceID, DeviceDefinition, OrientationID, OrientationInstance, PseudoID, PseudoInstance } from '@/src/core/layout/page/types';
import type { WorkbenchID, WorkbenchDefinition } from '@/src/core/layout/workbench/types';

/**
 * Represents the page context including selected, registered, and default device, orientation, pseudo and shorthand info.
 */
export type PageContext = {
	store: {
		selectedDeviceID: DeviceID;
		selectedOrientationID: OrientationID;
		selectedPseudoID: PseudoID;
		selectedWorkbenchID: WorkbenchID;
	};
	registry: {
		devices: DeviceDefinition[];
		orientations: OrientationInstance[];
		pseudos: PseudoInstance[];
		workbenches: WorkbenchDefinition[];
	};
	constant: {
		defaultDeviceID: DeviceID;
		defaultOrientationID: OrientationID;
		defaultPseudoID: PseudoID;
		defaultWorkbenchID: WorkbenchID;
	};
};
