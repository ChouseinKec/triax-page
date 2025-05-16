import { create } from 'zustand';

// Types
import { STYLE_STORE } from '@/stores/style/types';
import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

// Stores
import useBlockStore from '@/stores/block/store';
import useDeviceStore from '@/stores/device/store';
import useOrientationStore from '@/stores/orientation/store';
import usePseudoStore from '@/stores/pseudo/store';

// Utilities
import { devLog } from '@/utilities/dev';

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
const useStyleStore = create<STYLE_STORE>()((set, get) => ({
	setStyle: (property: STYLES_CONSTANTS_KEY, value: string): void => {
		// Get current stores state
		const blockStore = useBlockStore.getState();
		const deviceStore = useDeviceStore.getState();
		const orientationStore = useOrientationStore.getState();
		const pseudoStore = usePseudoStore.getState();

		// Get current selections
		const selectedBlockId = blockStore.selectedBlock;
		if (!selectedBlockId) {
			devLog.error('No block selected');
			return;
		}

		const DEVICE = deviceStore.getDevice();
		const ORIENTATION = orientationStore.getOrientation();
		const PSEUDO = pseudoStore.getPseudo();

		// Use the optimized setBlockStyle
		blockStore.setBlockStyle(DEVICE.name, ORIENTATION.name, PSEUDO.name, property, String(value), selectedBlockId);
	},

	getStyle: (property: STYLES_CONSTANTS_KEY): string => {
		const { getBlockStyles } = useBlockStore.getState();

		const styles = getBlockStyles();
		if (!styles) return '';

		// Current context
		const device = useDeviceStore.getState().getDevice().name;
		const orientation = useOrientationStore.getState().getOrientation().name;
		const pseudo = usePseudoStore.getState().getPseudo().name;

		// Defaults
		const defaultPseudo = 'default';
		const defaultOrientation = 'default';
		const defaultDevice = 'default';

		// Lookup priority (optimized for common cases)
		return (
			// 1. Exact match
			styles[device]?.[orientation]?.[pseudo]?.[property] ??
			// 2. Same context, default pseudo
			styles[device]?.[orientation]?.[defaultPseudo]?.[property] ??
			// 3. Default orientation
			styles[device]?.[defaultOrientation]?.[pseudo]?.[property] ??
			styles[device]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
			// 4. Default device
			styles[defaultDevice]?.[orientation]?.[pseudo]?.[property] ??
			styles[defaultDevice]?.[orientation]?.[defaultPseudo]?.[property] ??
			styles[defaultDevice]?.[defaultOrientation]?.[pseudo]?.[property] ??
			// 5. Global fallback
			styles[defaultDevice]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
			// 6. Empty string if nothing found
			''
		);
	},
}));

export default useStyleStore;
