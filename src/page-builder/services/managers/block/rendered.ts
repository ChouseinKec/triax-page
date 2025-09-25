// Utilities
import { renderBlockStyles, renderBlockAttributes } from '@/src/page-builder/core/block/block/utilities';

// Managers
import { getSelectedDeviceID, getAllOrientations, getAllPseudos, useSelectedOrientation, useSelectedPseudo } from '@/src/page-builder/services/managers/page';

// Stores
import useBlockStore from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';

/**
 * Reactive hook to get rendered CSS styles for a block.
 * Combines block styles with current device, orientation, and pseudo states.
 * @param blockID - The block identifier
 * @returns Rendered CSS string or undefined if block doesn't exist or has no styles
 * @example
 * const styles = useRenderedBlockStyles('block-123'); // 'color: red; font-size: 16px;'
 */
export function useRenderedBlockStyles(blockID: BlockID): string | undefined {
	const styles = useBlockStore((state) => state.allBlocks[blockID]?.styles);
	const currentDevice = getSelectedDeviceID();
	const selectedOrientation = useSelectedOrientation();
	const selectedPseudo = useSelectedPseudo();

	if (!styles || !currentDevice || !selectedOrientation || !selectedPseudo) return undefined;

	const orientations = getAllOrientations();
	const pseudos = getAllPseudos();
	const orientation = orientations.find((o) => o.name === selectedOrientation.name);
	const pseudo = pseudos.find((p) => p.name === selectedPseudo.name);

	if (!orientation || !pseudo) return undefined;

	return renderBlockStyles(styles, blockID, currentDevice, orientation, pseudo);
}

/**
 * Reactive hook to get rendered HTML attributes for a block.
 * Combines block attributes with any additional processing needed for HTML rendering.
 * @param blockID - The block identifier
 * @returns Rendered attributes object or null if block doesn't exist or has no attributes
 * @example
 * const attributes = useRenderedBlockAttributes('block-123'); // { class: 'my-class', id: 'block-123' }
 */
export function useRenderedBlockAttributes(blockID: BlockID): Record<string, string | boolean> | null {
	const attributes = useBlockStore((state) => state.allBlocks[blockID]?.attributes);
	if (attributes === undefined) return null;
	return renderBlockAttributes(attributes);
}
