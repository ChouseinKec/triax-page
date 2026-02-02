// Registry
import { registerNode } from '@/core/block/node/states/registry';

// Components
import BlockTableRowComponent from '@/config/block/node/table-row/component';

registerNode({
    key: 'core-table-row',
    name: "Table Row",
    description: "A table row block for use within tables.",
    category: 'table',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H136v32H96Zm56,0h40v32H152ZM40,160H80v32H40Zm56,0H136v32H96Zm56,0h40v32H152ZM208,192H32V176H208v16Zm0-48H176V112h32v32Zm-56,0H96V112h56v32Zm-80,0H40V112H72v32Z" />
        </svg>
    ),

    elementKeys: ['tr'],

    defaultStyles: {},
    defaultAttributes: {},
    defaultData: {},

    component: BlockTableRowComponent,
});