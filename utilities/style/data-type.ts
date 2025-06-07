import { ExplodedDataType } from '@/types/style/data-type';

/**
 * Splits a value string into its data type structure (keyword, dimension, function).
 * Returns an object describing the type and its details.
 */
export function explodeDataType(string: string): ExplodedDataType | undefined {
	// Function: e.g. fit-content(<length [10,20]>)
	const fnMatch = string.match(/^([a-zA-Z-]+)\((.*)\)$/);
	if (fnMatch) {
		const base = fnMatch[1];
		const args = fnMatch[2].trim();
		return {
			base,
			canonical: `${base}()`,
			args,
			type: 'function',
		};
	}

	// Dimension: e.g. <length [0,10]>
	const dimMatch = string.match(/^<([a-zA-Z0-9-]+)(\s*\[([^\]]+)\])?>$/);
	if (dimMatch) {
		const base = dimMatch[1];
		const canonical = `<${base}>`;
		let args: Record<string, any> | undefined = undefined;
		if (dimMatch[3]) {
			// Try to parse min/max from [min,max] or [min,max,step]
			const range = dimMatch[3].split(',').map((s: string) => s.trim());
			if (range.length >= 2) {
				args = { min: range[0], max: range[1] };
				if (range[2]) args.step = range[2];
			} else {
				args = { range: dimMatch[3] };
			}
		}
		return {
			base,
			canonical,
			...(args ? { args } : {}),
			type: 'dimension',
		};
	}

	// Keyword: e.g. auto
	if (/^[a-zA-Z-]+$/.test(string)) {
		return {
			base: string,
			canonical: string,
			type: 'keyword',
		};
	}

	return undefined; // Not a recognized type
}


