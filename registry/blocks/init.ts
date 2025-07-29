import { registerBlock } from './registry';
import * as CoreBlocks from './core';

Object.values(CoreBlocks).forEach(registerBlock);
