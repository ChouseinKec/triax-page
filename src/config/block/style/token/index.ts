// Constants
import { TOKEN_DEFINITIONS } from '@/src/config/block/style/token/token';

import { COLOR_DEFINITION } from '@/src/config/block/style/token/type/color';
import { FUNCTION_DEFINITION } from '@/src/config/block/style/token/type/function';
import { INTEGER_DEFINITION } from '@/src/config/block/style/token/type/integer';
import { KEYWORD_DEFINITION } from '@/src/config/block/style/token/type/keyword';
import { LENGTH_DEFINITION } from '@/src/config/block/style/token/type/length';
import { LINK_DEFINITION } from '@/src/config/block/style/token/type/link';
import { NUMBER_DEFINITION } from '@/src/config/block/style/token/type/number';

export const TOKEN_TYPE_DEFINITIONS = [INTEGER_DEFINITION, NUMBER_DEFINITION, LENGTH_DEFINITION, COLOR_DEFINITION, KEYWORD_DEFINITION, LINK_DEFINITION, FUNCTION_DEFINITION];

export const CoreTokens = TOKEN_DEFINITIONS;
export const CoreTokenTypes = TOKEN_TYPE_DEFINITIONS;
