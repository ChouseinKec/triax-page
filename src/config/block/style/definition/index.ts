// Types
import type { StyleDefinition } from '@/src/core/block/style/types';

// Constants
import { BACKGROUND_DEFINITIONS } from './background';
import { BORDER_DEFINITIONS } from './border';
import { DISPLAY_DEFINITIONS } from './display';
import { EFFECT_DEFINITIONS } from './effect';
import { FONT_DEFINITIONS } from './font';
import { SIZE_DEFINITIONS } from './size';

const MERGED = [...BACKGROUND_DEFINITIONS, ...BORDER_DEFINITIONS, ...DISPLAY_DEFINITIONS, ...EFFECT_DEFINITIONS, ...FONT_DEFINITIONS, ...SIZE_DEFINITIONS];

export const CoreStyles: StyleDefinition[] = Object.values(MERGED);
