// Components
import BlockTextRender from "@/src/config/block/text/render";

// Types
import { BlockDefinition } from '@/src/core/block/instance/types';

const BlockTextDefinition: BlockDefinition = {
    type: "core-plain-text",
    name: "Plain Text",
    description: "A simple block for adding and formatting plain text content.",
    category: "core",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path fill="white" d="M208,56H48a8,8,0,0,0,0,16h68v60a36,36,0,0,1-36,36,8,8,0,0,0,0,16,52.06,52.06,0,0,0,52-52V72h76a8,8,0,0,0,0-16Z" />
        </svg>
    ),

    tag: "span",
    tags: ["span"],

    allowedAttributes: [],
    allowedStyles: [],
    allowedContent: [],

    styles: {},
    attributes: {},
    content: {},

    render: (instance) => <BlockTextRender instance={instance} />,
};

export default BlockTextDefinition;
