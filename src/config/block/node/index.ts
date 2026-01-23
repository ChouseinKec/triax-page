// Registry
import { registerNodes } from '@/core/block/node/definition/states/registry';

import BlockContainerDefinition from './container';
import BlockMarkdownDefinition from './markdown';

// Register blocks directly
registerNodes([BlockContainerDefinition, BlockMarkdownDefinition]);