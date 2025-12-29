// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption,getTokenCanonical } from '@/src/config/block/style/token/type/number/utilities';

// Component
import TokenNumber from '@/src/config/block/style/token/type/number/component';

export const NUMBER_DEFINITION: TokenTypeDefinition = {
	key: 'number',
	priority: 70,
	getTokenComponent: (value, onChange, options) => <TokenNumber value={value} onChange={onChange} options={options} />,
	getTokenCanonical,
	getValueType,
	getTokenType,
	getValueToken,
	createOption,
};
