// Types
import type { TokenTypeDefinition } from '@/core/block/style/definition/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption,getTokenCanonical } from '@/config/block/style/token/type/length/utilities';

// Component
import TokenLength from '@/config/block/style/token/type/length/component';

export const LENGTH_DEFINITION: TokenTypeDefinition = {
	key: 'length',
	priority: 20,
	getTokenComponent: (value, onChange, options) => <TokenLength value={value} onChange={onChange} options={options} />,
	getTokenCanonical,
	getValueType,
	getTokenType,
	getValueToken,
	createOption
};
