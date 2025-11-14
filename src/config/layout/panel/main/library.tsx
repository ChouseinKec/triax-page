// Types
import type { PanelDefinition } from '@/src/core/layout/panel/types';
	
/**
 * Block Library panel definition.
 * A panel that displays available blocks for the editor.
 */
const MainLibrary: PanelDefinition = {
	id: "main-library",
	title: "Library",
	initialPosition: { top: "7%", left: "17%" },
	initialSize: { width: "200px", height: "250px", minWidth: 200, minHeight: 250 },
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
		</svg>
	),
	workbenchID: "main",
	initialLocked: true,
	initialOpen: false,
	order: 10,
};

export default MainLibrary;
