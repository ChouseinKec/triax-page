// Registry
import { registerPanels, registerTabs } from '@/core/layout/panel/registries';

// Panels
import Liblary from './library';
import Inspector from './inspector';
import Hierarchy from './hierarchy';

// Tabs
import TabDefinitionLiblary from './tabs/liblary';
import TabDefinitionHierarchy from './tabs/hierarchy';
import TabDefinitionStyle from './tabs/style';
import TabDefinitionAttribute from './tabs/attribute';

// Register panels and tabs directly
registerPanels([Liblary, Inspector, Hierarchy]);
registerTabs([TabDefinitionLiblary, TabDefinitionHierarchy, TabDefinitionStyle, TabDefinitionAttribute]);
