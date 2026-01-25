// Registry
import { registerNode, registerAction } from '@/core/block/node/states/registry';

// Components
import BlockMarkdownComponent from "@/config/block/node/markdown/component";

// Managers
import { replaceHighlightedText } from '@/core/block/node/managers';

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

	defaultTag: "p",
	availableTags: [
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
	defaultContent: {},

	component: BlockMarkdownComponent,
});

// Register actions for the markdown block
registerAction({
	key: "core-markdown-bold",
	title: "Bold",
	order: 10,
	nodeKey: "core-markdown",
	component: () => (
		<button title="Make text bold" onClick={() => replaceHighlightedText('core-markdown')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
				<path d="M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z" />
			</svg>
		</button>
	),
});	