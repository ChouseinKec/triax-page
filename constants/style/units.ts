import { CSSUnits, CSSUnit, CSSUnitCategory, CSSUnitSupported } from '@/types/style/units';
import { CSSDimensionGroups } from '@/types/style/dimension';
import { DimensionOptionData } from '@/types/option';

/**
 * Helper function to create a CSSUnit object.
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @param category - The category of the unit (e.g. 'relative', 'absolute').
 * @param supported - The support status of the unit (e.g. 'widely', 'not widely').
 * @returns A CSSUnit object with all metadata fields populated.
 */
function createUnit(name: CSSUnits, category: CSSUnitCategory, dimensionGroup: CSSDimensionGroups, supported: CSSUnitSupported): CSSUnit {
	return {
		type: 'unit',
		name,
		value: `0${name}`,
		supported,
		category,
		dimensionGroup,
	};
}

/**
 * Helper function to create an DimensionOptionData object for a CSS unit.
 * Used for populating dropdowns, radio selects, etc. with dimension options.
 *
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @returns An DimensionOptionData object with name, value, and category: 'dimension'.
 */
function createUnitOption(name: CSSUnits): DimensionOptionData {
	return {
		name,
		value: `0${name}`,
		category: 'dimension',
		type: 'dimension',
	};
}

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a CSSUnit object describing the unit's name, category, and support status.
 * Used for unit validation, UI dropdowns, and documentation.
 */
export const CSSUnitDefs: Partial<Record<CSSUnits, CSSUnit>> = {
	fr: createUnit('fr', 'relative', 'flex', 'widely'),
	px: createUnit('px', 'absolute', 'length', 'widely'),
	em: createUnit('em', 'relative', 'length', 'widely'),
	rem: createUnit('rem', 'relative', 'length', 'widely'),
	vh: createUnit('vh', 'relative', 'length', 'widely'),
	vw: createUnit('vw', 'relative', 'length', 'widely'),
	vmax: createUnit('vmax', 'relative', 'length', 'widely'),
	vmin: createUnit('vmin', 'relative', 'length', 'widely'),
	
	deg: createUnit('deg', 'absolute', 'angle', 'widely'),
	grad: createUnit('grad', 'absolute', 'angle', 'not widely'),
	rad: createUnit('rad', 'absolute', 'angle', 'not widely'),
	turn: createUnit('turn', 'absolute', 'angle', 'not widely'),

	'%': createUnit('%', 'relative', 'percentage', 'widely'),

};

/**
 * CSSUnitOptions: Maps each CSSDimensionGroups value to an array of DimensionOptionData objects for UI selection.
 *
 * This is used to group units by their dimension group (e.g., 'length', 'angle', 'percentage', 'flex').
 * Each key is a CSSDimensionGroups value, and the value is an array of DimensionOptionData objects for that group.
 */
export const CSSUnitOptions: Record<CSSDimensionGroups, DimensionOptionData[]> = Object.entries(CSSUnitDefs).reduce((acc, [unit, def]) => {
	if (def?.dimensionGroup) {
		if (!acc[def.dimensionGroup]) acc[def.dimensionGroup] = [];
		acc[def.dimensionGroup].push(createUnitOption(unit as CSSUnits));
	}
	return acc;
}, {} as Record<CSSDimensionGroups, DimensionOptionData[]>);
