// Types
import type { Slot, SlotTerminal, SlotFunction, SlotGroup } from '@/core/block/style/types';

export type Variation = Slot[];

export type SimplifiedVariation = (SlotTerminal | SlotFunction | SlotGroup)[];
