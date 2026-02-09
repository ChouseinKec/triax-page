// Registry
import { registerNode } from '@/core/block/node/states/registry';

// Components
import BlockHeaderComponent from '@/config/block/node/header/component';

registerNode({
    key: 'core-header',
    name: "Header",
    description: "A heading block for section titles and headings.",
    category: 'text',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M208,56V200a8,8,0,0,1-16,0V136H64v64a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v64H192V56a8,8,0,0,1,16,0Z" />
        </svg>
    ),

    elementKeys: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    defaultStyles: {},
    defaultAttributes: {},
    defaultData: {
        text: ''
    },

    component: BlockHeaderComponent,
});