import type { DeviceDefinition, DeviceKey, DeviceRecord } from '@/src/core/layout/page/types';
import type { OrientationDefinition, OrientationKey, OrientationDefinitionRecord } from '@/src/core/layout/page/types';
import type { PseudoDefinition, PseudoKey, PseudoDefinitionRecord } from '@/src/core/layout/page/types';
import type { ActionDefinition, ActionID, ActionRecord } from '@/src/core/layout/page/types/action';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateDeviceDefinition, validateOrientationDefinition, validatePseudoDefinition } from '@/src/core/layout/page/helpers';

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
	registerDevice(deviceDefinition: DeviceDefinition): ValidateResult<DeviceDefinition> {
		const validation = validateDeviceDefinition(deviceDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.devices[deviceDefinition.key]) return { valid: false, message: `Device with value "${deviceDefinition.key}" already registered` };

		this.devices = { ...this.devices, [deviceDefinition.key]: { ...deviceDefinition, key: deviceDefinition.key } };
		return { valid: true, value: deviceDefinition };
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
	getRegisteredDevice(deviceKey: DeviceKey): DeviceDefinition | undefined {
		return this.devices[deviceKey];
	}

	/**
	 * Retrieves the default device definition.
	 * @returns The first registered device definition or undefined if none exist
	 */
	getDefaultDeviceKey(): DeviceKey {
		return 'default';
	}
}

/**
 * Class-based orientation registry for managing orientation definitions
 */
class OrientationRegistry {
	private orientations: OrientationDefinitionRecord = {};

	/**
	 * Registers an orientation definition in the orientation registry.
	 * @param orientationDefinition - The orientation definition to register
	 * @returns Success status with optional error message
	 */
	registerOrientation(orientationDefinition: OrientationDefinition): ValidateResult<OrientationDefinition> {
		const validation = validateOrientationDefinition(orientationDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.orientations[orientationDefinition.key]) return { valid: false, message: `Orientation with value "${orientationDefinition.key}" already registered` };

		// Store orientation keyed by its value, ensuring id matches value for consistency
		this.orientations = { ...this.orientations, [orientationDefinition.key]: { ...orientationDefinition, key: orientationDefinition.key } };
		return { valid: true, value: orientationDefinition };
	}

	/**
	 * Retrieves all registered orientation definitions.
	 * @returns Readonly record of all registered orientations keyed by their value
	 */
	getRegisteredOrientations(): Readonly<OrientationDefinitionRecord> {
		return { ...this.orientations };
	}

	/**
	 * Retrieves a specific orientation definition by its value.
	 * @param orientationKey - The orientation key to retrieve
	 * @returns The orientation definition if found, undefined otherwise
	 */
	getRegisteredOrientation(orientationKey: OrientationKey): OrientationDefinition | undefined {
		return this.orientations[orientationKey];
	}

	/**
	 * Retrieves the default orientation key.
	 * @returns The default orientation key
	 */
	getDefaultOrientationKey(): OrientationKey {
		return 'default';
	}
}

/**
 * Class-based pseudo registry for managing pseudo definitions
 */
class PseudoRegistry {
	private pseudos: PseudoDefinitionRecord = {};

	/**
	 * Registers a pseudo definition in the pseudo registry.
	 * @param pseudoDefinition - The pseudo definition to register
	 * @returns Success status with optional error message
	 */
	registerPseudo(pseudoDefinition: PseudoDefinition): ValidateResult<PseudoDefinition> {
		const validation = validatePseudoDefinition(pseudoDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.pseudos[pseudoDefinition.key]) {
			return { valid: false, message: `Pseudo with value "${pseudoDefinition.key}" already registered` };
		}

		// Store pseudo keyed by its value, ensuring id matches value for consistency
		this.pseudos = { ...this.pseudos, [pseudoDefinition.key]: { ...pseudoDefinition, key: pseudoDefinition.key } };
		return { valid: true, value: pseudoDefinition };
	}

	/**
	 * Retrieves all registered pseudo definitions.
	 * @returns Readonly record of all registered pseudos keyed by their value
	 */
	getRegisteredPseudos(): Readonly<PseudoDefinitionRecord> {
		return { ...this.pseudos };
	}

	/**
	 * Retrieves a specific pseudo definition by its value.
	 * @param pseudoKey - The pseudo key to retrieve
	 * @returns The pseudo definition if found, undefined otherwise
	 */
	getRegisteredPseudo(pseudoKey: PseudoKey): PseudoDefinition | undefined {
		return this.pseudos[pseudoKey];
	}

	/**
	 * Retrieves the default pseudo key.
	 * @returns The default pseudo key
	 */
	getDefaultPseudoKey(): PseudoKey {
		return 'default';
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
	registerAction(action: ActionDefinition): ValidateResult<ActionDefinition> {
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
	getRegisteredActions(): Readonly<ActionRecord> {
		return { ...this.actions };
	}

	/**
	 * Retrieves a specific action definition by its id.
	 * @param id - The action id to retrieve
	 * @returns The action definition if found, undefined otherwise
	 */
	getRegisteredAction(id: ActionID): ActionDefinition | undefined {
		return this.actions[id];
	}
}

// Create singleton instance
const deviceRegistry = new DeviceRegistry();
export const registerDevice = (deviceDefinition: DeviceDefinition) => deviceRegistry.registerDevice(deviceDefinition);
export const getRegisteredDevices = () => deviceRegistry.getRegisteredDevices();
export const getRegisteredDevice = (deviceKey: DeviceKey) => deviceRegistry.getRegisteredDevice(deviceKey);
export const getDefaultDeviceKey = () => deviceRegistry.getDefaultDeviceKey();

const orientationRegistry = new OrientationRegistry();
export const registerOrientation = (orientationDefinition: OrientationDefinition) => orientationRegistry.registerOrientation(orientationDefinition);
export const getRegisteredOrientations = () => orientationRegistry.getRegisteredOrientations();
export const getRegisteredOrientation = (orientationKey: OrientationKey) => orientationRegistry.getRegisteredOrientation(orientationKey);
export const getDefaultOrientationKey = () => orientationRegistry.getDefaultOrientationKey();

const pseudoRegistry = new PseudoRegistry();
export const registerPseudo = (pseudoDefinition: PseudoDefinition) => pseudoRegistry.registerPseudo(pseudoDefinition);
export const getRegisteredPseudos = () => pseudoRegistry.getRegisteredPseudos();
export const getRegisteredPseudo = (pseudoKey: PseudoKey) => pseudoRegistry.getRegisteredPseudo(pseudoKey);
export const getDefaultPseudoKey = () => pseudoRegistry.getDefaultPseudoKey();

const actionRegistry = new ActionRegistry();
export const registerAction = (actionDefinition: ActionDefinition) => actionRegistry.registerAction(actionDefinition);
export const getRegisteredActions = () => actionRegistry.getRegisteredActions();
export const getRegisteredAction = (id: ActionID) => actionRegistry.getRegisteredAction(id);
