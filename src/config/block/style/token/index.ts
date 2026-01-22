// Registry
import { registerTokens, registerTokenTypes } from '@/core/block/style/registries';

// Constants
import { TOKEN_DEFINITIONS } from '@/config/block/style/token/token';

import { COLOR_DEFINITION } from '@/config/block/style/token/type/color/definition';
import { FUNCTION_DEFINITION } from '@/config/block/style/token/type/function/definition';
import { INTEGER_DEFINITION } from '@/config/block/style/token/type/integer/definition';
import { KEYWORD_DEFINITION } from '@/config/block/style/token/type/keyword/definition';
import { LENGTH_DEFINITION } from '@/config/block/style/token/type/length/definition';
import { LINK_DEFINITION } from '@/config/block/style/token/type/link/definition';
import { NUMBER_DEFINITION } from '@/config/block/style/token/type/number/definition';

// Register tokens and token types directly
registerTokens(TOKEN_DEFINITIONS);
registerTokenTypes([INTEGER_DEFINITION, NUMBER_DEFINITION, LENGTH_DEFINITION, COLOR_DEFINITION, KEYWORD_DEFINITION, LINK_DEFINITION, FUNCTION_DEFINITION]);
