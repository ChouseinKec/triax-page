// Registry
import { registerNode } from '@/core/block/node/states/registry';

// Components
import BlockImageComponent from '@/config/block/node/image/component';

registerNode({
    key: 'core-image',
    name: "Image",
    description: "An image block for displaying pictures and graphics.",
    category: 'media',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216v62.75l-26.51-26.51a12,12,0,0,0-17,0L93.51,126.76l-23.12-23.12a12,12,0,0,0-17,0L40,129.19V56ZM216,200H40v-4.43l53.17-53.17a4,4,0,0,1,5.66,0L160,180.69l45.17-45.17a4,4,0,0,1,5.66,0L216,174.83V200Zm-64-64a16,16,0,1,1,16,16A16,16,0,0,1,152,136Z" />
        </svg>
    ),

    elementKeys: ['div', 'figure'],

    defaultStyles: {},
    defaultAttributes: {},
    defaultData: {
        src: '',
        alt: ''
    },

    component: BlockImageComponent,
});