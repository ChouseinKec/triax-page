// Types
import type { ViewportDefinition, ViewportID } from '@/src/page/core/viewport/types/viewport';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateViewport } from '@/src/page/service/helpers/editor';

/**
 * Class-based viewport registry for managing viewport definitions
 */
class ViewportRegistryClass {
	private viewports: Record<string, ViewportDefinition> = {};

	/**
	 * Registers a viewport definition in the viewport registry.
	 * @param viewport - The viewport definition to register
	 * @returns Success status with optional error message
	 */
	registerViewport(viewport: ViewportDefinition): ValidateResult<ViewportDefinition> {
		const validation = validateViewport(viewport);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.viewports[viewport.id]) {
			return { valid: false, message: `Viewport with id "${viewport.id}" already registered` };
		}

		this.viewports = { ...this.viewports, [viewport.id]: viewport };
		return { valid: true, value: viewport };
	}

	/**
	 * Retrieves all registered viewport definitions.
	 * @returns Readonly record of all registered viewports keyed by their IDs.
	 */
	getRegisteredViewports(): Readonly<Record<string, ViewportDefinition>> {
		return { ...this.viewports };
	}

	/**
	 * Retrieves a specific viewport definition by its ID.
	 * @param id - The viewport ID to retrieve.
	 * @returns The viewport definition if found, undefined otherwise.
	 */
	getRegisteredViewport(viewportID: ViewportID): ViewportDefinition | undefined {
		return this.viewports[viewportID];
	}

	/**
	 * Retrieves a specific viewport by ID.
	 * @param id - The viewport ID to retrieve
	 * @returns The viewport definition if found, undefined otherwise
	 */
	getViewportById(id: ViewportID): ViewportDefinition | undefined {
		return this.viewports[id];
	}

	/**
	 * Retrieves the viewport definition associated with a specific workbench ID.
	 * @param workbenchID - The workbench ID to find the viewport for
	 * @returns The viewport definition if found, undefined otherwise
	 */
	getRegisteredViewportByWorkbenchID(workbenchID: string): ViewportDefinition | undefined {
		return Object.values(this.viewports).find((viewport) => viewport.workbenchID === workbenchID);
	}
}

// Create singleton instance
const viewportRegistry = new ViewportRegistryClass();

// Export the registry instance methods
export const registerViewport = (viewport: ViewportDefinition) => viewportRegistry.registerViewport(viewport);
export const getRegisteredViewports = () => viewportRegistry.getRegisteredViewports();
export const getRegisteredViewport = (id: ViewportID) => viewportRegistry.getRegisteredViewport(id);
export const getViewportById = (id: ViewportID) => viewportRegistry.getViewportById(id);
export const getRegisteredViewportByWorkbenchID = (workbenchID: string) => viewportRegistry.getRegisteredViewportByWorkbenchID(workbenchID);
