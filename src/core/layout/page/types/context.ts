// Types
import type { DeviceKey, DeviceDefinition, OrientationKey, OrientationDefinition, PseudoKey, PseudoDefinition } from '@/core/layout/page/types';
import type { BenchKey, BenchDefinition } from '@/core/layout/workbench/types';

/**
 * Represents the page context including selected, registered, and default device, orientation, pseudo and shorthand info.
 */
export type PageContext = {
	store: {
		selectedDeviceKey: DeviceKey;
		selectedOrientationKey: OrientationKey;
		selectedPseudoKey: PseudoKey;
		selectedWorkbenchKey: BenchKey;
	};
	registry: {
		devices: DeviceDefinition[];
		orientations: OrientationDefinition[];
		pseudos: PseudoDefinition[];
		workbenches: BenchDefinition[];
	};
	constant: {
		defaultDeviceKey: DeviceKey;
		defaultOrientationKey: OrientationKey;
		defaultPseudoKey: PseudoKey;
		defaultWorkbenchKey: BenchKey;
	};
};
