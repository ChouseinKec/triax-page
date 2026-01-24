// Types
import type { ViewDefinition, } from "@/core/layout/view/types";

// Components
import TestComponent from './component';

// Registry
import { registerView, } from '@/core/layout/view/state/registry';

const ViewDefinitionTest: ViewDefinition = {
    key: 'test',
    benchKey: 'main',
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8h-8a40,40,0,0,1-40-40V128a8,8,0,0,1,16,0v16a24,24,0,0,0,24,24h8a8,8,0,0,1,8,8Zm-32-92a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/></svg>),
    title: 'Test View',
    component: TestComponent,
};



// Register directly
registerView(ViewDefinitionTest);