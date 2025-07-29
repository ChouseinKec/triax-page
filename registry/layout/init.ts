
import { registerPanel } from './registry';
import * as CorePanels from './core';

Object.values(CorePanels).forEach(registerPanel);
