// Types
import { BarID, BarTitle, BarPosition, BarSize } from '@/src/page-builder/core/editor/layout/types';

export function isBarIDValid(barID: unknown): barID is BarID {
	return typeof barID === 'string' && barID.length > 0;
}

export function isBarTitleValid(barTitle: unknown): barTitle is BarTitle {
	return typeof barTitle === 'string' && barTitle.length > 0;
}

export function isBarPositionValid(barPosition: unknown): barPosition is BarPosition {
	return typeof barPosition === 'object' && barPosition !== null && typeof (barPosition as { top?: unknown }).top === 'string' && typeof (barPosition as { left?: unknown }).left === 'string';
}

export function isBarSizeValid(barSize: unknown): barSize is BarSize {
	return typeof barSize === 'object' && barSize !== null && typeof (barSize as { width?: unknown }).width === 'string' && typeof (barSize as { height?: unknown }).height === 'string';
}
