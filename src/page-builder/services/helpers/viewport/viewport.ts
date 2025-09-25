// Types
import type { ViewportDefinition } from '@/src/page-builder/core/editor/viewport/types';
import type { ValidationResult } from '@/src/shared/types/result';

/**
 * Type guard to check if a value is a valid ViewportDefinition shape
 */
function isViewportDefinitionShape(value: unknown): value is Record<keyof ViewportDefinition, unknown> {
	return typeof value === 'object' && value !== null && 'id' in value && 'title' in value && 'workspaceID' in value && 'render' in value;
}

/**
 * Validates a viewport definition
 */
export function validateViewport(viewport: unknown): ValidationResult {
	if (!viewport) return { success: false, error: 'Viewport definition is required' };

	if (!isViewportDefinitionShape(viewport)) return { success: false, error: `Viewport must be an object with required properties, got: ${typeof viewport}` };

	if (typeof viewport.id !== 'string' || viewport.id.length === 0) return { success: false, error: `Viewport requires a valid string id, got: ${viewport.id}` };

	if (typeof viewport.title !== 'string' || viewport.title.length === 0) return { success: false, error: `Viewport "${viewport.id}" requires a valid title, got: ${viewport.title}` };

	if (typeof viewport.workspaceID !== 'string' || viewport.workspaceID.length === 0) return { success: false, error: `Viewport "${viewport.id}" requires a valid workspaceID, got: ${viewport.workspaceID}` };

	if (typeof viewport.render !== 'function') return { success: false, error: `Viewport "${viewport.id}" requires a render function, got: ${typeof viewport.render}` };

	return { success: true };
}
