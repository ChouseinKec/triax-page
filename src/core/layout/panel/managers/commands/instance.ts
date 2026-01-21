// Types
import type { PanelKey, PanelPosition, PanelSize } from '@/core/layout/panel/types';

// Stores
import { usePanelStore } from '@/core/layout/panel/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validatePanelKey } from '@/core/layout/panel/helpers';

/**
 * Updates the position of a panel.
 * @param panelKey - The key of the panel
 * @param position - The new position
 */
export function setPanelPosition(panelKey: PanelKey, position: PanelPosition): void {
	// Validate and operate
	const results = new ResultPipeline('[PanelManager → setPanelPosition]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return;

	usePanelStore.getState().updatePanel(panelKey, { position });
}

/**
 * Updates the size of a panel.
 * @param panelKey - The key of the panel
 * @param size - The new size
 */
export function setPanelSize(panelKey: PanelKey, size: PanelSize): void {
	// Validate and operate
	const results = new ResultPipeline('[PanelManager → setPanelSize]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return;

	usePanelStore.getState().updatePanel(panelKey, { size });
}

/**
 * Updates the open state of a panel.
 * @param panelKey - The key of the panel
 * @param isOpen - The new open state
 */
export function setPanelOpenState(panelKey: PanelKey, isOpen: boolean): void {
	// Validate and operate
	const results = new ResultPipeline('[PanelManager → setPanelOpenState]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return;

	usePanelStore.getState().updatePanel(panelKey, { isOpen });
}

/**
 * Updates the locked state of a panel.
 * @param panelKey - The key of the panel
 * @param isLocked - The new locked state
 */
export function setPanelLockedState(panelKey: PanelKey, isLocked: boolean): void {
	// Validate and operate
	const results = new ResultPipeline('[PanelManager → setPanelLockedState]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return;

	usePanelStore.getState().updatePanel(panelKey, { isLocked });
}

