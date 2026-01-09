// Types
import type { ViewportDefinition } from "@/src/core/layout/viewport/types";

// Components
import ViewportMainComponent from '@/src/config/layout/viewport/main/component';

export const ViewportMainDefinition: ViewportDefinition = {
    id: 'block',
    title: 'Block Viewport',
    workbenchKey: 'main',
    component: ViewportMainComponent,
};

