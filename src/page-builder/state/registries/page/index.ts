import type { DeviceDefinition, DeviceInstance, DeviceID, DeviceRecord } from '@/src/page-builder/core/page/types/device';
import type { OrientationDefinition, OrientationInstance, OrientationID, OrientationRecord } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoDefinition, PseudoInstance, PseudoID, PseudoRecord } from '@/src/page-builder/core/page/types/pseudo';
import type { BarActionInstance, BarActionID, BarActionRecord } from '@/src/page-builder/core/page/types/action';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateDeviceDefinition, validateOrientationDefinition, validatePseudoDefinition } from '@/src/page-builder/services/helpers/validate';

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
	registerDevice(device: DeviceDefinition): ValidateResult<DeviceDefinition> {
		const validation = validateDeviceDefinition(device);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.devices[device.value]) {
			return { valid: false, message: `Device with value "${device.value}" already registered` };
		}

		this.devices = { ...this.devices, [device.value]: { ...device, id: device.value } };
		return { valid: true, value: device };
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
	registerOrientation(orientation: OrientationDefinition): ValidateResult<OrientationDefinition> {
		const validation = validateOrientationDefinition(orientation);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.orientations[orientation.value]) {
			return { valid: false, message: `Orientation with value "${orientation.value}" already registered` };
		}

		// Store orientation keyed by its value, ensuring id matches value for consistency
		this.orientations = { ...this.orientations, [orientation.value]: { ...orientation, id: orientation.value } };
		return { valid: true, value: orientation };
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
	registerPseudo(pseudo: PseudoDefinition): ValidateResult<PseudoDefinition> {
		const validation = validatePseudoDefinition(pseudo);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.pseudos[pseudo.value]) {
			return { valid: false, message: `Pseudo with value "${pseudo.value}" already registered` };
		}

		// Store pseudo keyed by its value, ensuring id matches value for consistency
		this.pseudos = { ...this.pseudos, [pseudo.value]: { ...pseudo, id: pseudo.value } };
		return { valid: true, value: pseudo };
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
	private actions: BarActionRecord = {};

	/**
	 * Registers an action definition in the action registry.
	 * @param action - The action definition to register
	 * @returns Success status with optional error message
	 */
	registerAction(action: BarActionInstance): ValidateResult<BarActionInstance> {
		// Check for duplicates
		if (this.actions[action.id]) {
			return { valid: false, message: `Action with id "${action.id}" already registered` };
		}

		this.actions = { ...this.actions, [action.id]: action };
		return { valid: true, value: action };
	}

	/**
	 * Retrieves all registered action definitions.
	 * @returns Readonly record of all registered actions keyed by their id
	 */
	getRegisteredActions(): Readonly<BarActionRecord> {
		return { ...this.actions };
	}

	/**
	 * Retrieves a specific action definition by its id.
	 * @param id - The action id to retrieve
	 * @returns The action definition if found, undefined otherwise
	 */
	getRegisteredAction(id: BarActionID): BarActionInstance | undefined {
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
export const registerAction = (action: BarActionInstance) => actionRegistry.registerAction(action);
export const getRegisteredActions = () => actionRegistry.getRegisteredActions();
export const getRegisteredAction = (id: BarActionID) => actionRegistry.getRegisteredAction(id);
