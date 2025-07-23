import React, { useCallback, ReactNode } from 'react';

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
function renderBlock(instance: BlockInstance, children?: ReactNode) {
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

			{/* Inject block-specific styles */}
			<style>
				{renderBlockStyles(instance.id)}
			</style>
		</div>
	);
}



const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" /></svg>


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
	icon,
	render: renderBlock,
};

export default container;