import type { PanelKey } from '@/core/layout/panel/types';
import type { BenchKey } from '@/core/layout/workbench/types';
/**
 * Props for the PanelEditor component.
 */
export interface PanelsProps {
	benchKey: BenchKey;
	
}

/**
 * Props for the Panel component.
 */
export type PanelProps = {
	/** The key of the panel */
	panelKey: PanelKey;
};

/**
 * Props for the Tabs component.
 */
export type TabProps = {
	/** The key of the panel */
	panelKey: PanelKey;
};

/**
 * Props for the Actions component.
 */
export interface ActionsProps {
	panelKey: PanelKey;
	isLocked: boolean;
}
