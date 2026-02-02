// Types
import type { PanelDefinition } from '@/core/layout/panel/types';

/**
 * Block Library panel definition.
 * A panel that displays available blocks for the editor.
 */
const Liblary: PanelDefinition = {
	key: "library",
	benchKey: "main",
	title: "Library",
	position: { top: 3.5, left: 12 },
	size: { width: 10, height: 40, minWidth: 200, minHeight: 500 },
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white">
			<path d="M120-440v-320q0-33 23.5-56.5T200-840h240v400H120Zm240-80Zm160-320h240q33 0 56.5 23.5T840-760v160H520v-240Zm0 720v-400h320v320q0 33-23.5 56.5T760-120H520ZM120-360h320v240H200q-33 0-56.5-23.5T120-200v-160Zm240 80Zm240-400Zm0 240Zm-400-80h160v-240H200v240Zm400-160h160v-80H600v80Zm0 240v240h160v-240H600ZM200-280v80h160v-80H200Z" />
		</svg>
	),
	isLocked: true,
	isOpen: false,
	order: 10,
};

export default Liblary;
