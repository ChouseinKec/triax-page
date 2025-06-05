import { ValueComponents } from '@/types/style/parse';
/**
 * Extracts unique value components from expanded CSS value combinations.
 * @param values Array of expanded value strings (e.g., ['auto', '<number [0,∞]>', ...])
 * @returns { keyword: string[], function: string[], dimension: string[] }
 */
export function extractCSSValueComponents(values: string[]): ValueComponents {
	const keywordSet = new Set<string>();
	const functionSet = new Set<string>();
	const dimensionSet = new Set<string>();

	for (const value of values) {
		// Split by whitespace and operators, but keep function calls and dimensions together
		const tokens = value.match(/<[^>]+>|\w+\([^)]+\)|[a-zA-Z-]+|\S/g) || [];

		for (const token of tokens) {
			if (/^<[^>]+>$/.test(token)) {
				dimensionSet.add(token);
			} else if (/^[a-zA-Z-]+\([^)]+\)$/.test(token)) {
				const fnName = token.replace(/\(.*/, '()');
				functionSet.add(fnName);
			} else if (/^[a-zA-Z-]+$/.test(token)) {
				keywordSet.add(token);
			}
		}
	}

	return {
		keyword: Array.from(keywordSet),
		function: Array.from(functionSet),
		dimension: Array.from(dimensionSet),
	};
}
