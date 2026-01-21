// Types
import type { TokenTypeDefinition } from '@/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption,getTokenCanonical } from '@/config/block/style/token/type/link/utilities';

// Component
import TokenLink from '@/config/block/style/token/type/link/component';

export const LINK_DEFINITION: TokenTypeDefinition = {
	key: 'link',
	priority: 30,
	getTokenComponent: (value, onChange, options) => <TokenLink value={value} onChange={onChange} options={options} />,
	getTokenCanonical,
	getValueType,
	getTokenType,
	getValueToken,
	createOption
};
