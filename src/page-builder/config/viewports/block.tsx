// Types
import type { ViewportDefinition } from "@/src/page-builder/core/editor/viewport/types";

// Components
import BlockView from '@/src/page-builder/ui/views/block/component';

export const BlockViewport: ViewportDefinition = {
    id: 'block',
    title: 'Block Viewport',
    workspaceID: 'main',
    render: () => <BlockView />,
};

