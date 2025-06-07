import { CSSUnits, CSSUnit, CSSUnitCategory, CSSUnitSupported } from '@/types/style/units';
import { CSSDimensions } from '@/types/style/data';
/**
 * Helper function to create a CSSUnit object.
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @param category - The category of the unit (e.g. 'relative', 'absolute').
 * @param supported - The support status of the unit (e.g. 'widely', 'not widely').
 * @returns A CSSUnit object with all metadata fields populated.
 */
function createUnit(name: CSSUnits, category: CSSUnitCategory, group: CSSDimensions, supported: CSSUnitSupported): CSSUnit {
	return {
		type: 'unit',
		name,
		value: name,
		supported,
		category,
		group,
	};
}

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a CSSUnit object describing the unit's name, category, and support status.
 * Used for unit validation, UI dropdowns, and documentation.
 */
export const CSSUnitDefs: Partial<Record<CSSUnits, CSSUnit>> = {
	fr: createUnit('fr', 'relative', 'flex', 'widely'),
	em: createUnit('em', 'relative', 'length', 'widely'),
	rem: createUnit('rem', 'relative', 'length', 'widely'),
	vh: createUnit('vh', 'relative', 'length', 'widely'),
	vw: createUnit('vw', 'relative', 'length', 'widely'),
	vmax: createUnit('vmax', 'relative', 'length', 'widely'),
	vmin: createUnit('vmin', 'relative', 'length', 'widely'),
	// ex: createUnit('ex', 'relative', 'length', 'not widely'),
	// ic: createUnit('ic', 'relative', 'length', 'not widely'),
	// lh: createUnit('lh', 'relative', 'length', 'not widely'),
	// cap: createUnit('cap', 'relative', 'length', 'not widely'),
	// ch: createUnit('ch', 'relative', 'length', 'not widely'),
	// rcap: createUnit('rcap', 'relative', 'length', 'not widely'),
	// rch: createUnit('rch', 'relative', 'length', 'not widely'),
	// rex: createUnit('rex', 'relative', 'length', 'not widely'),
	// ric: createUnit('ric', 'relative', 'length', 'not widely'),
	// rlh: createUnit('rlh', 'relative', 'length', 'not widely'),
	// vb: createUnit('vb', 'relative', 'length', 'not widely'),
	// vi: createUnit('vi', 'relative', 'length', 'not widely'),
	// svh: createUnit('svh', 'relative', 'length', 'not widely'),
	// svw: createUnit('svw', 'relative', 'length', 'not widely'),
	// svmax: createUnit('svmax', 'relative', 'length', 'not widely'),
	// svmin: createUnit('svmin', 'relative', 'length', 'not widely'),
	// svb: createUnit('svb', 'relative', 'length', 'not widely'),
	// svi: createUnit('svi', 'relative', 'length', 'not widely'),
	// lvh: createUnit('lvh', 'relative', 'length', 'not widely'),
	// lvw: createUnit('lvw', 'relative', 'length', 'not widely'),
	// lvmax: createUnit('lvmax', 'relative', 'length', 'not widely'),
	// lvmin: createUnit('lvmin', 'relative', 'length', 'not widely'),
	// lvb: createUnit('lvb', 'relative', 'length', 'not widely'),
	// lvi: createUnit('lvi', 'relative', 'length', 'not widely'),
	// dvh: createUnit('dvh', 'relative', 'length', 'not widely'),
	// dvw: createUnit('dvw', 'relative', 'length', 'not widely'),
	// dvmax: createUnit('dvmax', 'relative', 'length', 'not widely'),
	// dvmin: createUnit('dvmin', 'relative', 'length', 'not widely'),
	// dvb: createUnit('dvb', 'relative', 'length', 'not widely'),
	// dvi: createUnit('dvi', 'relative', 'length', 'not widely'),
	// cqw: createUnit('cqw', 'relative', 'length', 'not widely'),
	// cqh: createUnit('cqh', 'relative', 'length', 'not widely'),
	// cqi: createUnit('cqi', 'relative', 'length', 'not widely'),
	// cqb: createUnit('cqb', 'relative', 'length', 'not widely'),
	// cqmin: createUnit('cqmin', 'relative', 'length', 'not widely'),
	// cqmax: createUnit('cqmax', 'relative', 'length', 'not widely'),

	px: createUnit('px', 'absolute', 'length', 'widely'),
	// cm: createUnit('cm', 'absolute', 'length', 'not widely'),
	// mm: createUnit('mm', 'absolute', 'length', 'not widely'),
	// Q: createUnit('Q', 'absolute', 'length', 'not widely'),
	// in: createUnit('in', 'absolute', 'length', 'not widely'),
	// pt: createUnit('pt', 'absolute', 'length', 'not widely'),
	// pc: createUnit('pc', 'absolute', 'length', 'not widely'),

	deg: createUnit('deg', 'absolute', 'angle', 'widely'),
	grad: createUnit('grad', 'absolute', 'angle', 'not widely'),
	rad: createUnit('rad', 'absolute', 'angle', 'not widely'),
	turn: createUnit('turn', 'absolute', 'angle', 'not widely'),

	'%': createUnit('%', 'relative', 'percentage', 'widely'),

	// s: createUnit('s', 'time', 'time', 'widely'),
	// ms: createUnit('ms', 'time', 'time', 'not widely'),
};

