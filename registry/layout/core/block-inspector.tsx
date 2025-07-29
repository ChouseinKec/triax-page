import { PanelDefinition } from '@/types/layout/panel';

/**
 * Container block definition.
 * A generic container that can hold other blocks.
 */
const BlockInspector: PanelDefinition = {
	id: 'block-inspector',
	initialPosition: { top: '7%', left: '79.5%' },
	initialSize: { width: '300px', height: '91%', minWidth: 300, minHeight: 250 },
	initialLocked: true,
	title: 'Block Inspector',
	isOpen: true,
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
			<path fill="white" d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z" />
		</svg>
	),
	order: 20,
	workspace: 'HTML',
};

export default BlockInspector;
