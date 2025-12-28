// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption } from '@/src/config/block/style/token/type/link/utilities';

// Component
import TokenLink from '@/src/config/block/style/token/type/link/component';

export const LINK_DEFINITION: TokenTypeDefinition = {
	key: 'link',
	priority: 30,
	renderComponent: (value, onChange, options) => <TokenLink value={value} onChange={onChange} options={options} />,
	getValueType,
	getTokenType,
	getValueToken,
	createOption
};
