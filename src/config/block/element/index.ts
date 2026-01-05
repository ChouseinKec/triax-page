// Types
import type { ElementDefinition } from '@/src/core/block/element/types';

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

/**
 * Registry of element definitions mapped by their tags.
 * Frozen to prevent mutations.
 */
export const CoreElements: ElementDefinition[] = [...FLOW_DEFINITIONS, ...SECTIONING_DEFINITIONS, ...HEADING_DEFINITIONS, ...PHRASING_DEFINITIONS, ...EMBEDDED_DEFINITIONS, ...INTERACTIVE_DEFINITIONS, ...PALPABLE_DEFINITIONS, ...LIST_DEFINITIONS, ...TABLE_DEFINITIONS, ...FORM_DEFINITIONS];
