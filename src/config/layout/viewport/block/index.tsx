// Types
import type { ViewportDefinition } from "@/src/core/layout/viewport/types";

// Components
import ViewportBlockRender from '@/src/config/layout/viewport/block/render';

export const ViewportBlockDefinition: ViewportDefinition = {
    id: 'block',
    title: 'Block Viewport',
    workbenchID: 'main',
    render: () => <ViewportBlockRender />,
};

