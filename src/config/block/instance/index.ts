// Registry
import { registerBlocks } from '@/core/block/instance/registries';

import BlockContainerDefinition from './container';
import BlockMarkdownDefinition from './markdown';
import BlockTextDefinition from './text';

// Register blocks directly
registerBlocks([BlockContainerDefinition, BlockMarkdownDefinition, BlockTextDefinition]);