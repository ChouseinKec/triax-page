// Types
import type { BenchDefinition, ActionDefinition } from '@/core/layout/workbench/types';

// Components
import BenchComponentMain from "@/config/layout/bench/main/component"
import PanelSelect from "@/config/layout/bench/main/action";

export const BenchDefinitionMain: BenchDefinition = {
    key: 'main',
    name: 'Main',
    order: 0,
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,240,130.34Zm-32-72V208H168V152a8,8,0,0,0-8-8H96a8,8,0,0,0-8,8v56H48V136l2.34-2.34A8,8,0,0,0,56,125.66L128,53.66l72,72A8,8,0,0,0,208,136Z" />
        </svg>
    ),
    component: BenchComponentMain,
};

export const ActionDefinitionMain: ActionDefinition = {
    key: 'main-action',
    title: 'Main Action',
    benchKey: 'main',
    order: 0,
    component: PanelSelect,
};

