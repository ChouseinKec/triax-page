// Types
import type { BlockInstance, BlockDefinition, BlockStyles, BlockAttributes } from '@/src/core/block/instance/types';
import type { ElementDefinition } from '@/src/core/block/element/types';
import type { StyleContext } from '@/src/core/block/style/types';
import type { PageContext, DeviceInstance, OrientationInstance, PseudoInstance } from '@/src/core/layout/page/types';
import type { BarInstance, BarActionInstance } from '@/src/core/layout/bar/types';
import type { PanelInstance } from '@/src/core/layout/panel/types';
import type { WorkbenchDefinition } from '@/src/core/layout/workbench/types';

/**
 * Helper to create a mock React element for testing.
 * Returns an object with the React element symbol for validation purposes.
 */
export const mockReactElement = () => ({ $$typeof: Symbol.for('react.element') } as any);

/**
 * Helper to create minimal BlockInstances for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test block instances.
 */
export const mockBlockInstance = (overrides?: Partial<BlockInstance>): BlockInstance => ({
	id: 'test-block',
	parentID: '',
	type: 'test-block',
	tag: 'div',
	contentIDs: [],
	attributes: {},
	styles: { all: { all: { all: {} } } },
	...overrides,
});

/**
 * Helper to create BlockAttributes for testing.
 * Provides a collection of attributes with sensible defaults.
 * Use this to avoid boilerplate when creating test block attributes.
 */
export const mockBlockAttributes = (overrides?: Partial<BlockAttributes>): BlockAttributes => ({
	...overrides,
});

/**
 * Helper to create BlockStyles for testing.
 * Intelligently handles both flat and nested style objects.
 *
 * - Flat objects like { fontSize: '16px', color: 'red' } are automatically wrapped to all→all→all
 * - Nested objects like { all: { desktop: { ... } } } are merged with defaults and preserved
 * - Uses deep merge to combine nested structures while allowing overrides at any level
 */
export const mockBlockStyles = (overrides?: Partial<BlockStyles> | Record<string, any>): BlockStyles => {
	if (!overrides) {
		return { all: { all: { all: {} } } };
	}

	// Check if this looks like a flat style object (has non-object values)
	// vs a proper nested BlockStyles structure
	const isFlat = Object.values(overrides).some((val) => val !== null && typeof val !== 'object');

	if (isFlat) {
		// Flat object - wrap it in the all→all→all structure
		return { all: { all: { all: overrides as Record<string, any> } } };
	}

	// Nested structure - merge with defaults
	const result: BlockStyles = { all: { all: { all: {} } } };

	// Deep merge the overrides
	for (const device in overrides) {
		if (device in result) {
			// Merge with existing device
			const deviceObj = overrides[device];
			if (typeof deviceObj === 'object') {
				result[device] = { ...result[device], ...deviceObj };
				// Continue merging nested levels if needed
				for (const orientation in deviceObj) {
					const orientationObj = deviceObj[orientation];
					if (typeof orientationObj === 'object') {
						result[device][orientation] = { ...result[device][orientation], ...orientationObj };
					}
				}
			}
		} else {
			// New device
			result[device] = overrides[device];
		}
	}

	return result;
};

/**
 * Helper to create minimal ElementDefinitions for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test element definitions.
 */
export const mockElementDefinition = (overrides?: Partial<ElementDefinition>): ElementDefinition => ({
	tag: 'span',
	description: 'Test element definition',
	allowedAttributes: [],
	allowedChildren: null,
	forbiddenAncestors: null,
	uniqueElements: null,
	orderedElements: null,
	...overrides,
});

/**
 * Helper to create minimal BlockDefinitions for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test block definitions.
 */
export const mockBlockDefinition = (overrides?: Partial<BlockDefinition>): BlockDefinition => ({
	type: 'test-block',
	name: 'Test Block',
	description: 'Test block definition',
	category: 'test',
	icon: mockReactElement(),
	defaultTag: 'div',
	availableTags: ['div'],
	allowedStyles: null,
	allowedAttributes: null,
	allowedChildren: null,
	forbiddenAncestors: null,
	uniqueElements: null,
	orderedElements: null,
	defaultStyles: { all: { all: { all: {} } } },
	defaultAttributes: {},
	defaultContent: {},
	render: () => null as any,
	...overrides,
});

/**
 * Helper to create minimal PageContext for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test page context.
 */
