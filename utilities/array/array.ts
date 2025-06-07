import { splitTopLevel } from '@/utilities/string/string';

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

/**
 * Returns the maximum length of any subarray (after splitting each string by separators).
 * Used for slot/column calculations in value helpers.
 */
export function countSubArrayLength(variations: string[], separators: string[] = [' ', ',', '/']): number {
    let maxSlots = 0;
    for (const variation of variations) {
        const slots = splitTopLevel(variation, separators);
        if (slots.length > maxSlots) maxSlots = slots.length;
    }
    return maxSlots;
}
