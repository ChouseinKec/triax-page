/**
 * Joins an array of values with their corresponding separators.
 * If no separators are provided, joins with a single space.
 * @param inputs - The array of values to join.
 * @param separators - The array of separators to use between values.(Defaults to a single space if empty)
 */
export function joinAdvanced(inputs: string[], separators: string[]): string {
    if (!separators.length) return inputs.join(' ');
    let result = '';

    for (let i = 0; i < inputs.length; i++) {
        result += inputs[i];
        if (separators[i]) result += separators[i];
    }
    return result.trim();
}