import type { BlockDefinition } from '@/types/block/block';

const button: BlockDefinition = {
	tag: 'button',
	type: 'button',
	permittedContent: null,
	permittedParent: null,
	icon: 'Button',
	render: (instance) => (<button>{instance.id} </button>),

};

export default button;