export const mockPageContext = (overrides?: Partial<PageContext>): PageContext => ({
	store: {
		selectedDeviceID: 'all',
		selectedOrientationID: 'all',
		selectedPseudoID: 'all',
		selectedWorkbenchID: 'default',
	},
	registry: {
		devices: [
			{
				name: 'all',
				value: 'all',
				media: { min: 0, max: Infinity },
				template: { width: 1200, height: 800 },
				category: 'custom',
				hidden: true,
			},

			// Mobile ranges
			{
				name: 'mobile',
				value: 'mobile',
				media: { min: 0, max: 480 },
				template: { width: 375, height: 667 },
				category: 'phone',
			},

			// Tablet ranges
			{
				name: 'tablet',
				value: 'tablet',
				media: { min: 768, max: 1024 },
				template: { width: 768, height: 1024 },
				category: 'tablet',
			},

			// Desktop ranges
			{
				name: 'desktop',
				value: 'desktop',
				media: { min: 1200, max: 1919 },
				template: { width: 1440, height: 900 },
				category: 'laptop',
			},
		],
		orientations: [
			{ id: 'all', name: 'all', value: 'all', hidden: true },
			{ id: 'portrait', name: 'portrait', value: 'portrait' },
			{ id: 'landscape', name: 'landscape', value: 'landscape' },
		],
		pseudos: [
			{ id: 'all', name: 'all', value: 'all', hidden: true },
			{ id: 'hover', name: 'hover', value: 'hover' },
			{ id: 'active', name: 'active', value: 'active' },
			{ id: 'focus', name: 'focus', value: 'focus' },
			{ id: 'visited', name: 'visited', value: 'visited' },
		],
		workbenches: [],
	},
	constant: {
		defaultDeviceID: 'all',
		defaultOrientationID: 'all',
		defaultPseudoID: 'all',
		defaultWorkbenchID: 'default',
	},
	...overrides,
});


/**
 * Helper to create minimal BarActionInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test bar actions.
 */
export const mockBarActionInstance = (overrides?: Partial<BarActionInstance>): BarActionInstance => ({
	id: 'test-action',
	title: 'Test Action',
	order: 0,
	render: () => null as any,
	...overrides,
});

/**
 * Helper to create minimal BarInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test bar instances.
 */
export const mockBarInstance = (overrides?: Partial<BarInstance>): BarInstance => ({
	id: 'test-bar',
	title: 'Test Bar',
	position: { top: '0', left: '0' },
	size: { width: '100%' },
	workbenchID: 'test-workbench',
	actions: {},
	...overrides,
});

/**
 * Helper to create minimal DeviceInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test device instances.
 */
export const mockDeviceInstance = (overrides?: Partial<DeviceInstance>): DeviceInstance => ({
	id: 'device-1',
	name: 'Mobile',
	value: 'mobile',
	media: { min: 0, max: 767 },
	template: { width: 375, height: 667 },
	category: 'phone',
	...overrides,
});

/**
 * Helper to create minimal OrientationInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test orientation instances.
 */
export const mockOrientationInstance = (overrides?: Partial<OrientationInstance>): OrientationInstance => ({
	id: 'orientation-1',
	name: 'Portrait',
	value: 'portrait',
	...overrides,
});
/**
 * Helper to create minimal PseudoInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test pseudo instances.
 */
export const mockPseudoInstance = (overrides?: Partial<PseudoInstance>): PseudoInstance => ({
	id: 'pseudo-1',
	name: 'Hover',
	value: 'hover',
	...overrides,
});

/**
 * Helper to create minimal PanelInstance for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test panel instances.
 */
export const mockPanelInstance = (overrides?: Partial<PanelInstance>): PanelInstance => ({
	id: 'panel-1',
	title: 'Test Panel',
	order: 0,
	icon: mockReactElement(),
	workbenchID: 'test-workbench',
	initialPosition: { top: '0', left: '0' },
	initialSize: { width: '300px', height: '400px', minWidth: 200, minHeight: 200 },
	initialLocked: false,
	initialOpen: true,
	tabs: {},
	isLocked: false,
	isOpen: true,
	...overrides,
});

/**
 * Helper to create minimal WorkbenchDefinition for testing.
 * Provides all required properties with sensible defaults.
 * Use this to avoid boilerplate when creating test workbench instances.
 */
export const mockWorkbenchInstance = (overrides?: Partial<WorkbenchDefinition>): WorkbenchDefinition => ({
	id: 'test-workbench',
	title: 'Test Workbench',
	icon: mockReactElement(),
	order: 0,
	render: () => null as any,
	...overrides,
});

