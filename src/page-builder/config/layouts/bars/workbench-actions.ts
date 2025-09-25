// Types
import { BarDefinition } from '@/src/page-builder/core/editor/layout/types';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const WorkbenchActions: BarDefinition = {
	id: 'workbenchmain-actions',
	position: { top: '7%', left: '37.5%' },
	size: { width: '25%', height: '35px' },
	title: 'Workbench Actions',
	workbenchID: 'main',
};

export default WorkbenchActions;
