'use client';

import { useState, useCallback } from 'react';

export type DragDropState = 'before' | 'after' | 'over' | null;

/**
 * Custom hook for handling drag and drop operations for reordering items.
 * Manages drag state, visual feedback, and drop logic for hierarchical item reordering.
 *
 * @param onMoveBefore - Callback function to move item before target
 * @param onMoveAfter - Callback function to move item after target
 * @param onSelect - Callback function to select the moved item
 * @returns Object containing drag state and event handlers
 */
export function useDragDrop(
	onMoveBefore: (draggedId: string, targetId: string) => void, //
	onMoveAfter: (draggedId: string, targetId: string) => void,
	onMoveInto: (draggedId: string, targetId: string) => void,
	onSelect?: (id: string) => void
) {
	const [isDragOver, setIsDragOver] = useState<DragDropState>(null);
	const [draggedItemID, setDraggedItemID] = useState<string | null>(null);

	/**
	 * Handles the start of a drag operation.
	 * Sets the drag data with the item ID.
	 */
	const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
		e.dataTransfer.setData('text/plain', itemId);

		e.dataTransfer.effectAllowed = 'move';
		setDraggedItemID(itemId);
	}, []);

	/**
	 * Handles drag end to clean up state.
	 */
	const handleDragEnd = useCallback(() => {
		setIsDragOver(null);
		setDraggedItemID(null);
	}, []);

	/**
	 * Handles drop events to perform the actual move operation.
	 */
	const handleDrop = useCallback(
		(e: React.DragEvent, targetId: string, position: DragDropState) => {
			e.preventDefault();
			setIsDragOver(null);

			const draggedId = e.dataTransfer.getData('text/plain');
			if (!draggedId || draggedId === targetId) return;

			// Perform the move based on drop position
			if (position === 'before') {
				onMoveBefore(draggedId, targetId);
			} else if (position === 'after') {
				onMoveAfter(draggedId, targetId);
			} else if (position === 'over') {
				onMoveInto(draggedId, targetId);
			}

			// Select the moved item if callback provided
			if (onSelect) {
				onSelect(draggedId);
			}
		},
		[onMoveBefore, onMoveAfter, onSelect, onMoveInto]
	);

	/**
	 * Handles drag over events on drop zones.
	 * Shows visual feedback based on the drop zone position.
	 */
	const handleDragOver = useCallback((e: React.DragEvent, position: DragDropState) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		setIsDragOver(position);
	}, []);

	/**
	 * Handles drag leave events to clear visual feedback.
	 */
	const handleDragLeave = useCallback(() => {
		setIsDragOver(null);
	}, []);

	return {
		isDragOver,
		draggedItemID,
		handleDragStart,
		handleDragEnd,

		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
}
