// Utilities
import { renderBlockStyles } from '../render';
import { mockBlockStyles, mockPageContext } from '@/src/shared/helpers/mock';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('renderBlockStyles', () => {
	describe('single pseudo rendering', () => {
		it('returns CSS for specific pseudo-class', () => {
			const styles = mockBlockStyles({ 'font-size': '16px', color: 'blue' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'hover', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, '123', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-123:hover');
			expect(result.data).toContain('font-size: 16px;');
			expect(result.data).toContain('color: blue;');
		});

		it('returns CSS for base pseudo without pseudo-class', () => {
			const styles = mockBlockStyles({ 'background-color': 'red', padding: '10px' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, '456', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-456');
			expect(result.data).toContain('background-color: red;');
			expect(result.data).toContain('padding: 10px;');
		});

		it('returns CSS with cascaded styles from device/orientation hierarchy', () => {
			const styles = mockBlockStyles({ all: { all: { base: { 'font-size': '14px', color: 'black' } }, portrait: { base: { 'font-size': '16px' } } }, mobile: { portrait: { base: { color: 'blue' } } } });
			const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'portrait', selectedPseudoID: 'base', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, '789', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-789');
			expect(result.data).toContain('font-size: 16px;'); // From portrait override
			expect(result.data).toContain('color: blue;'); // From mobile portrait override
		});

		it('returns empty CSS rule when no styles exist for context', () => {
			const styles = mockBlockStyles({});
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'hover', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'empty', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-empty:hover');
			expect(result.data).toMatch(/#block-empty:hover\s*\{\s*\}/);
		});

		it('returns success status for valid render', () => {
			const styles = mockBlockStyles({ color: 'red' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'test', pageContext);

			expect(result.success).toBe(true);
			expect(result).toHaveProperty('data');
		});

		it('handles multiple style properties in single pseudo', () => {
			const styles = mockBlockStyles({ 'font-size': '18px', 'font-weight': 'bold', 'line-height': '1.5', color: 'green', 'background-color': 'yellow', 'margin-top': '20px', 'padding-left': '15px' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'focus', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'multi', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-multi:focus');
			expect(result.data).toContain('font-size: 18px;');
			expect(result.data).toContain('font-weight: bold;');
			expect(result.data).toContain('line-height: 1.5;');
			expect(result.data).toContain('color: green;');
			expect(result.data).toContain('background-color: yellow;');
			expect(result.data).toContain('margin-top: 20px;');
			expect(result.data).toContain('padding-left: 15px;');
		});
	});

	describe('all pseudos rendering', () => {
		it('returns CSS for all registered pseudos when selectedPseudoID is all', () => {
			const styles = mockBlockStyles({ all: { all: { all: { color: 'blue' } } } });
			const blockID = 'blockID';
			const pageContext = mockPageContext();
			const result = renderBlockStyles(styles, blockID, pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			// Should contain rules for all registered pseudos
			expect(result.data).toContain(`#block-${blockID}`); // base
			expect(result.data).toContain(`#block-${blockID}:hover`);
			expect(result.data).toContain(`#block-${blockID}:focus`);
			expect(result.data).toContain(`#block-${blockID}:active`);

			// Should contain appropriate colors for base, hover, focus
			const rules = result.data.split('}').filter((r) => r.trim());
			expect(rules.length).toBeGreaterThanOrEqual(4); // base, hover, focus, active
		});

		it('returns multiple CSS rules when pseudo is all', () => {
			const styles = mockBlockStyles({ 'font-size': '16px', color: 'red' });
			const pageContext = mockPageContext();
			const result = renderBlockStyles(styles, 'multiple', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			// Should contain multiple rule blocks (one for each pseudo)
			const ruleCount = (result.data.match(/#block-multiple/g) || []).length;
			expect(ruleCount).toBeGreaterThanOrEqual(4); // At least base, hover, focus, active
		});

		it('returns different styles for different pseudos when pseudo is all', () => {
			const styles = mockBlockStyles({ all: { all: { all: { color: 'black', 'font-size': '14px' }, hover: { color: 'blue', 'font-size': '16px' }, focus: { color: 'green', 'font-size': '18px' } } } });
			const pageContext = mockPageContext();
			const result = renderBlockStyles(styles, 'diff', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('color: black;');
			expect(result.data).toContain('font-size: 14px;');
			expect(result.data).toContain('color: blue;');
			expect(result.data).toContain('font-size: 16px;');
			expect(result.data).toContain('color: green;');
			expect(result.data).toContain('font-size: 18px;');
		});

		it('handles empty styles when rendering all pseudos', () => {
			const styles = mockBlockStyles({});
			const pageContext = mockPageContext();
			const result = renderBlockStyles(styles, 'empty-all', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			// Should still generate rules for all pseudos, even if empty
			expect(result.data).toContain('#block-empty-all');
			const ruleCount = (result.data.match(/#block-empty-all/g) || []).length;
			expect(ruleCount).toBeGreaterThanOrEqual(4);
		});

		it('preserves cascade hierarchy when rendering all pseudos', () => {
			const styles = mockBlockStyles({ all: { all: { all: { 'font-size': '12px', color: 'gray' } }, portrait: { all: { 'font-size': '14px' } } }, tablet: { portrait: { all: { color: 'darkgray' } } } });
			const pageContext = mockPageContext({ store: { selectedDeviceID: 'tablet', selectedOrientationID: 'portrait', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'blockID', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			// For base pseudo, should have cascaded values
			const baseRuleMatch = result.data.match(/#block-blockID\s*\{[^}]*\}/);
			expect(baseRuleMatch).toBeTruthy();

			if (baseRuleMatch) {
				expect(baseRuleMatch[0]).toContain('font-size: 14px;'); // From portrait override
				expect(baseRuleMatch[0]).toContain('color: darkgray;'); // From tablet portrait override
			}
		});

		it('generates rules for active and visited pseudo-classes', () => {
			const styles = mockBlockStyles({ all: { all: { all: { color: 'black' }, active: { color: 'red' }, visited: { color: 'purple' } } } });
			const pageContext = mockPageContext();
			const result = renderBlockStyles(styles, 'pseudo-states', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain(':active');
			expect(result.data).toContain(':visited');
		});
	});

	describe('edge cases', () => {
		it('handles block IDs with special characters', () => {
			const styles = mockBlockStyles({ color: 'red' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'hover', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, '123-test_special', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-123-test_special:hover');
		});

		it('handles nested style hierarchy correctly', () => {
			const styles = mockBlockStyles({ all: { all: { base: { color: 'base-color' } }, landscape: { base: { color: 'landscape-color' } } }, desktop: { landscape: { base: { color: 'desktop-landscape-color' } } } });
			const pageContext = mockPageContext({ store: { selectedDeviceID: 'desktop', selectedOrientationID: 'landscape', selectedPseudoID: 'base', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'nested', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('color: desktop-landscape-color;');
		});

		it('returns valid CSS with shorthand properties', () => {
			const styles = mockBlockStyles({ margin: '10px 20px', padding: '5px' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'shorthand', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-shorthand');
			expect(result.data).toContain('margin: 10px 20px;');
			expect(result.data).toContain('padding: 5px;');
		});

		it('handles numeric style values correctly', () => {
			const styles = mockBlockStyles({ opacity: '0.5', 'z-index': '100', 'flex-grow': '1' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'active', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'numeric', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('opacity: 0.5;');
			expect(result.data).toContain('z-index: 100;');
			expect(result.data).toContain('flex-grow: 1;');
		});

		it('formats CSS with proper indentation and structure', () => {
			const styles = mockBlockStyles({ color: 'red', 'font-size': '16px' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'hover', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'format', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toMatch(/#block-format:hover\s*\{[\s\S]*\}/);
			// Should contain opening and closing braces
			expect(result.data).toContain('{');
			expect(result.data).toContain('}');
		});

		it('handles color values with various formats', () => {
			const styles = mockBlockStyles({ color: '#ff0000', 'background-color': 'rgb(255, 0, 0)', 'border-color': 'hsl(0, 100%, 50%)' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'colors', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#ff0000');
			expect(result.data).toContain('rgb(255, 0, 0)');
		});

		it('handles long block IDs', () => {
			const longId = 'very-long-block-id-with-many-segments-and-characters';
			const styles = mockBlockStyles({ color: 'red' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, longId, pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain(`#block-${longId}`);
		});

		it('returns consistent output for repeated calls', () => {
			const styles = mockBlockStyles({ color: 'red', 'font-size': '16px' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'hover', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result1 = renderBlockStyles(styles, 'consistent', pageContext);
			const result2 = renderBlockStyles(styles, 'consistent', pageContext);

			if (!result1.success || !result2.success) return;

			expect(result1.data).toEqual(result2.data);
		});
	});

	describe('integration with cascade and generate functions', () => {
		it('integrates cascading logic for complex hierarchy', () => {
			const styles = mockBlockStyles({ all: { all: { base: { color: 'black', 'font-size': '14px', 'line-height': '1.2' }, hover: { color: 'blue' } }, landscape: { base: { 'font-size': '16px' } } }, tablet: { all: { base: { 'line-height': '1.4' } }, landscape: { base: { color: 'green' } } } });
			const pageContext = mockPageContext({ store: { selectedDeviceID: 'tablet', selectedOrientationID: 'landscape', selectedPseudoID: 'base', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'integrate', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			// Should have most specific values from cascade
			expect(result.data).toContain('color: green;'); // From tablet landscape
			expect(result.data).toContain('font-size: 16px;'); // From all landscape
			expect(result.data).toContain('line-height: 1.4;'); // From tablet all
		});

		it('generates correct selectors for different pseudo-classes', () => {
			const styles = mockBlockStyles({ color: 'red' });
			const testCases = [
				{ pseudo: 'base', expected: '#block-selector' },
				{ pseudo: 'hover', expected: '#block-selector:hover' },
				{ pseudo: 'focus', expected: '#block-selector:focus' },
				{ pseudo: 'active', expected: '#block-selector:active' },
			];

			testCases.forEach(({ pseudo, expected }) => {
				const pageContext = mockPageContext({ store: { selectedPseudoID: pseudo, selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
				const result = renderBlockStyles(styles, 'selector', pageContext);

				expect(result.success).toBe(true);
				if (!result.success) return;

				expect(result.data).toContain(expected);
			});
		});

		it('handles default workbench context', () => {
			const styles = mockBlockStyles({ color: 'red' });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'workbench', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('#block-workbench');
		});

		it('handles device-specific style overrides', () => {
			const styles = mockBlockStyles({ all: { all: { all: { 'font-size': '14px' } } }, desktop: { all: { all: { 'font-size': '18px' } } } });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'desktop', selectedOrientationID: 'all', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'device-override', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('font-size: 18px;');
		});

		it('handles orientation-specific style overrides', () => {
			const styles = mockBlockStyles({ all: { all: { all: { 'font-size': '14px' } }, landscape: { all: { 'font-size': '16px' } } } });
			const pageContext = mockPageContext({ store: { selectedPseudoID: 'base', selectedDeviceID: 'all', selectedOrientationID: 'landscape', selectedWorkbenchID: 'default' } });
			const result = renderBlockStyles(styles, 'orientation-override', pageContext);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(result.data).toContain('font-size: 16px;');
		});
	});
});
