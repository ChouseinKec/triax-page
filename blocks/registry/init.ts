import { registerBlock } from './block';
import * as CoreBlocks from '../core';

Object.values(CoreBlocks).forEach(registerBlock);
