import type { BlockDefinition } from '@/types/block/block';




const icon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-240h640v-320H160v320Z" /></svg>

const button: BlockDefinition = {
	tag: 'button',
	type: 'button',
	permittedContent: null,
	permittedParent: null,
	icon,
	render: (instance) => (<button>{instance.id} </button>),

};

export default button;
