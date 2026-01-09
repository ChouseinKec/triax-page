// Types
import { BarDefinition } from '@/src/core/layout/bar/types';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const WorkbenchActions: BarDefinition = {
	id: 'workbenchmain-actions',
	position: { top: '7%', left: '46%' },
	size: { minWidth: 'auto', maxWidth: '25%' },
	title: 'Workbench Actions',
	workbenchKey: 'main',
	isTransparent: true,
};

export default WorkbenchActions;
