import type { DeviceDefinition, DeviceInstance, DeviceID, DeviceRecord } from '@/src/page-builder/core/page/types/device';
import type { OrientationDefinition, OrientationInstance, OrientationID, OrientationRecord } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoDefinition, PseudoInstance, PseudoID, PseudoRecord } from '@/src/page-builder/core/page/types/pseudo';
import type { ActionInstance, ActionID, ActionRecord } from '@/src/page-builder/core/page/types/action';
import type { ValidationResult } from '@/src/shared/types/result';

// Helpers
import { validateDeviceDefinition } from '@/src/page-builder/services/helpers/page/device';
import { validateOrientationDefinition } from '@/src/page-builder/services/helpers/page/orientation';
import { validatePseudoDefinition } from '@/src/page-builder/services/helpers/page/pseudo';

/**
 * Class-based device registry for managing device definitions
 */
class DeviceRegistry {
	private devices: DeviceRecord = {};

	/**
	 * Registers a device definition in the device registry.
	 * @param device - The device definition to register
	 * @returns Success status with optional error message
	 */
	registerDevice(device: DeviceDefinition): ValidationResult {
		const validation = validateDeviceDefinition(device);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.devices[device.value]) {
			return { success: false, error: `Device with value "${device.value}" already registered` };
		}

		this.devices = { ...this.devices, [device.value]: { ...device, id: device.value } };
		return { success: true };
	}

	/**
	 * Retrieves all registered device definitions.
	 * @returns Readonly record of all registered devices keyed by their value
	 */
	getRegisteredDevices(): Readonly<DeviceRecord> {
		return { ...this.devices };
	}

	/**
	 * Retrieves a specific device definition by its value.
	 * @param value - The device value to retrieve
	 * @returns The device definition if found, undefined otherwise
	 */
	getRegisteredDevice(value: DeviceID): DeviceInstance | undefined {
		return this.devices[value];
	}
}

/**
 * Class-based orientation registry for managing orientation definitions
 */
class OrientationRegistry {
	private orientations: OrientationRecord = {};

	/**
	 * Registers an orientation definition in the orientation registry.
	 * @param orientation - The orientation definition to register
	 * @returns Success status with optional error message
	 */
	registerOrientation(orientation: OrientationDefinition): ValidationResult {
		const validation = validateOrientationDefinition(orientation);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.orientations[orientation.value]) {
			return { success: false, error: `Orientation with value "${orientation.value}" already registered` };
		}

		// Store orientation keyed by its value, ensuring id matches value for consistency
		this.orientations = { ...this.orientations, [orientation.value]: { ...orientation, id: orientation.value } };
		return { success: true };
	}

	/**
	 * Retrieves all registered orientation definitions.
	 * @returns Readonly record of all registered orientations keyed by their value
	 */
	getRegisteredOrientations(): Readonly<OrientationRecord> {
		return { ...this.orientations };
	}

	/**
	 * Retrieves a specific orientation definition by its value.
	 * @param value - The orientation value to retrieve
	 * @returns The orientation definition if found, undefined otherwise
	 */
	getRegisteredOrientation(value: OrientationID): OrientationInstance | undefined {
		return this.orientations[value];
	}
	
}

/**
 * Class-based pseudo registry for managing pseudo definitions
 */
class PseudoRegistry {
	private pseudos: PseudoRecord = {};

	/**
	 * Registers a pseudo definition in the pseudo registry.
	 * @param pseudo - The pseudo definition to register
	 * @returns Success status with optional error message
	 */
	registerPseudo(pseudo: PseudoDefinition): ValidationResult {
		const validation = validatePseudoDefinition(pseudo);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.pseudos[pseudo.value]) {
			return { success: false, error: `Pseudo with value "${pseudo.value}" already registered` };
		}

		// Store pseudo keyed by its value, ensuring id matches value for consistency
		this.pseudos = { ...this.pseudos, [pseudo.value]: { ...pseudo, id: pseudo.value } };
		return { success: true };
	}

	/**
	 * Retrieves all registered pseudo definitions.
	 * @returns Readonly record of all registered pseudos keyed by their value
	 */
	getRegisteredPseudos(): Readonly<PseudoRecord> {
		return { ...this.pseudos };
	}

	/**
	 * Retrieves a specific pseudo definition by its value.
	 * @param value - The pseudo value to retrieve
	 * @returns The pseudo definition if found, undefined otherwise
	 */
	getRegisteredPseudo(value: PseudoID): PseudoInstance | undefined {
		return this.pseudos[value];
	}
}

/**
 * Class-based action registry for managing action definitions
 */
class ActionRegistry {
	private actions: ActionRecord = {};

	/**
	 * Registers an action definition in the action registry.
	 * @param action - The action definition to register
	 * @returns Success status with optional error message
	 */
	registerAction(action: ActionInstance): ValidationResult {
		// Check for duplicates
		if (this.actions[action.id]) {
			return { success: false, error: `Action with id "${action.id}" already registered` };
		}

		this.actions = { ...this.actions, [action.id]: action };
		return { success: true };
	}

	/**
	 * Retrieves all registered action definitions.
	 * @returns Readonly record of all registered actions keyed by their id
	 */
	getRegisteredActions(): Readonly<ActionRecord> {
		return { ...this.actions };
	}

	/**
	 * Retrieves a specific action definition by its id.
	 * @param id - The action id to retrieve
	 * @returns The action definition if found, undefined otherwise
	 */
	getRegisteredAction(id: ActionID): ActionInstance | undefined {
		return this.actions[id];
	}

}

// Create singleton instance
const deviceRegistry = new DeviceRegistry();

// Export the registry instance methods
export const registerDevice = (device: DeviceDefinition) => deviceRegistry.registerDevice(device);
export const getRegisteredDevices = () => deviceRegistry.getRegisteredDevices();
export const getRegisteredDevice = (value: DeviceID) => deviceRegistry.getRegisteredDevice(value);

// Create singleton instances
const orientationRegistry = new OrientationRegistry();
const pseudoRegistry = new PseudoRegistry();

// Export the registry instance methods
export const registerOrientation = (orientation: OrientationDefinition) => orientationRegistry.registerOrientation(orientation);
export const getRegisteredOrientations = () => orientationRegistry.getRegisteredOrientations();
export const getRegisteredOrientation = (value: OrientationID) => orientationRegistry.getRegisteredOrientation(value);

export const registerPseudo = (pseudo: PseudoDefinition) => pseudoRegistry.registerPseudo(pseudo);
export const getRegisteredPseudos = () => pseudoRegistry.getRegisteredPseudos();
export const getRegisteredPseudo = (value: PseudoID) => pseudoRegistry.getRegisteredPseudo(value);

// Create singleton instance
const actionRegistry = new ActionRegistry();

// Export the registry instance methods
export const registerAction = (action: ActionInstance) => actionRegistry.registerAction(action);
export const getRegisteredActions = () => actionRegistry.getRegisteredActions();
export const getRegisteredAction = (id: ActionID) => actionRegistry.getRegisteredAction(id);
