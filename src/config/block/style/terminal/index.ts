// Registry
import { registerTerminals, registerNonTerminals } from '@/core/block/style/state/registry';

// Constants
import { TERMINALS } from '@/config/block/style/terminal/terminal';
import { NON_TERMINALS } from '@/config/block/style/terminal/non-terminal';

registerTerminals(TERMINALS);
registerNonTerminals(NON_TERMINALS);
