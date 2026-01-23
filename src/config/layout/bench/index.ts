// Registry
import { registerBenches, registerActions } from '@/core/layout/bench/state/registry';

import { BenchDefinitionLogic } from './logic';
import { BenchDefinitionMain, ActionDefinitionMain } from './main';

// Register benches and actions directly
registerBenches([BenchDefinitionMain, BenchDefinitionLogic]);
registerActions([ActionDefinitionMain]);
