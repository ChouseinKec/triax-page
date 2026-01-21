// Utilities
import { pickPseudo } from '../pseudo';
import { mockPseudoInstance } from '@/shared/helpers/mock';

// Types
import type { PseudoDefinitionRecord } from '@/core/layout/page/types';

describe('pickPseudo', () => {
	const mockPseudo1 = mockPseudoInstance({
		id: 'pseudo-1',
		name: 'Hover',
		value: 'hover',
	});

	const mockPseudo2 = mockPseudoInstance({
		id: 'pseudo-2',
		name: 'Active',
		value: 'active',
	});

	const mockPseudos: PseudoDefinitionRecord = {
		'pseudo-1': mockPseudo1,
		'pseudo-2': mockPseudo2,
	};

	it('returns pseudo when id exists', () => {
		const result = pickPseudo('pseudo-1', mockPseudos);
		expect(result.success).toBe(true);

		if (!result.success) return;
		expect(result.data).toBe(mockPseudo1);
	});

	it('returns error when id missing or unknown', () => {
		const missing = pickPseudo('nonexistent-pseudo', mockPseudos);
		expect(missing.success).toBe(false);

		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-pseudo');

		const emptyId = pickPseudo('', mockPseudos);
		expect(emptyId.success).toBe(false);
	});

	it('returns error when pseudo map empty', () => {
		const emptyMap = pickPseudo('pseudo-1', {});
		expect(emptyMap.success).toBe(false);
	});

	it('returns data only on success and error only on failure', () => {
		const ok = pickPseudo('pseudo-2', mockPseudos);
		expect(ok.success).toBe(true);

		if (!ok.success) return;
		expect(ok).toHaveProperty('data');
		expect(ok).not.toHaveProperty('error');

		const fail = pickPseudo('unknown', mockPseudos);
		expect(fail.success).toBe(false);
		if (fail.success) return;

		expect(fail).toHaveProperty('error');
		expect(fail).not.toHaveProperty('data');
	});
});
