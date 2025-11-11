// Constants
import { DeviceDefinitions } from '@/src/page/config/page/device';
import { OrientationDefinitions } from '@/src/page/config/page/orientation';
import { PseudoDefinitions } from '@/src/page/config/page/pseudo';
import { WorkbenchSelectAction } from '@/src/page/config/page/action';

// Registry
import { registerDevice, registerPseudo, registerOrientation, registerAction } from '@/src/page/state/registries/page';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Initialize and register core devices
 */
function initializeDevices() {
	const devices = DeviceDefinitions.filter((device) => {
		if (!device || typeof device !== 'object' || !('value' in device)) {
			devLog.warn('[PageInit] Skipping invalid device definition');
			return false;
		}
		return true;
	});

	if (devices.length === 0) {
		devLog.warn('[PageInit] No valid core devices found to register');
		return;
	}

	devLog.info('[PageInit] Initializing Devices:');

	devices.forEach((device) => {
		const result = registerDevice(device);
		if (result.valid) {
			devLog.info(`         ${device.value} registration successful.`);
		} else {
			devLog.error(`         ${device.value} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register core orientations
 */
function initializeOrientations() {
	const orientations = OrientationDefinitions.filter((orientation) => {
		if (!orientation || typeof orientation !== 'object' || !('value' in orientation)) {
			devLog.warn('[PageInit] Skipping invalid orientation definition');
			return false;
		}
		return true;
	});

	if (orientations.length === 0) {
		devLog.warn('[PageInit] No valid core orientations found to register');
		return;
	}

	devLog.info('[PageInit] Initializing Orientations:');

	orientations.forEach((orientation) => {
		const result = registerOrientation(orientation);
		if (result.valid) {
			devLog.info(`         ${orientation.value} registration successful.`);
		} else {
			devLog.error(`         ${orientation.value} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register core pseudos
 */
function initializePseudos() {
	const pseudos = PseudoDefinitions.filter((pseudo) => {
		if (!pseudo || typeof pseudo !== 'object' || !('value' in pseudo)) {
			devLog.warn('[PageInit] Skipping invalid pseudo definition');
			return false;
		}
		return true;
	});

	if (pseudos.length === 0) {
		devLog.warn('[PageInit] No valid core pseudos found to register');
		return;
	}

	devLog.info('[PageInit] Initializing Pseudos:');

	pseudos.forEach((pseudo) => {
		const result = registerPseudo(pseudo);
		if (result.valid) {
			devLog.info(`         ${pseudo.value} registration successful.`);
		} else {
			devLog.error(`         ${pseudo.value} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register core actions
 */
function initializeActions() {
	const actions = [WorkbenchSelectAction];

	if (actions.length === 0) {
		devLog.warn('[PageInit] No core actions found to register');
		return;
	}

	devLog.info('[PageInit] Initializing Actions:');

	actions.forEach((action) => {
		const result = registerAction(action);
		if (result.valid) {
			devLog.info(`         ${action.id} registration successful.`);
		} else {
			devLog.error(`         ${action.id} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register all core page components
 */
export async function initializeRegistry(): Promise<void> {
	return new Promise<void>((resolve) => {
		initializeDevices();
		initializeOrientations();
		initializePseudos();
		initializeActions();
		resolve();
	});
}
