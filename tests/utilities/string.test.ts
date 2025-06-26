import { splitAdvanced } from '@/utilities/string/string';

describe('splitAdvanced', () => {
	it('splits at top level only', () => {
		expect(splitAdvanced('a [b|c] d|e', '|')).toEqual(['a [b|c] d', 'e']);
		expect(splitAdvanced('a b | c d', '|')).toEqual(['a b', 'c d']);
	});
	it('does not split inside brackets', () => {
		expect(splitAdvanced('[a|b]|c', '|')).toEqual(['[a|b]', 'c']);
	});
	it('returns full string if no separator', () => {
		expect(splitAdvanced('abc', '|')).toEqual(['abc']);
	});
});
