// Types
import type { ViewportDefinition, ViewportID, ViewportRender, ViewportTitle } from '@/src/page-builder/core/editor/viewport/types';

export function isViewportTitleValid(viewportTitle: unknown): viewportTitle is ViewportTitle {
	return typeof viewportTitle === 'string' && viewportTitle.length > 0;
}

export function isViewportRenderValid(viewportRender: unknown): viewportRender is ViewportRender {
	return typeof viewportRender === 'function';
}

export function isViewportIDValid(viewportID: unknown): viewportID is ViewportID {
	return typeof viewportID === 'string' && viewportID.length > 0;
}

export function isViewportDefinitionValid(viewportDefinition: unknown): viewportDefinition is ViewportDefinition {
	return (
		typeof viewportDefinition === 'object' &&
		viewportDefinition !== null && //
		'id' in viewportDefinition &&
		'title' in viewportDefinition &&
		'render' in viewportDefinition &&
		'workbenchID' in viewportDefinition
	);
}
