import { matchVariations, deriveVariations, deriveConstraint, deriveValueTokens } from '@/core/block/style/utilities';

import { NON_TERMINALS } from '@/config/block/style/terminal/non-terminal';
import { TERMINALS } from '@/config/block/style/terminal/terminal';

export const validate = (value: string, syntax: string): boolean => {
	const constraint = deriveConstraint(syntax, NON_TERMINALS);
	const variations = deriveVariations(constraint);
	const valueTokens = deriveValueTokens(value, TERMINALS);

	const matched = matchVariations(valueTokens, variations, false);
	return matched.full !== -1;
};
