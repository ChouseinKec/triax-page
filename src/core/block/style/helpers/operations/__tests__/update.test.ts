// Utilities
import { updateBlockStyleValues, updateBlockStyleValue, updateBlockStyles, updateBlockStyle } from '../update';
import { mockBlockStyles, mockPageContext, mockStyleContext } from '@/src/shared/helpers/mock';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('updateBlockStyleValues', () => {
	it('returns updated longhand properties for all margins', () => {
		const styles = mockBlockStyles({ all: { all: { all: { 'margin-top': '10px', 'margin-right': '10px' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues(['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], '20px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['margin-top']).toBe('20px');
		expect(allStyles['margin-right']).toBe('20px');
		expect(allStyles['margin-bottom']).toBe('20px');
		expect(allStyles['margin-left']).toBe('20px');
	});

	it('returns updated longhand properties for all paddings', () => {
		const styles = mockBlockStyles({ all: { all: { all: {} } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues(['padding-top', 'padding-right', 'padding-bottom', 'padding-left'], '15px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['padding-top']).toBe('15px');
		expect(allStyles['padding-right']).toBe('15px');
		expect(allStyles['padding-bottom']).toBe('15px');
		expect(allStyles['padding-left']).toBe('15px');
	});

	it('returns updated longhand properties for all border widths', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues(['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], '2px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['border-top-width']).toBe('2px');
		expect(allStyles['border-right-width']).toBe('2px');
		expect(allStyles['border-bottom-width']).toBe('2px');
		expect(allStyles['border-left-width']).toBe('2px');
	});

	it('handles single longhand property update', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues(['color'], 'blue', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('blue');
	});

	it('handles empty longhand array', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues([], '20px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
	});

	it('returns new object without mutating original', () => {
		const originalStyles = mockBlockStyles({ all: { all: { all: { 'margin-top': '10px' } } } });
		const styles = JSON.parse(JSON.stringify(originalStyles));
		const pageContext = mockPageContext();

		const result = updateBlockStyleValues(['margin-top', 'margin-right'], '20px', styles, pageContext);

		expect(result.success).toBe(true);
		expect(styles).toEqual(originalStyles);
	});

	it('returns success status', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyleValues(['color'], 'red', styles, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('updates styles in correct device context', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, mobile: { all: { all: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValues(['margin-top', 'margin-bottom'], '10px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.mobile.all.all['margin-top']).toBe('10px');
		expect(result.data.mobile.all.all['margin-bottom']).toBe('10px');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('updates styles in correct orientation context', () => {
		const styles = mockBlockStyles({ all: { all: { all: {} }, portrait: { all: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'portrait', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValues(['padding-left', 'padding-right'], '5px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.portrait.all['padding-left']).toBe('5px');
		expect(result.data.all.portrait.all['padding-right']).toBe('5px');
	});

	it('updates styles in correct pseudo context', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'blue' }, hover: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'all', selectedPseudoID: 'hover', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValues(['border-top-width'], '3px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.hover['border-top-width']).toBe('3px');
		expect(result.data.all.all.all.color).toBe('blue');
	});

	it('preserves other context levels during update', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' }, focus: { color: 'green' } }, portrait: { all: { color: 'blue' } } }, mobile: { all: { all: { color: 'yellow' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValues(['opacity'], '0.5', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.all.focus.color).toBe('green');
		expect(result.data.all.portrait.all.color).toBe('blue');
		expect(result.data.mobile.all.all.color).toBe('yellow');
	});
});

describe('updateBlockStyleValue', () => {
	it('returns updated single longhand property', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('color', 'blue', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('blue');
	});

	it('returns updated font-size property', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('font-size', '18px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['font-size']).toBe('18px');
	});

	it('returns updated margin-top property', () => {
		const styles = mockBlockStyles({ all: { all: { all: { 'margin-top': '10px' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('margin-top', '20px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['margin-top']).toBe('20px');
	});

	it('returns new object without mutating original', () => {
		const originalStyles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const styles = JSON.parse(JSON.stringify(originalStyles));
		const pageContext = mockPageContext();

		updateBlockStyleValue('color', 'blue', styles, pageContext);

		expect(styles).toEqual(originalStyles);
	});

	it('handles adding new property to existing styles', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('background-color', 'yellow', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['background-color']).toBe('yellow');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles adding new property to empty styles', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('opacity', '0.5', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.opacity).toBe('0.5');
	});

	it('returns success status', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('color', 'red', styles, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('updates in correct device/orientation/pseudo context', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, tablet: { landscape: { hover: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'tablet', selectedOrientationID: 'landscape', selectedPseudoID: 'hover', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValue('opacity', '0.8', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.tablet.landscape.hover.opacity).toBe('0.8');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('preserves other device styles during update', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, mobile: { all: { all: { color: 'blue' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyleValue('opacity', '0.5', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.mobile.all.all.color).toBe('blue');
		expect(result.data.mobile.all.all.opacity).toBe('0.5');
	});

	it('handles overwriting existing property', () => {
		const styles = mockBlockStyles({ all: { all: { all: { 'font-size': '14px', color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyleValue('font-size', '20px', styles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['font-size']).toBe('20px');
		expect(result.data.all.all.all.color).toBe('red');
	});
});

describe('updateBlockStyles', () => {
	it('returns multiple updated properties at once', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { color: 'red', 'font-size': '16px', 'background-color': 'blue' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles.color).toBe('red');
		expect(allStyles['font-size']).toBe('16px');
		expect(allStyles['background-color']).toBe('blue');
	});

	it('handles merging new styles with existing ones', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red', margin: '10px' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { 'font-size': '16px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles.color).toBe('red');
		expect(allStyles.margin).toBe('10px');
		expect(allStyles['font-size']).toBe('16px');
	});

	it('returns overridden properties', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red', 'font-size': '14px' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { color: 'blue', 'font-size': '18px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles.color).toBe('blue');
		expect(allStyles['font-size']).toBe('18px');
	});

	it('handles empty properties object', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, {}, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
	});

	it('returns new object without mutating original', () => {
		const originalStyles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const styles = JSON.parse(JSON.stringify(originalStyles));
		const pageContext = mockPageContext();

		updateBlockStyles(styles, { 'font-size': '16px' }, pageContext);

		expect(styles).toEqual(originalStyles);
	});

	it('returns different object reference', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { 'font-size': '16px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).not.toBe(styles);
	});

	it('returns success status', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { color: 'red' }, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('preserves other devices when updating specific device', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, mobile: { all: { all: { color: 'blue' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { 'font-size': '16px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.mobile.all.all.color).toBe('blue');
		expect(result.data.mobile.all.all['font-size']).toBe('16px');
	});

	it('preserves other orientations when updating specific orientation', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } }, portrait: { all: { color: 'green' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'portrait', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { opacity: '0.5' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.portrait.all.color).toBe('green');
		expect(result.data.all.portrait.all.opacity).toBe('0.5');
	});

	it('preserves other pseudos when updating specific pseudo', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' }, hover: { color: 'blue' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'all', selectedPseudoID: 'hover', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { 'font-weight': 'bold' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.all.hover.color).toBe('blue');
		expect(result.data.all.all.hover['font-weight']).toBe('bold');
	});

	it('handles creating nested structure when empty', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const result = updateBlockStyles(styles, { color: 'red' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles creating device when not existing', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'desktop', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { 'font-size': '16px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.desktop.all.all['font-size']).toBe('16px');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles creating orientation when not existing', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'landscape', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { opacity: '0.7' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.landscape.all.opacity).toBe('0.7');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles creating pseudo when not existing', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'all', selectedOrientationID: 'all', selectedPseudoID: 'focus', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { 'outline-width': '2px' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.focus['outline-width']).toBe('2px');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles updating multiple cascade levels simultaneously', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, tablet: { portrait: { hover: { color: 'blue' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'tablet', selectedOrientationID: 'portrait', selectedPseudoID: 'hover', selectedWorkbenchID: 'default' } });
		const result = updateBlockStyles(styles, { 'font-size': '16px', 'font-weight': 'bold' }, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.tablet.portrait.hover['font-size']).toBe('16px');
		expect(result.data.tablet.portrait.hover['font-weight']).toBe('bold');
		expect(result.data.tablet.portrait.hover.color).toBe('blue');
		expect(result.data.all.all.all.color).toBe('red');
	});
});

describe('updateBlockStyle', () => {
	it('returns expanded margin shorthand for all longhand properties', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin', '10px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['margin-top']).toBe('10px');
		expect(allStyles['margin-right']).toBe('10px');
		expect(allStyles['margin-bottom']).toBe('10px');
		expect(allStyles['margin-left']).toBe('10px');
	});

	it('returns expanded padding shorthand', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('padding', '15px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['padding-top']).toBe('15px');
		expect(allStyles['padding-right']).toBe('15px');
		expect(allStyles['padding-bottom']).toBe('15px');
		expect(allStyles['padding-left']).toBe('15px');
	});

	it('returns expanded border-width shorthand', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('border-width', '2px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const allStyles = result.data.all.all.all;
		expect(allStyles['border-top-width']).toBe('2px');
		expect(allStyles['border-right-width']).toBe('2px');
		expect(allStyles['border-bottom-width']).toBe('2px');
		expect(allStyles['border-left-width']).toBe('2px');
	});

	it('returns updated longhand property directly', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('color', 'red', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
	});

	it('returns updated margin-top longhand only', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin-top', '10px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['margin-top']).toBe('10px');
		expect(result.data.all.all.all['margin-right']).toBeUndefined();
	});

	it('returns updated font-size longhand', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('font-size', '18px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['font-size']).toBe('18px');
	});

	it('returns success status', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('color', 'red', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('handles shorthand expansion in device/orientation/pseudo context', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, mobile: { portrait: { hover: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'portrait', selectedPseudoID: 'hover', selectedWorkbenchID: 'default' } });
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin', '10px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.mobile.portrait.hover['margin-top']).toBe('10px');
		expect(result.data.mobile.portrait.hover['margin-bottom']).toBe('10px');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('handles longhand update in device/orientation/pseudo context', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, tablet: { landscape: { focus: {} } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'tablet', selectedOrientationID: 'landscape', selectedPseudoID: 'focus', selectedWorkbenchID: 'default' } });
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('opacity', '0.7', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.tablet.landscape.focus.opacity).toBe('0.7');
		expect(result.data.all.all.all.color).toBe('red');
	});

	it('returns new object without mutating original when updating shorthand', () => {
		const originalStyles = mockBlockStyles({});
		const styles = JSON.parse(JSON.stringify(originalStyles));
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin', '10px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(styles).toEqual(originalStyles);
		expect(result.data).not.toBe(styles);
	});

	it('returns new object without mutating original when updating longhand', () => {
		const originalStyles = mockBlockStyles({});
		const styles = JSON.parse(JSON.stringify(originalStyles));
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();

		const result = updateBlockStyle('color', 'red', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;
		
		expect(styles).toEqual(originalStyles);
		expect(result.data).not.toBe(styles);
	});

	it('preserves existing styles during shorthand expansion', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red', 'font-size': '16px' } } } });
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin', '10px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.all.all['font-size']).toBe('16px');
		expect(result.data.all.all.all['margin-top']).toBe('10px');
	});

	it('preserves other device contexts during update', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } }, mobile: { all: { all: { color: 'blue' } } } });
		const pageContext = mockPageContext({ store: { selectedDeviceID: 'mobile', selectedOrientationID: 'all', selectedPseudoID: 'all', selectedWorkbenchID: 'default' } });
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('padding', '15px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.mobile.all.all.color).toBe('blue');
		expect(result.data.mobile.all.all['padding-top']).toBe('15px');
	});

	it('handles overwriting existing shorthand with new value', () => {
		const styles = mockBlockStyles({ all: { all: { all: { 'margin-top': '5px', 'margin-right': '5px', 'margin-bottom': '5px', 'margin-left': '5px' } } } });
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('margin', '20px', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all['margin-top']).toBe('20px');
		expect(result.data.all.all.all['margin-right']).toBe('20px');
		expect(result.data.all.all.all['margin-bottom']).toBe('20px');
		expect(result.data.all.all.all['margin-left']).toBe('20px');
	});

	it('handles updating with complex CSS values', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('background', 'linear-gradient(to right, red, blue)', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.background).toBe('linear-gradient(to right, red, blue)');
	});

	it('handles updating with calc() values', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('width', 'calc(100% - 20px)', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.width).toBe('calc(100% - 20px)');
	});

	it('handles updating with CSS variables', () => {
		const styles = mockBlockStyles({});
		const pageContext = mockPageContext();
		const styleContext = mockStyleContext();
		const result = updateBlockStyle('color', 'var(--primary-color)', styles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('var(--primary-color)');
	});
});
