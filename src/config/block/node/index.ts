// Registry
import { registerNodes } from '@/core/block/node/definition/registries';

import BlockContainerDefinition from './container';
import BlockMarkdownDefinition from './markdown';
import BlockTextDefinition from './text';

// Register blocks directly
registerNodes([BlockContainerDefinition, BlockMarkdownDefinition, BlockTextDefinition]);