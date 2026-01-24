// Registry
import { registerNode, registerAction } from '@/core/block/node/definition/states/registry';

// Components
import BlockContainerComponent from '@/config/block/node/container/component';

registerNode({
	key: 'core-container',
	name: "Container",
	description: "A generic container block that can hold other blocks.",
	category: 'core',
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" />
		</svg>
	),

	defaultTag: 'div',
	availableTags: ['div', 'section', 'article', 'aside', 'nav'],

	defaultStyles: {},
	defaultAttributes: {},
	defaultContent: {},

	component: BlockContainerComponent,
});

// Register actions for the container block
registerAction({
	key: "core-container-add-child",
	title: "Add Child",
	order: 10,
	nodeKey: "core-container",
	component: () => (
		<button title="Add a child block">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
				<path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
			</svg>
		</button>
	),
});