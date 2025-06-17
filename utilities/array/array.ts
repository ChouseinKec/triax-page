/**
 * Returns the cross product of arrays.
 * For a list of arrays, this generates all possible ways to pick one item from each array,
 * combining them into a new array. The result is an array of arrays, where each inner array
 * contains one element from each input array, in order.
 *
 * @param arrays - Array of arrays
 * @returns Array of arrays (cross product)
 * @example
 * generateCrossProduct([[1, 2], ['a', 'b']]) → [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
function generateCrossProduct<T>(arrays: T[][]): T[][] {
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
 * @param arr - The input array
 * @returns Array of subsets (combinations)
 * @example
 * generateAllSubsets(['a', 'b']) → [[], ['a'], ['b'], ['a', 'b']]
 * 
 */
function generateAllSubsets<T>(arr: T[]): T[][] {
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
 * @param arr - Array of elements
 * @returns Array of permutations (arrays)
 * @example
 * generatePermutations(['a', 'b']) → [['a', 'b'], ['b', 'a']]
 */
function generatePermutations(arr: string[]): string[][] {
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
 * Returns an array of arrays, where each inner array contains the unique values found in that column
 * across all rows of the input 2D array.
 *
 * @param rows - A 2D array (array of arrays) of values.
 * @returns Array of arrays, one for each column.
 * @example
 * getColumnValueSets([
 *   ['a', 'b'],
 *   ['a', 'c'],
 *   ['d', 'b']
 * ]) // [['a', 'd'], ['b', 'c']]
 * → [['a', 'd'], ['b', 'c']]
 */
function getColumnSets<T>(rows: T[][]): T[][] {
	if (!rows.length) return [];
	const maxCols = Math.max(...rows.map((row) => row.length));
	const columns: T[][] = Array.from({ length: maxCols }, () => []);
	for (const row of rows) {
		for (let i = 0; i < row.length; i++) {
			if (!columns[i].includes(row[i])) {
				columns[i].push(row[i]);
			}
		}
	}
	return columns;
}

/**
 * Groups an array of objects by a given property.
 * @param arr - The array of objects to group
 * @param prop - The property name to group by
 * @returns An object where keys are property values and values are arrays of objects with that property
 * @example
 * groupBy([{type: 'a'}, {type: 'b'}, {type: 'a'}], 'type')
 * → { a: [{type: 'a'}, {type: 'a'}], b: [{type: 'b'}] }
 */
export function groupBy<T extends Record<string, any>>(arr: T[], prop: keyof T): Record<string, T[]> {
    return arr.reduce((acc, item) => {
        const key = String(item[prop]);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export { generateCrossProduct, generateAllSubsets, generatePermutations, getColumnSets };
