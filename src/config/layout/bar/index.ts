// Registry
import { registerBars } from '@/core/layout/bar/registries';

import WorkbenchActions from './workbench-actions';
import MainSelectedActions from './block-actions';

// Register bars directly
registerBars([WorkbenchActions, MainSelectedActions]);
