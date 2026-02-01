// Registry
import { registerPanels } from '@/core/layout/panel/state/registry';

// PanelEditor
import Liblary from './library';
import Inspector from './inspector';
import Hierarchy from './hierarchy';

// Register panels and tabs directly
registerPanels([Liblary, Inspector, Hierarchy]);
