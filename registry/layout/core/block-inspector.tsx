import { PanelDefinition } from "@/types/layout/panel";

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const BlockInspector: PanelDefinition = {
	id: "block-inspector",
	initialPosition: { top: "7%", left: "79.5%" },
	initialSize: { width: "300px", height: "91%", minWidth: 300, minHeight: 250 },
	initialLocked: true,
	title: "Block Inspector",
	initialOpen: true,
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z" />
		</svg>
	),
	order: 30,
	workspace: "HTML",
};

export default BlockInspector;
