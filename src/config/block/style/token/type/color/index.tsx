// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption } from '@/src/config/block/style/token/type/color/utilities';

// Component
import TokenColor from '@/src/config/block/style/token/type/color/component';

export const COLOR_DEFINITION: TokenTypeDefinition = {
	key: 'color',
	priority: 40,
	renderComponent: (value, onChange, options) => <TokenColor value={value} onChange={onChange} options={options} />,
	getValueType,
	getTokenType,
	getValueToken,
	createOption,
};
