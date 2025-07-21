import React, { useCallback } from 'react';

// Types
import type { BlockDefinition, BlockInstance } from '@/types/block/block';

// Hooks
import { useBlockManager } from '@/hooks/block/manager';

/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
function renderContainer(instance: BlockInstance, children?: React.ReactNode): React.ReactElement {
	const { selectBlock, renderBlockStyles, getSelectedBlock, hasSelectedChild } = useBlockManager();


	// Get the currently selected block
	const selectedBlock = getSelectedBlock();
	const isSelected = selectedBlock?.id === instance.id;
	const hasChildSelected = hasSelectedChild(instance.id);

	/**
	 * Handles block selection when clicked.
	 * Stops event propagation to prevent parent blocks from being selected.
	 */
	const handleSelectBlock = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		selectBlock(instance.id);
	}, [selectBlock, instance.id]);

	return (
		<div
			id={`block-${instance.id}`}
			onClick={handleSelectBlock}
			data-block-type="container"
			data-is-selected={isSelected}
			data-has-selected-descendant={hasChildSelected}
		>
			{/* Render child blocks */}
			{children}

			{/* Debug: Show block ID (remove in production) */}
			{instance.id}

			{/* Inject block-specific styles */}
			<style>
				{renderBlockStyles(instance.id)}
			</style>
		</div>
	);
}

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const container: BlockDefinition = {
	type: 'container',
	tag: 'div',
	tags: ['div', 'section', 'article', 'aside', 'nav'],
	permittedContent: null, // Can contain any block type
	permittedParent: null,  // Can be placed in any parent
	icon: '📦',
	render: renderContainer,
};

export default container;