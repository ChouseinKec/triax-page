// Registry
import { registerNode } from '@/core/block/node/states/registry';

// Components
import BlockTableComponent from '@/config/block/node/table/component';

registerNode({
    key: 'core-table',
    name: "Table",
    description: "A table block that can hold table rows and cells.",
    category: 'table',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z" />
        </svg>
    ),

    elementKeys: ['table'],

    defaultStyles: {},
    defaultAttributes: {},
    defaultData: {},

    component: BlockTableComponent,
});