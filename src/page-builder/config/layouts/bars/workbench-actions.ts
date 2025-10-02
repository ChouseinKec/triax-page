// Types
import { BarDefinition } from '@/src/page-builder/core/editor/layout/types';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const WorkbenchActions: BarDefinition = {
	id: 'workbenchmain-actions',
	position: { top: '7%', left: '50%' },
	size: { minWidth: 'auto', maxWidth: '25%' },
	title: 'Workbench Actions',
	workbenchID: 'main',
	isTransparent: true,
};

export default WorkbenchActions;
