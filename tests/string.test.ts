import { splitTopLevel } from '@/utilities/string/string';

describe('splitTopLevel', () => {
	it('splits at top level only', () => {
		expect(splitTopLevel('a [b|c] d|e', '|')).toEqual(['a [b|c] d', 'e']);
		expect(splitTopLevel('a b | c d', '|')).toEqual(['a b', 'c d']);
	});
	it('does not split inside brackets', () => {
		expect(splitTopLevel('[a|b]|c', '|')).toEqual(['[a|b]', 'c']);
	});
	it('returns full string if no separator', () => {
		expect(splitTopLevel('abc', '|')).toEqual(['abc']);
	});
});
