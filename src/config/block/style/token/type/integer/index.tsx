// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, getTokenParam, createOption } from '@/src/config/block/style/token/type/integer/utilities';

// Component
import TokenInteger from '@/src/config/block/style/token/type/integer/component';

export const INTEGER_DEFINITION: TokenTypeDefinition = {
	key: 'integer',
	priority: 60,
	renderComponent: (value, onChange, options) => <TokenInteger value={value} onChange={onChange} options={options} />,
	getTokenType,
	getValueType,
	getValueToken,
	getTokenParam,
	createOption,
};
