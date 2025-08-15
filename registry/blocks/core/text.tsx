import React, { ReactNode, useCallback, useRef } from "react";

// Types
import type { BlockDefinition, BlockInstance } from "@/types/block/block";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

function render(instance: BlockInstance, children?: ReactNode) {
	const {
		selectBlock,
		renderBlockStyles,
		getSelectedBlock,
		hasBlockSelectedContent,
		getBlockAttribute,
		setBlockAttribute,
	} = useBlockManager();

	const selectedBlock = getSelectedBlock();
	const isSelected = selectedBlock?.id === instance.id;
	const hasChildSelected = hasBlockSelectedContent(instance.id);

	// Get the current text value from attributes
	const text = getBlockAttribute(instance.id, "text") || "Enter something...";

	// Ref to access the <p> element
	const pRef = useRef<HTMLParagraphElement>(null);

	// Handle block selection
	const handleSelectBlock = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			selectBlock(instance.id);
		},
		[selectBlock, instance.id]
	);

	// Commit text to block attribute only on blur (focus lost)
	const handleBlur = useCallback(() => {
		const currentText = pRef.current?.innerText ?? "";
		setBlockAttribute(instance.id, "text", currentText);
	}, [setBlockAttribute, instance.id]);

	return (
		<>
			<p
				ref={pRef}
				id={`block-${instance.id}`}
				onClick={handleSelectBlock}
				onBlur={handleBlur}
				data-block-type="container"
				data-is-selected={isSelected}
				data-has-selected-descendant={hasChildSelected}
				contentEditable
				suppressContentEditableWarning
			>
				{text}
			</p>
			<style>{renderBlockStyles(instance.id)}</style>
		</>
	);
}

const text: BlockDefinition = {
	tag: "p",
	type: "text",
	permittedContent: [],
	permittedParent: null,
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M128,96H232a8,8,0,0,1,0,16H128a8,8,0,0,1,0-16Zm104,32H128a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM96,144a8,8,0,0,0,0-16H88V64h32v8a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V72a8,8,0,0,0,16,0V64H72v64H64a8,8,0,0,0,0,16Z" />
		</svg>
	),
	category: "core",
	render,
};

export default text;