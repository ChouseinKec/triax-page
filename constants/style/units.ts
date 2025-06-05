import { CSSUnits, CSSUnit, CSSUnitCategory, CSSUnitSupported } from '@/types/style/units';

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a CSSUnit object describing the unit's name, category, and support status.
 * Used for unit validation, UI dropdowns, and documentation.
 */
export const CSSUnitDefs: Record<CSSUnits, CSSUnit> = {
	fr: createUnit('fr', 'relative', 'widely'),
	em: createUnit('em', 'relative', 'widely'),
	rem: createUnit('rem', 'relative', 'widely'),
	vh: createUnit('vh', 'relative', 'widely'),
	vw: createUnit('vw', 'relative', 'widely'),
	vmax: createUnit('vmax', 'relative', 'widely'),
	vmin: createUnit('vmin', 'relative', 'widely'),
	ex: createUnit('ex', 'relative', 'not widely'),
	ic: createUnit('ic', 'relative', 'not widely'),
	lh: createUnit('lh', 'relative', 'not widely'),
	cap: createUnit('cap', 'relative', 'not widely'),
	ch: createUnit('ch', 'relative', 'not widely'),
	rcap: createUnit('rcap', 'relative', 'not widely'),
	rch: createUnit('rch', 'relative', 'not widely'),
	rex: createUnit('rex', 'relative', 'not widely'),
	ric: createUnit('ric', 'relative', 'not widely'),
	rlh: createUnit('rlh', 'relative', 'not widely'),
	vb: createUnit('vb', 'relative', 'not widely'),
	vi: createUnit('vi', 'relative', 'not widely'),
	svh: createUnit('svh', 'relative', 'not widely'),
	svw: createUnit('svw', 'relative', 'not widely'),
	svmax: createUnit('svmax', 'relative', 'not widely'),
	svmin: createUnit('svmin', 'relative', 'not widely'),
	svb: createUnit('svb', 'relative', 'not widely'),
	svi: createUnit('svi', 'relative', 'not widely'),
	lvh: createUnit('lvh', 'relative', 'not widely'),
	lvw: createUnit('lvw', 'relative', 'not widely'),
	lvmax: createUnit('lvmax', 'relative', 'not widely'),
	lvmin: createUnit('lvmin', 'relative', 'not widely'),
	lvb: createUnit('lvb', 'relative', 'not widely'),
	lvi: createUnit('lvi', 'relative', 'not widely'),
	dvh: createUnit('dvh', 'relative', 'not widely'),
	dvw: createUnit('dvw', 'relative', 'not widely'),
	dvmax: createUnit('dvmax', 'relative', 'not widely'),
	dvmin: createUnit('dvmin', 'relative', 'not widely'),
	dvb: createUnit('dvb', 'relative', 'not widely'),
	dvi: createUnit('dvi', 'relative', 'not widely'),
	cqw: createUnit('cqw', 'relative', 'not widely'),
	cqh: createUnit('cqh', 'relative', 'not widely'),
	cqi: createUnit('cqi', 'relative', 'not widely'),
	cqb: createUnit('cqb', 'relative', 'not widely'),
	cqmin: createUnit('cqmin', 'relative', 'not widely'),
	cqmax: createUnit('cqmax', 'relative', 'not widely'),

	px: createUnit('px', 'absolute', 'widely'),
	cm: createUnit('cm', 'absolute', 'not widely'),
	mm: createUnit('mm', 'absolute', 'not widely'),
	Q: createUnit('Q', 'absolute', 'not widely'),
	in: createUnit('in', 'absolute', 'not widely'),
	pt: createUnit('pt', 'absolute', 'not widely'),
	pc: createUnit('pc', 'absolute', 'not widely'),

	deg: createUnit('deg', 'angle', 'widely'),
	grad: createUnit('grad', 'angle', 'not widely'),
	rad: createUnit('rad', 'angle', 'not widely'),
	turn: createUnit('turn', 'angle', 'not widely'),

	'%': createUnit('%', 'percentage', 'widely'),

	s: createUnit('s', 'time', 'widely'),
	ms: createUnit('ms', 'time', 'not widely'),
};


/**
 * Helper function to create a CSSUnit object.
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @param category - The category of the unit (e.g. 'relative', 'absolute').
 * @param supported - The support status of the unit (e.g. 'widely', 'not widely').
 * @returns A CSSUnit object with all metadata fields populated.
 */
function createUnit(name: CSSUnits, category: CSSUnitCategory, supported: CSSUnitSupported): CSSUnit {
	return {
		type: 'unit',
		name,
		value: name,
		supported,
		category,
	};
}
