import type { BlockDefinition } from '@/types/block/block';

const media: BlockDefinition = {
	tag: 'img',
	type: 'media',
	permittedContent: null,
	permittedParent: null,
	icon: 'media',
	render: (instance) => (<img src={instance.id} alt="" />),

};

export default media;
