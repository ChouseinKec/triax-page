import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockStoreProps } from './types';
import type { BlockStyleData, BlockInstance, BlockType } from '@/types/block/block';

// Constants
import { BlockStyleDefaults } from '@/constants/block/style';

function createBlockStyles(): BlockStyleData {
	const defaults = {
		...BlockStyleDefaults,
		all: {
			...BlockStyleDefaults.all,
		},
	};

	return {
		all: {
			all: defaults,
		},
	};
}

function createBlock(type: BlockType, parentBlock?: string): BlockInstance {
	const permittedContent = null;
	const permittedParent = null;

	return {
		id: uuidv4(),
		styles: createBlockStyles(),
		attributes: {},
		parentID: parentBlock ?? null,
		contentIDs: [],
		tag: 'div',
		tags: [],
		permittedContent,
		permittedParent,
		type,
	};
}

/**
 * Zustand hook for accessing and updating the block editor state.
 */
const useBlockStore = create<BlockStoreProps>((set, get) => ({
	/**
	 * The currently selected block ID.
	 */
	selectedBlockID: 'dc829b55-db25-432b-a835-9d1c8515b310',

	/**
	 * A record of all allBlocks with their associated styles.
	 */
	allBlocks: {
		'b6129288-b014-4b62-9b6a-9f2423d49868': {
			id: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
							width: '100%',
							height: 'auto',
							display: 'flex',
							'flex-direction': 'column',
						},
					},
				},
				'mobile-sm': {
					all: {
						all: {
							'flex-direction': 'column-reverse',
							display: 'flex',
						},
					},
				},
			},
			attributes: {},
			parentID: null,
			contentIDs: ['01352b04-0846-4a2f-af6d-25da9211926c', 'df4b6c62-330b-455c-8ee2-c5b46cc30c15', '927637c5-bed9-4613-93eb-c0a378b664c2', 'f5130dfe-4471-4647-ae82-0406b0dc8842', 'a58cf88a-2876-456a-9d13-b6870bf5c9e8', 'aecb3c51-9451-4792-8e11-c6595942df03'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'01352b04-0846-4a2f-af6d-25da9211926c': {
			id: '01352b04-0846-4a2f-af6d-25da9211926c',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
						},
					},
				},
			},
			attributes: {},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: ['06a6d5c5-1a63-449d-bbc1-968530d3f1c9', '2b1f0598-e532-43c0-863d-45123c069069', '62a2376e-6c8d-4a7a-be39-67ca0530ef36'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'06a6d5c5-1a63-449d-bbc1-968530d3f1c9': {
			id: '06a6d5c5-1a63-449d-bbc1-968530d3f1c9',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '20px',
							color: '#ffffff',
						},
					},
				},
			},
			attributes: {
				text: 'Navigation:',
			},
			parentID: '01352b04-0846-4a2f-af6d-25da9211926c',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'2b1f0598-e532-43c0-863d-45123c069069': {
			id: '2b1f0598-e532-43c0-863d-45123c069069',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#ffffff',
							'outline-style': 'none',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'Pan: Click and hold the mouse wheel to move around the canvas.',
			},
			parentID: '01352b04-0846-4a2f-af6d-25da9211926c',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'62a2376e-6c8d-4a7a-be39-67ca0530ef36': {
			id: '62a2376e-6c8d-4a7a-be39-67ca0530ef36',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#ffffff',
							'outline-style': 'none',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'Zoom: Hold Ctrl and scroll with your mouse wheel to zoom in and out.',
			},
			parentID: '01352b04-0846-4a2f-af6d-25da9211926c',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'df4b6c62-330b-455c-8ee2-c5b46cc30c15': {
			id: 'df4b6c62-330b-455c-8ee2-c5b46cc30c15',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
						},
					},
				},
			},
			attributes: {},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: ['02f80ca2-9715-4bbe-8842-1fd3230a0f3d', '418994a2-6166-41ba-830a-ac1cd21e53a6'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'02f80ca2-9715-4bbe-8842-1fd3230a0f3d': {
			id: '02f80ca2-9715-4bbe-8842-1fd3230a0f3d',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '20px',
							color: '#ffffff',
							'outline-style': 'none',
						},
					},
				},
			},
			attributes: {
				text: 'Device Preview:',
			},
			parentID: 'df4b6c62-330b-455c-8ee2-c5b46cc30c15',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'418994a2-6166-41ba-830a-ac1cd21e53a6': {
			id: '418994a2-6166-41ba-830a-ac1cd21e53a6',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#ffffff',
							'outline-style': 'none',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'Use the top bar to switch between devices. The editor will cascade styles according to official CSS cascade rules.',
			},
			parentID: 'df4b6c62-330b-455c-8ee2-c5b46cc30c15',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'927637c5-bed9-4613-93eb-c0a378b664c2': {
			id: '927637c5-bed9-4613-93eb-c0a378b664c2',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
						},
					},
				},
			},
			attributes: {},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: ['3c444390-8044-41ce-93fc-72da89dd153d', '57a12a79-7180-4c93-ae31-63bb6973c8a8'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'3c444390-8044-41ce-93fc-72da89dd153d': {
			id: '3c444390-8044-41ce-93fc-72da89dd153d',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '20px',
							color: '#ffffff',
							'outline-style': 'none',
						},
					},
				},
			},
			attributes: {
				text: 'Block Management:',
			},
			parentID: '927637c5-bed9-4613-93eb-c0a378b664c2',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'57a12a79-7180-4c93-ae31-63bb6973c8a8': {
			id: '57a12a79-7180-4c93-ae31-63bb6973c8a8',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							'outline-style': 'none',
							color: '#ffffff',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'Add/Delete/Nest: You can add, delete, and nest blocks. Currently, only "Text" and "Container" blocks are available.',
			},
			parentID: '927637c5-bed9-4613-93eb-c0a378b664c2',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'f5130dfe-4471-4647-ae82-0406b0dc8842': {
			id: 'f5130dfe-4471-4647-ae82-0406b0dc8842',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
						},
					},
				},
			},
			attributes: {},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: ['06f75502-2a52-4380-9afc-5b029e5c0cd5', '0a84e949-e0a7-4d0c-b970-d2dd57740ea1', 'a4c438c3-820c-4e3c-af9c-9498a3d6ecf0'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'06f75502-2a52-4380-9afc-5b029e5c0cd5': {
			id: '06f75502-2a52-4380-9afc-5b029e5c0cd5',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '20px',
							'outline-style': 'none',
							color: '#ffffff',
						},
					},
				},
			},
			attributes: {
				text: 'Style Panel:',
			},
			parentID: 'f5130dfe-4471-4647-ae82-0406b0dc8842',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'0a84e949-e0a7-4d0c-b970-d2dd57740ea1': {
			id: '0a84e949-e0a7-4d0c-b970-d2dd57740ea1',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#ffffff',
							'outline-style': 'none',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'On the right, adjust the style of each block individually. Styles cascade and inherit according to device, orientation, and pseudo-state.',
			},
			parentID: 'f5130dfe-4471-4647-ae82-0406b0dc8842',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'a58cf88a-2876-456a-9d13-b6870bf5c9e8': {
			id: 'a58cf88a-2876-456a-9d13-b6870bf5c9e8',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#610000',
							display: 'none',
						},
					},
				},
				'mobile-sm': {
					all: {
						all: {
							display: 'block',
						},
					},
				},
			},
			attributes: {
				text: 'This should be only visible in Mobile-SM',
			},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'a4c438c3-820c-4e3c-af9c-9498a3d6ecf0': {
			id: 'a4c438c3-820c-4e3c-af9c-9498a3d6ecf0',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '15px',
							color: '#00058a',
							'outline-style': 'none',
							'margin-left': '10px',
						},
					},
				},
			},
			attributes: {
				text: 'Select Tablet-LG to test it',
			},
			parentID: 'f5130dfe-4471-4647-ae82-0406b0dc8842',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
		'aecb3c51-9451-4792-8e11-c6595942df03': {
			id: 'aecb3c51-9451-4792-8e11-c6595942df03',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '10px',
							display: 'none',
						},
					},
				},
				'tablet-lg': {
					all: {
						all: {
							display: 'block',
						},
					},
				},
			},
			attributes: {},
			parentID: 'b6129288-b014-4b62-9b6a-9f2423d49868',
			contentIDs: ['02102c38-88ec-4a28-929f-eaf8ee103908'],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'container',
		},
		'02102c38-88ec-4a28-929f-eaf8ee103908': {
			id: '02102c38-88ec-4a28-929f-eaf8ee103908',
			styles: {
				all: {
					all: {
						all: {
							'padding-top': '10px',
							'padding-bottom': '10px',
							'padding-left': '10px',
							'padding-right': '10px',
							'margin-top': '10px',
							'margin-bottom': '10px',
							'background-color': 'rgba(111, 155, 191, 0.3)',
							'border-top-style': 'solid',
							'border-bottom-style': 'solid',
							'border-left-style': 'solid',
							'border-right-style': 'solid',
							'border-top-width': '1px',
							'border-bottom-width': '1px',
							'border-left-width': '1px',
							'border-right-width': '1px',
							'border-top-color': '#ffffff',
							'border-bottom-color': '#ffffff',
							'border-left-color': '#ffffff',
							'border-right-color': '#ffffff',
							'font-size': '40px',
							'text-align-last': '',
							'text-align': 'center',
							color: '#ffffff',
						},
					},
				},
			},
			attributes: {
				text: 'HIRE ME!! :)',
			},
			parentID: 'aecb3c51-9451-4792-8e11-c6595942df03',
			contentIDs: [],
			tag: 'div',
			tags: [],
			permittedContent: null,
			permittedParent: null,
			type: 'text',
		},
	},

	/**
	 * Sets the currently selected block by ID.
	 *
	 * @param  blockID - The ID of the block to select.
	 */
	selectBlock: (blockID) => set({ selectedBlockID: blockID }),

	/**
	 * Adds a new block to the editor.
	 *
	 * @param parentID - Optional ID of the parent block to add the new block under.
	 * @returns - The newly created block instance.
	 */
	addBlock: (type, parentID) => {
		set((state) => {
			const newBlock = createBlock(type, parentID);

			// If a parent ID is provided, add the new block to the parent's children
			if (parentID) {
				const parentBlock = get().getBlock(parentID);
				if (parentBlock) {
					parentBlock.contentIDs.push(newBlock.id);
				}
			}

			// Optionally, you can select the new block after adding it
			// get().selectBlock(newBlock.id);

			// Add the new block to the allBlocks state
			return {
				allBlocks: {
					...state.allBlocks,
					[newBlock.id]: newBlock,
				},
			};
		});
	},

	/**
	 * Deletes a block from the editor.
	 *
	 * @param blockID - The ID of the block to delete.
	 */
	deleteBlock: (blockID) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			// Create a shallow copy of allBlocks
			const updatedBlocks = { ...state.allBlocks };

			// Remove this block from its parent's children array (immutably)
			if (block.parentID) {
				const parentBlock = updatedBlocks[block.parentID];
				if (parentBlock) {
					updatedBlocks[block.parentID] = {
						...parentBlock,
						contentIDs: parentBlock.contentIDs.filter((childID) => childID !== blockID),
					};
				}
			}

			// Remove all children recursively
			const removeChildren = (childrenIDs: string[]) => {
				childrenIDs.forEach((childID) => {
					const childBlock = updatedBlocks[childID];
					if (childBlock) {
						if (childBlock.contentIDs && childBlock.contentIDs.length > 0) {
							removeChildren(childBlock.contentIDs);
						}
						delete updatedBlocks[childID];
					}
				});
			};

			if (block.contentIDs && block.contentIDs.length > 0) {
				removeChildren(block.contentIDs);
			}

			// Delete the block itself
			delete updatedBlocks[blockID];

			// If the deleted block was selected, clear selection
			const selectedBlockID = state.selectedBlockID === blockID ? null : state.selectedBlockID;

			return {
				allBlocks: updatedBlocks,
				selectedBlockID,
			};
		});
	},

	/**
	 * Retrieves the block data for a given block ID.
	 *
	 * @param blockID - The ID of the block to retrieve.
	 * @returns - The block data if found, otherwise undefined.
	 */
	getBlock: (blockID) => {
		if (!blockID) return undefined;

		return get().allBlocks[blockID];
	},

	/**
	 * Updates the style object for the currently selected block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param styles - The updated style object.
	 * @return - The updated block instance with new styles.
	 */
	setBlockStyles: (blockID, styles) => {
		set((state) => {
			if (!blockID) return state; // Return unchanged state if invalid

			const block = get().getBlock(blockID);
			if (!block) return state; // Return unchanged state if invalid

			return {
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
						...block,
						styles,
					},
				},
			};
		});
	},

	/**
	 * Sets a specific style property for a specific block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param device - The device type (e.g., 'desktop', 'mobile').
	 * @param orientation - The orientation (e.g., 'portrait', 'landscape').
	 * @param pseudo - The pseudo-class (e.g., 'default', 'hover', 'active').
	 * @param property - The CSS property to set.
	 * @param value - The value to set for the CSS property.
	 * @return - The updated block instance with the new style property.
	 */
	setBlockStyle: (blockID, device, orientation, pseudo, property, value) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			if (!block.styles) return state;

			const updatedStyles = {
				...block.styles,
				[device]: {
					...block.styles[device],
					[orientation]: {
						...block.styles[device]?.[orientation],
						[pseudo]: {
							...block.styles[device]?.[orientation]?.[pseudo],
							[property]: value,
						},
					},
				},
			};

			return {
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
						...block,
						styles: updatedStyles,
					},
				},
			};
		});
	},

	/**
	 * Sets a specific attribute for a specific block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param attribute - The attribute name to set.
	 * @param value - The value to set for the attribute.
	 */
	setBlockAttribute: (blockID, attribute, value) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			return {
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
						...block,
						attributes: {
							...block.attributes,
							[attribute]: value,
						},
					},
				},
			};
		});
	},
}));

export default useBlockStore;
