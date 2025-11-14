// Types
import { BarDefinition } from '@/src/core/layout/bar/types';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const MainSelectedActions: BarDefinition = {
    id: 'main-block-actions',
    position: { top: '93.5%', left: '46%' },
    size: { minWidth: '5%', maxWidth: '25%' },
    title: 'Main Selected Actions',
    workbenchID: 'main',
};

export default MainSelectedActions;
