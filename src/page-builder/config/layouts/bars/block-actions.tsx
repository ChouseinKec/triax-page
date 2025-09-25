// Types
import { BarDefinition } from '@/src/page-builder/core/editor/layout/types';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */

const BlockActions: BarDefinition = {
	id: 'block-actions',
	position: { top: '93%', left: '37.5%' },
	size: { width: '25%', height: '35px' },
	title: 'Block Actions',
	workbenchID: 'main',
};

export default BlockActions;
