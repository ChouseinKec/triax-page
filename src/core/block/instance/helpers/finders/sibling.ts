// Types
import type { BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { FindResult } from '@/src/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/src/core/block/instance/helpers/pickers';
import { findBlockAncestors } from '@/src/core/block/instance/helpers/finders/ancestor';
import { findBlockChildIndex } from '@/src/core/block/instance/helpers/finders/child';
import { isBlockLastChild, isBlockFirstChild } from '@/src/core/block/instance/helpers/checkers';

/**
 * Find the next sibling block instance of the given block instance.
 *
 * @param sourceBlockInstance The block instance whose next sibling is to be found.
 * @param storedBlocks The record of all stored block instances.
 */
export function findBlockNextSibling(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// Find the parent block instance
	const parentBlockInstance = pickBlockInstance(sourceBlockInstance.parentID, storedBlocks);
	if (!parentBlockInstance.success) return { status: 'error', error: parentBlockInstance.error };

	// Find the source's position inside the parent's children.
	const currentIndexResult = findBlockChildIndex(sourceBlockInstance, parentBlockInstance.data);
	if (currentIndexResult.status === 'error') return { status: 'error', error: currentIndexResult.error };
	if (currentIndexResult.status === 'not-found') return { status: 'not-found' };

	// If the source is the last child there is no next sibling.
	const isBlockLastChildResult = isBlockLastChild(sourceBlockInstance, parentBlockInstance.data);
	if (!isBlockLastChildResult.success) return { status: 'error', error: isBlockLastChildResult.error };
	if (isBlockLastChildResult.passed === true) return { status: 'not-found' };

	// Fetch the sibling that immediately follows the source
	const nextSiblingID = parentBlockInstance.data.contentIDs[currentIndexResult.data + 1];
	const nextSiblingResult = pickBlockInstance(nextSiblingID, storedBlocks);
	if (!nextSiblingResult.success) return { status: 'error', error: nextSiblingResult.error };

	// Return the next sibling
	return { status: 'found', data: nextSiblingResult.data };
}

/**
 * Find the previous sibling block instance of the given block instance.
 *
 * @param sourceBlockInstance The block instance whose previous sibling is to be found.
 * @param storedBlocks The record of all stored block instances.
 */
export function findBlockPreviousSibling(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// Find the parent block instance
	const parentBlockInstance = pickBlockInstance(sourceBlockInstance.parentID, storedBlocks);
	if (!parentBlockInstance.success) return { status: 'error', error: parentBlockInstance.error };

	// Find the source's position inside the parent's children.
	const currentIndexResult = findBlockChildIndex(sourceBlockInstance, parentBlockInstance.data);
	if (currentIndexResult.status === 'error') return { status: 'error', error: currentIndexResult.error };
	if (currentIndexResult.status === 'not-found') return { status: 'not-found' };

	// If the source is the first child there is no previous sibling.
	const isFirstChildResult = isBlockFirstChild(sourceBlockInstance, parentBlockInstance.data);
	if (!isFirstChildResult.success) return { status: 'error', error: isFirstChildResult.error };
	if (isFirstChildResult.passed === true) return { status: 'not-found' };

	// Fetch the sibling that immediately precedes the source
	const previousSiblingID = parentBlockInstance.data.contentIDs[currentIndexResult.data - 1];
	const previousSiblingResult = pickBlockInstance(previousSiblingID, storedBlocks);
	if (!previousSiblingResult.success) return { status: 'error', error: previousSiblingResult.error };

	// Return the previous sibling
	return { status: 'found', data: previousSiblingResult.data };
}

/**
 * Find the next sibling of the nearest parent of the given block instance.
 *
 * @param sourceBlockInstance The block instance whose next parent's sibling is to be found.
 * @param storedBlocks The record of all stored block instances.
 */
export function findBlockNextParentSibling(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// Compute ancestor instances once (immediate parent first).
	const ancestorsResult = findBlockAncestors(sourceBlockInstance, storedBlocks);
	if (ancestorsResult.status === 'error') return { status: 'error', error: ancestorsResult.error };
	if (ancestorsResult.status === 'not-found') return { status: 'not-found' };

	// Loop through ancestors to find the first with a next sibling.
	for (let i = 0; i < ancestorsResult.data.length - 1; i++) {
		const parent = ancestorsResult.data[i];
		const grandParent = ancestorsResult.data[i + 1];

		// Determine parent's index under grandParent and try to grab the next sibling.
		const parentIndexResult = findBlockChildIndex(parent, grandParent);
		if (parentIndexResult.status === 'error') return { status: 'error', error: parentIndexResult.error };
		if (parentIndexResult.status === 'not-found') continue; // something's wrong / inconsistent, skip

		// Try to fetch the next sibling
		const nextSiblingIndex = parentIndexResult.data + 1;
		if (nextSiblingIndex >= grandParent.contentIDs.length) continue; // parent is last child

		// Fetch the sibling block instance
		const siblingID = grandParent.contentIDs[nextSiblingIndex];
		const siblingResult = pickBlockInstance(siblingID, storedBlocks);
		if (!siblingResult.success) return { status: 'error', error: siblingResult.error };

		// Return the found sibling
		return { status: 'found', data: siblingResult.data };
	}

	// No ancestor had a next sibling — return not-found.
	return { status: 'not-found' };
}
