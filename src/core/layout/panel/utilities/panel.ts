// Types
import type { PanelPosition, PanelSize } from '../types';
import type { CSSProperties } from 'react';

// Utility types
type PxPosition = { top: number; left: number };
type PxSize = { width: number; height: number };

/**
 * Converts percentage-based position and size to pixel position.
 * @param position - The panel position in %.
 * @param size - The panel size in %.
 * @param vh - ViewEditor height.
 * @param vw - ViewEditor width.
 * @returns The pixel position.
 */
export function convertPositionToPx(position: PanelPosition, size: PanelSize, vh: number, vw: number): PxPosition {
	let top = 0;
	let left = 0;
	if ('top' in position) top = (position.top / 100) * vh;
	if ('left' in position) left = (position.left / 100) * vw;
	if ('right' in position) left = vw - (position.right / 100) * vw - (size.width / 100) * vw;
	if ('bottom' in position) top = vh - (position.bottom / 100) * vh - (size.height / 100) * vh;
	return { top, left };
}

/**
 * Converts percentage-based size to pixel size.
 * @param size - The panel size in %.
 * @param vh - ViewEditor height.
 * @param vw - ViewEditor width.
 * @returns The pixel size.
 */
export function convertSizeToPx(size: PanelSize, vh: number, vw: number): PxSize {
	return { width: (size.width / 100) * vw, height: (size.height / 100) * vh };
}

/**
 * Converts pixel position to percentage-based position.
 * @param newPos - The new pixel position.
 * @param currentSize - The current pixel size.
 * @param vh - ViewEditor height.
 * @param vw - ViewEditor width.
 * @param anchorType - The anchor type of the position.
 * @returns The percentage-based position.
 */
export function convertPxToPosition(newPos: PxPosition, currentSize: PxSize, vh: number, vw: number, anchorType: PanelPosition): PanelPosition {
	const newPosition: any = {};
	if ('top' in anchorType) newPosition.top = (newPos.top / vh) * 100;
	if ('left' in anchorType) newPosition.left = (newPos.left / vw) * 100;
	if ('right' in anchorType) newPosition.right = ((vw - newPos.left - currentSize.width) / vw) * 100;
	if ('bottom' in anchorType) newPosition.bottom = ((vh - newPos.top - currentSize.height) / vh) * 100;
	return newPosition as PanelPosition;
}

/**
 * Converts pixel size to percentage-based size.
 * @param newSize - The new pixel size.
 * @param vh - ViewEditor height.
 * @param vw - ViewEditor width.
 * @returns The percentage-based size.
 */
export function convertPxToSize(newSize: PxSize, vh: number, vw: number): PxSize {
	return { width: (newSize.width / vw) * 100, height: (newSize.height / vh) * 100 };
}

/**
 * Calculates the CSS styles for the panel based on position and size.
 * @param localPosition - The local position in %.
 * @param localSize - The local size in %.
 * @returns The CSS properties object.
 */
export function calculatePanelStyles(localPosition: PanelPosition, localSize: PanelSize): CSSProperties {
	const styleObj: any = {};
	if ('top' in localPosition) styleObj.top = `${localPosition.top}%`;
	if ('left' in localPosition) styleObj.left = `${localPosition.left}%`;
	if ('right' in localPosition) styleObj.right = `${localPosition.right}%`;
	if ('bottom' in localPosition) styleObj.bottom = `${localPosition.bottom}%`;
	styleObj.width = `${localSize.width}%`;
	styleObj.height = `${localSize.height}%`;
	return styleObj;
}
