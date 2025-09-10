
import { registerPanel } from './registry';
import * as CorePanels from './definitions';

Object.values(CorePanels).forEach(registerPanel);
