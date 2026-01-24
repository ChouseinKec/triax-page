// Types
import type { StyleValueSeparator } from '@/core/block/style/types';

/**
 * Extracts separators from a single variation string.
 * @param variation - The variation string to extract separators from.
 */
export function extractSeparator(variation: string, separators: string[] = [' ', ',', '/']): string[] {
	// Clean and normalize the variation string for consistent separator extraction
	const cleaned = variation
		// Normalize whitespace
		.replace(/\s+/g, ' ')
		// Replace angle-bracketed tokens
		.replace(/<[^>]*>/g, 'token')
		// Remove spaces around '/' and ','
		.replace(/\s*([/,])\s*/g, '$1')
		// Replace functions (including nested) and their arguments with 'token'
		.replace(/([a-zA-Z-]+\([^()]*\))/g, function replacer(match) {
			let depth = 0;
			for (let i = 0; i < match.length; i++) {
				if (match[i] === '(') depth++;
				else if (match[i] === ')') depth--;
				if (depth === 0 && match[i] === ')') {
					return `token${match.slice(i + 1)}`;
				}
			}
			return 'token';
		})
		.replace(/([a-zA-Z-]+\((?:[^()t]|t(?!oken)|token)*\))/g, 'token')
		.trim();

	// Build a regex to match all possible separators
	const separatorPattern = separators.map((s) => (s === ' ' ? '\\s+' : s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).join('|');
	const separatorRegex = new RegExp(`(${separatorPattern})`, 'g');

	// Extract separators
	const separatorsFound: string[] = [];
	let match;
	while ((match = separatorRegex.exec(cleaned)) !== null) {
		separatorsFound.push(match[1] as StyleValueSeparator);
	}
	return separatorsFound;
}

/**
 * Extracts separators between tokens for each variation in variations.
 * Returns an array of arrays: one array of separators per variation.
 * @param variations - An array of CSS value variations (e.g., ['a b / c', 'd e / f']).
 */
export function extractSeparators(variations: string[]): string[][] {
	const arr = Array.isArray(variations) ? variations : [...variations];
	return arr.map((variation) => extractSeparator(variation));
}
