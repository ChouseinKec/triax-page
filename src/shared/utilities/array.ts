/**
 * Returns all non-empty subsets of an array.
 *
 * Uses bitmask iteration: for `n` elements there are `2ⁿ - 1` non-empty subsets. Each
 * integer from `1` to `2ⁿ - 1` is treated as a bitmask where bit `i` being set means
 * element `i` is included in that subset.
 *
 * @param arr - The input array to generate subsets from.
 * @returns All `2ⁿ - 1` non-empty subsets. Prepend `[]` manually if the empty subset is needed.
 *
 * @example generateSubsets([A, B]) → [[A], [B], [A, B]]
 */
export function generateSubsets<T>(arr: T[]): T[][] {
	const result: T[][] = [];
	const total = 1 << arr.length;
	for (let i = 1; i < total; i++) {
		const subset: T[] = [];
		for (let j = 0; j < arr.length; j++) {
			if (i & (1 << j)) subset.push(arr[j]);
		}
		result.push(subset);
	}
	return result;
}

/**
 * Returns the cartesian product of an array of arrays.
 *
 * Picks one element from each inner array and combines them into a tuple, producing
 * every possible combination. The result length equals the product of all inner array lengths.
 *
 * @param arr - An array of arrays to compute the cartesian product of.
 * @returns All combinations, where each entry is a tuple of one element per input array.
 *
 * @example generateCartesian([[A, B], [C, D]]) → [[A,C], [A,D], [B,C], [B,D]]
 */
export function generateCartesian<T>(arr: T[][]): T[][] {
	if (!arr.length) return [[]];
	const [first, ...rest] = arr;
	const restProduct = generateCartesian(rest);

	const result: T[][] = [];
	for (const f of first) {
		for (const r of restProduct) {
			result.push([f, ...r]);
		}
	}
	return result;
}

/**
 * Returns all possible permutations of an array.
 *
 * Every ordering of the input elements is included exactly once.
 * The result length equals `n!` where `n` is the input length.
 *
 * @param arr - The array to permute.
 * @returns All `n!` orderings of the input elements.
 *
 * @example generatePermutations([A, B, C]) → [[A,B,C], [A,C,B], [B,A,C], [B,C,A], [C,A,B], [C,B,A]]
 */
export function generatePermutations<T>(arr: T[]): T[][] {
	if (arr.length === 0) return [[]];
	const result: T[][] = [];
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
 * Interleaves two arrays by placing `separators[i]` between `items[i]` and `items[i+1]`.
 *
 * The array equivalent of `joinAdvanced` — same positional interleaving pattern but
 * for arbitrary element types instead of strings. Extra separators beyond `items.length - 1`
 * are ignored.
 *
 * @param items - The primary items to interleave.
 * @param separators - The separators to place between consecutive items.
 * @returns A new flat array with separators woven between items.
 *
 * @example mergeAdvanced([A, B, C], [S1, S2]) → [A, S1, B, S2, C]
 */
export function mergeAdvanced<T>(items: T[], separators: T[]): T[] {
	return items.flatMap((item, i) => (i < separators.length ? [item, separators[i]] : [item]));
}

/**
 * Splits an array into sub-arrays at every element that satisfies `predicate`.
 *
 * The array equivalent of `String.prototype.split` — matching elements act as
 * separators and are excluded from the result. Always returns at least one
 * sub-array (potentially empty).
 *
 * @param arr - The input array to split.
 * @param predicate - Returns true for elements that should act as separators.
 * @returns Sub-arrays between (and around) matching elements.
 *
 * @example sliceAdvanced([A, S, B, S, C], x => x === S) → [[A], [B], [C]]
 */
export function sliceAdvanced<T>(arr: T[], predicate: (item: T) => boolean): T[][] {
	const result: T[][] = [];
	let current: T[] = [];
	for (const item of arr) {
		if (predicate(item)) {
			result.push(current);
			current = [];
		} else {
			current.push(item);
		}
	}
	result.push(current);
	return result;
}

/**
 * Groups an array of objects by the value of a given property.
 *
 * Objects with the same value at `prop` are collected into the same bucket.
 * The returned record maps each distinct value (as a string) to its objects.
 *
 * @param arr - The array of objects to group.
 * @param prop - The property key to group by.
 * @returns A record mapping each distinct property value to the objects that have it.
 *
 * @example groupBy([{type:'a'}, {type:'b'}, {type:'a'}], 'type') → { a: [...], b: [...] }
 */
export function groupBy<T extends Record<string, unknown>>(arr: T[], prop: keyof T): Record<string, T[]> {
	return arr.reduce(
		(acc, item) => {
			const key = String(item[prop]);
			if (!acc[key]) acc[key] = [];
			acc[key].push(item);
			return acc;
		},
		{} as Record<string, T[]>,
	);
}
