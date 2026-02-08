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
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path fill="white" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v48H184V80a8,8,0,0,0-16,0v24H88V80a8,8,0,0,0-16,0v24H40V56Zm176,144H40V120H72v24a8,8,0,0,0,16,0V120h80v24a8,8,0,0,0,16,0V120h32v80Z" />
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