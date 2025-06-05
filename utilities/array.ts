// General-purpose array and string helpers for use across the codebase.

/**
 * Splits a string by a separator at the top level (not inside brackets).
 * Handles (), [], and <> as grouping symbols.
 * Example: splitTopLevel('a [b|c] d|e', '|') → ['a [b|c] d', 'e']
 * @param s - The string to split
 * @param sep - The separator string
 * @returns Array of split strings
 */
export function splitTopLevel(s: string, sep: string): string[] {
	const result: string[] = [];
	let depthSquare = 0;
	let depthRound = 0;
	let depthAngle = 0;
	let buf = '';
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (c === '[') depthSquare++;
		if (c === ']') depthSquare--;
		if (c === '(') depthRound++;
		if (c === ')') depthRound--;
		if (c === '<') depthAngle++;
		if (c === '>') depthAngle--;
		// Only split if not inside any brackets
		if (depthSquare === 0 && depthRound === 0 && depthAngle === 0 && s.slice(i, i + sep.length) === sep) {
			result.push(buf.trim());
			buf = '';
			i += sep.length - 1;
		} else {
			buf += c;
		}
	}
	if (buf.trim()) result.push(buf.trim());
	return result;
}

/**
 * Returns the cross product of arrays.
 * For a list of arrays, this generates all possible ways to pick one item from each array,
 * combining them into a new array. The result is an array of arrays, where each inner array
 * contains one element from each input array, in order.
 *
 * Example: generateCrossProduct([[1, 2], ['a', 'b']]) → [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @param arrays - Array of arrays
 * @returns Array of arrays (cross product)
 */
export function generateCrossProduct<T>(arrays: T[][]): T[][] {
	if (!arrays.length) return [[]];
	const [first, ...rest] = arrays;
	const restProduct = generateCrossProduct(rest);

	const result: T[][] = [];
	for (const f of first) {
		for (const r of restProduct) {
			result.push([f, ...r]);
		}
	}
	return result;
}

/**
 * Returns all subsets of an array (the power set).
 * Uses bitwise operations to efficiently generate every possible subset.
 * Example: generateAllSubsets(['a', 'b']) → [[], ['a'], ['b'], ['a', 'b']]
 * @param arr - The input array
 * @returns Array of subsets (combinations)
 */
export function generateAllSubsets<T>(arr: T[]): T[][] {
	const result: T[][] = [];
	const total = 1 << arr.length;
	for (let i = 0; i < total; i++) {
		const subset: T[] = [];
		for (let j = 0; j < arr.length; j++) {
			if (i & (1 << j)) subset.push(arr[j]);
		}
		result.push(subset);
	}
	return result;
}

/**
 * Generates all possible permutations of the input array.
 * Example: generatePermutations(['a','b']) → [['a','b'], ['b','a']]
 * @param arr - Array of elements
 * @returns Array of permutations (arrays)
 */
export function generatePermutations(arr: string[]): string[][] {
	if (arr.length === 0) return [[]];
	const result: string[][] = [];
	for (let i = 0; i < arr.length; i++) {
		const current = arr[i];
		const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
		const permsOfRest = generatePermutations(remaining);
		for (const perm of permsOfRest) {
			result.push([current, ...perm]);
		}
	}
	return result;
}
