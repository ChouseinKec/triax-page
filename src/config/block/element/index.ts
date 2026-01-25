// Registry
import { registerElements } from '@/core/block/element/states/registry';

// Constants
import { FLOW_DEFINITIONS } from './flow';
import { SECTIONING_DEFINITIONS } from './sectioning';
import { HEADING_DEFINITIONS } from './heading';
import { PHRASING_DEFINITIONS } from './phrasing';
import { EMBEDDED_DEFINITIONS } from './embeded';
import { INTERACTIVE_DEFINITIONS } from './interactive';
import { PALPABLE_DEFINITIONS } from './palpable';
import { LIST_DEFINITIONS } from './list';
import { TABLE_DEFINITIONS } from './table';
import { FORM_DEFINITIONS } from './form';

// Register elements directly
registerElements([...FLOW_DEFINITIONS, ...SECTIONING_DEFINITIONS, ...HEADING_DEFINITIONS, ...PHRASING_DEFINITIONS, ...EMBEDDED_DEFINITIONS, ...INTERACTIVE_DEFINITIONS, ...PALPABLE_DEFINITIONS, ...LIST_DEFINITIONS, ...TABLE_DEFINITIONS, ...FORM_DEFINITIONS]);
