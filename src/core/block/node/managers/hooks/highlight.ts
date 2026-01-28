// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { HighlightedNode } from '@/core/block/node/types';

/**
 * Reactive hook to get the highlighted text of the currently selected block.
 * @returns The highlighted block text or null if no text is highlighted
 */
export function useHighlightText(): HighlightedNode {
    return useBlockStore((state) => state.highlightedNode);
}
