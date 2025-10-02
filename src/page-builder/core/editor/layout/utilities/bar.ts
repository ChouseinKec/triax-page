// Types
import { BarActionInstance, BarDefinition, BarID, BarTitle, BarPosition, BarSize, BarActionID, BarActionTitle, BarActionOrder, BarActionRender } from '@/src/page-builder/core/editor/layout/types';

export function isBarIDValid(barID: unknown): barID is BarID {
	return typeof barID === 'string' && barID.length > 0;
}

export function isBarTitleValid(barTitle: unknown): barTitle is BarTitle {
	return typeof barTitle === 'string' && barTitle.length > 0;
}

export function isBarPositionValid(barPosition: unknown): barPosition is BarPosition {
	return (
		typeof barPosition === 'object' && //
		barPosition !== null &&
		typeof (barPosition as { top?: unknown }).top === 'string' &&
		typeof (barPosition as { left?: unknown }).left === 'string'
	);
}

export function isBarSizeValid(barSize: unknown): barSize is BarSize {
	if (typeof barSize !== 'object' || barSize === null) return false;

	const size = barSize as Record<string, unknown>;

	// Check for BarSizeFixed: must have width as string
	if (typeof size.width === 'string') {
		// Ensure no other properties that would make it invalid
		const allowedKeys = new Set(['width']);
		const actualKeys = Object.keys(size);
		return actualKeys.every((key) => allowedKeys.has(key));
	}

	// Check for BarSizeAuto: must have both minWidth and maxWidth as strings
	const hasMinWidth = typeof size.minWidth === 'string';
	const hasMaxWidth = typeof size.maxWidth === 'string';

	if (hasMinWidth && hasMaxWidth) {
		// Ensure no other properties that would make it invalid
		const allowedKeys = new Set(['minWidth', 'maxWidth']);
		const actualKeys = Object.keys(size);
		return actualKeys.every((key) => allowedKeys.has(key));
	}

	// If neither condition is met, it's invalid
	return false;
}

export function isBarDefinitionValid(barDefinition: unknown): barDefinition is BarDefinition {
	return (
		typeof barDefinition === 'object' && //
		barDefinition !== null &&
		'id' in barDefinition &&
		'title' in barDefinition &&
		'position' in barDefinition &&
		'size' in barDefinition &&
		'workbenchID' in barDefinition
	);
}

export function isBarActionIDValid(actionID: unknown): actionID is BarActionID {
	return typeof actionID === 'string' && actionID.length > 0;
}

export function isBarActionTitleValid(actionTitle: unknown): actionTitle is BarActionTitle {
	return typeof actionTitle === 'string' && actionTitle.length > 0;
}

export function isBarActionOrderValid(actionOrder: unknown): actionOrder is BarActionOrder {
	return typeof actionOrder === 'number' && Number.isInteger(actionOrder) && actionOrder >= 0;
}

export function isBarActionRenderValid(actionRender: unknown): actionRender is BarActionRender {
	return typeof actionRender === 'function';
}

export function isBarActionInstanceValid(action: unknown): action is BarActionInstance {
	return (
		typeof action === 'object' && //
		action !== null &&
		'id' in action &&
		'title' in action &&
		'order' in action &&
		'render' in action
	);
}
