// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getTokenType, getValueType, getValueToken, createOption,getTokenCanonical } from '@/src/config/block/style/token/type/keyword/utilities';

// Component
import TokenKeyword from '@/src/config/block/style/token/type/keyword/component';

export const KEYWORD_DEFINITION: TokenTypeDefinition = {
	key: 'keyword',
	priority: 10,
	getTokenComponent: (value, onChange, options) => <TokenKeyword value={value} onChange={onChange} options={options} />,
	getTokenCanonical,
	getValueType,
	getTokenType,
	getValueToken,
	createOption,
};
