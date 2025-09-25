// Constants
import { DeviceDefinitions } from '@/src/page-builder/config/page/device';
import { OrientationDefinitions } from '@/src/page-builder/config/page/orientation';
import { PseudoDefinitions } from '@/src/page-builder/config/page/pseudo';
import { WorkbenchSelectAction } from '@/src/page-builder/config/page/action';

// Registry
import { registerDevice, registerPseudo, registerOrientation, registerAction } from '@/src/page-builder/state/registries/page';

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

	const results: Array<{ id: string; status: string; core: string }> = [];

	devices.forEach((device) => {
		const result = registerDevice(device);
		results.push({
			id: device.value,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'device',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
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

	const results: Array<{ id: string; status: string; core: string }> = [];

	orientations.forEach((orientation) => {
		const result = registerOrientation(orientation);
		results.push({
			id: orientation.value,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'orientation',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
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

	const results: Array<{ id: string; status: string; core: string }> = [];

	pseudos.forEach((pseudo) => {
		const result = registerPseudo(pseudo);
		results.push({
			id: pseudo.value,
			status: result.success ? 'PASS' : `FAIL ${result.error}`,
			core: 'pseudo',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
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

	const results: Array<{ id: string; status: string; core: string }> = [];

	actions.forEach((action) => {
		const result = registerAction(action);
		results.push({
			id: action.id,
			status: result.success ? 'PASS' : `FAIL ${result.error}`,
			core: 'action',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register all core page components
 */
export function initializeRegistry() {
	initializeDevices();
	initializeOrientations();
	initializePseudos();
	initializeActions();
}

// Auto-initialize on module load
initializeRegistry();
