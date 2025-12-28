// Types
import type { TokenTypeDefinition } from '@/src/core/block/style/types/token';

// Utilities
import { getValueType, getTokenType, getValueToken, createOption } from '@/src/config/block/style/token/type/function/utilities';

// Component
import TokenFunction from '@/src/config/block/style/token/type/function/component';

export const FUNCTION_DEFINITION: TokenTypeDefinition = {
	key: 'function',
	priority: 50,
	renderComponent: (value, onChange, options) => <TokenFunction value={value} onChange={onChange} options={options} />,
	getTokenType,
	getValueType,
	getValueToken,
	createOption,
};
