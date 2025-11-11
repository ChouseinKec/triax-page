// Types
import type { ViewportDefinition } from "@/src/page/core/viewport/types";

// Components
import BlockView from '@/src/page/component/view/block/view';

export const BlockViewport: ViewportDefinition = {
    id: 'block',
    title: 'Block Viewport',
    workbenchID: 'main',
    render: () => <BlockView />,
};

