// Types
import type { ViewportDefinition } from "@/src/page-builder/core/editor/viewport/types";

// Components
import BlockView from '@/src/page-builder/component/views/block/view';

export const BlockViewport: ViewportDefinition = {
    id: 'block',
    title: 'Block Viewport',
    workbenchID: 'main',
    render: () => <BlockView />,
};

