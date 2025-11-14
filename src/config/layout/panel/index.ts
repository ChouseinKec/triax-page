// Panels
import MainLibrary from './main/library';
import MainInspector from './main/inspector';
import MainHierarchy from './main/hierarchy';

// Tabs
import BlockLibraryTab from './main/tabs/block/liblary';
import BlockHierarchyTab from './main/tabs/block/hierarchy';
import BlockStyleTab from './main/tabs/block/style';
import BlockAttributeTab from './main/tabs/block/attribute';

export const CorePanels = [MainLibrary, MainInspector, MainHierarchy];
export const CoreTabs = [BlockLibraryTab, BlockHierarchyTab, BlockStyleTab, BlockAttributeTab];
