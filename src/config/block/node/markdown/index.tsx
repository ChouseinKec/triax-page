// Registry
import { registerNode, registerAction } from '@/core/block/node/states/registry';

// Components
import BlockMarkdownComponent from "@/config/block/node/markdown/component";
import MarkdownActionToolbar from "@/config/block/node/markdown/action";


registerNode({
	key: "core-markdown",
	name: "Markdown",
	description: "A block for adding and formatting rich text content.",
	category: "core",
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M128,96H232a8,8,0,0,1,0,16H128a8,8,0,0,1,0-16Zm104,32H128a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm0,32H80a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM96,144a8,8,0,0,0,0-16H88V64h32v8a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V72a8,8,0,0,0,16,0V64H72v64H64a8,8,0,0,0,0,16Z" />
		</svg>
	),

	supportedElementKeys: [
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


	defaultStyles: {},
	defaultAttributes: {},
	defaultData: {},

	component: BlockMarkdownComponent,
});

// Register actions for the markdown block
registerAction({
	key: "core-markdown-toolbar",
	title: "Markdown Toolbar",
	order: 10,
	nodeKey: "core-markdown",
	component: MarkdownActionToolbar,
});	