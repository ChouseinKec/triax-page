"use client";

import React, { useCallback, useRef } from "react";

// Types
import type { BlockDefinition, BlockInstance } from "@/editors/block/types";

// Managers
import { useHasBlockSelectedContent, useIsBlockSelected, selectBlock, useRenderedAttributeEditor, useRenderedStylesEditor } from '@/editors/block/managers/block';
import { setAttribute, useAttribute } from "@/editors/block/managers/attribute";


function render(instance: BlockInstance) {
	const isSelected = useIsBlockSelected(instance.id);
	const hasChildSelected = useHasBlockSelectedContent(instance.id);
	const AttributeEditor = useRenderedAttributeEditor(instance.id);
	const StylesEditor = useRenderedStylesEditor(instance.id);

	// Get the current text value from attributes
	const text = useAttribute(instance.id, "text") || "Enter something...";

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
		setAttribute(instance.id, "text", currentText);
	}, [setAttribute, instance.id]);

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
				{...AttributeEditor}
			>
				{text}

			</p>
			<style>{StylesEditor}</style>
		</>
	);
}

const text: BlockDefinition = {
	tag: "p",
	tags: [
		"p",
		"span",
		"b",
		"strong",
		"i",
		"em",
		"u",
		"small",
		"mark",
		"sub",
		"sup",
		"code",
		"abbr",
		"s",
		"del",
		"ins",
		"q",
		"cite",
		"dfn"
	],
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