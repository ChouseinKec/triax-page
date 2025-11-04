"use client";

// Components
import TextRender from "@/src/page-builder/ui/blocks/text";

// Types
import { BlockDefinition } from '@/src/page-builder/core/block/block/types';

const TextBlock: BlockDefinition = {
	type: "text",
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

	permittedContent: [],

	styles: {},
	attributes: {},

	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M128,96H232a8,8,0,0,1,0,16H128a8,8,0,0,1,0-16Zm104,32H128a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM96,144a8,8,0,0,0,0-16H88V64h32v8a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V72a8,8,0,0,0,16,0V64H72v64H64a8,8,0,0,0,0,16Z" />
		</svg>
	),
	category: "core",
	render: (instance) => <TextRender instance={instance} />,
};

export default TextBlock;