// Components
import BlockContainerComponent from '@/config/block/node/container/component';

// Types
import { NodeDefinition } from '@/core/block/node/definition/types/definition';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const BlockContainerDefinition: NodeDefinition = {
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
};

export default BlockContainerDefinition;
