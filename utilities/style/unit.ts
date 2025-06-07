// Constants
import { CSSUnitDefs } from '@/constants/style/units';

function isUnitValid(unit: string): boolean {
	return unit in CSSUnitDefs;
}

export { isUnitValid };
