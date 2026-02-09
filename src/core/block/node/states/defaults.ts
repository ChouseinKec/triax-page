import type { NodeInstance, NodeID } from '@/core/block/node/types/instance';

export const DefaultBlocks: Record<NodeID, NodeInstance> = {
	// HTML root wrapper
	html: {
		id: 'html',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
					},
				},
			},
		},
		elementKey: 'html',
		attributes: {},
		parentID: null as any,
		childNodeIDs: ['head', 'body'],
		definitionKey: 'core-container',
		data: {},
	},

	// Head for global elements
	head: {
		id: 'head',
		styles: {
			default: {
				default: {
					default: {
						display: 'none', // Head is not visible
					},
				},
			},
		},
		elementKey: 'head',
		attributes: {},
		parentID: 'html',
		childNodeIDs: [],
		definitionKey: 'core-container',
		data: {
			hidePlaceholder: true,
		},
	},

	// body container
	body: {
		id: 'body',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: '100%',
						overflow: 'auto',
						'background-color': 'rgb(255, 255, 255)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						'justify-content': 'flex-start',

						'padding-top': '2%',
						'padding-right': '10%',
						'padding-bottom': '2%',
						'padding-left': '10%',

						'row-gap': '8rem',

						'font-family': 'Geist, Arial, sans-serif',
						'line-height': '1.6',
						color: 'rgb(28, 28, 28)',
						'background-image': 'linear-gradient(135deg, rgb(248, 249, 250) 0%, rgb(233, 236, 239) 100%)',
					},
				},
			},
		},
		elementKey: 'body',
		attributes: {},
		parentID: 'html',
		childNodeIDs: ['hero-section', 'block-container', 'block-markdown-container', 'block-list-container', 'block-table-container', 'block-image-container'],
		definitionKey: 'core-container',
		data: {},
	},

	// Hero Section
	'hero-section': {
		id: 'hero-section',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'center',

						'text-align': 'center',
						width: '100%',
					},
				},
			},
			mobile: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'section',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['hero-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'hero-content': {
		id: 'hero-content',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-section',
		childNodeIDs: ['hero-title', 'hero-subtitle', 'hero-description', 'hero-features'],
		definitionKey: 'core-container',
		data: {},
	},

	'hero-title': {
		id: 'hero-title',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '4rem',
						'font-weight': 'bold',
						'margin-bottom': '1rem',

						'background-image': 'linear-gradient(45deg, rgb(24, 117, 254), rgb(0, 212, 255))',
						'background-clip': 'text',
						color: 'transparent',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'font-size': '2.5rem',
					},
				},
			},
		},
		elementKey: 'h1',
		attributes: {},
		parentID: 'hero-content',
		childNodeIDs: ['hero-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'hero-title-text': {
		id: 'hero-title-text',
		styles: {
			default: {
				default: {
					default: {
						'background-clip': 'text',
					},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'hero-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Triax',
		},
	},

	'hero-subtitle': {
		id: 'hero-subtitle',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1.5rem',
						'margin-bottom': '2rem',

						color: 'rgb(74, 85, 104)',
						'font-weight': '500',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'hero-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Advanced Page Builder Toolbox',
		},
	},

	'hero-description': {
		id: 'hero-description',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1.2rem',
						'margin-bottom': '2rem',

						'margin-left': 'auto',
						'margin-right': 'auto',
						'max-width': '600px',
						color: 'rgb(113, 128, 150)',
						'line-height': '1.8',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'hero-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'A powerful, plugin-friendly platform that empowers designers, programmers, users, and admins to create dynamic, responsive web experiences with official HTML/CSS compliance, cascading styles, multi-device editing, and strict element hierarchy validation.',
		},
	},

	'hero-features': {
		id: 'hero-features',
		styles: {
			default: {
				default: {
					default: {
						display: 'grid',
						'grid-template-columns': 'repeat(auto-fit, minmax(100px, 1fr))',
						gap: '1.5rem',
						'margin-top': '2rem',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'grid-template-columns': '1fr',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-content',
		childNodeIDs: ['feature-1-container', 'feature-2-container', 'feature-3-container', 'feature-4-container'],
		definitionKey: 'core-container',
		data: {},
	},

	'feature-1-container': {
		id: 'feature-1-container',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						gap: '1rem',
						'padding-top': '1.25rem',
						'padding-right': '1.25rem',
						'padding-bottom': '1.25rem',
						'padding-left': '1.25rem',
						'background-color': 'rgb(219, 234, 254)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'backdrop-filter': 'blur(10px)',
						color: 'rgb(45, 55, 72)',
						'box-shadow': '0px 2px 8px rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: ['feature-1-image', 'feature-1'],
		definitionKey: 'core-container',
		data: {},
	},

	'feature-1-image': {
		id: 'feature-1-image',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: 'auto',
						'max-width': '35px',
						margin: '0 auto',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="%231875fe"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/></svg>',
			alt: 'Official HTML/CSS Compliance',
		},
		parentID: 'feature-1-container',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'feature-1': {
		id: 'feature-1',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'center',
						gap: '0.75rem',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'feature-1-container',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Official HTML/CSS Compliance',
		},
	},

	'feature-2-container': {
		id: 'feature-2-container',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						gap: '1rem',
						'padding-top': '1.25rem',
						'padding-right': '1.25rem',
						'padding-bottom': '1.25rem',
						'padding-left': '1.25rem',
						'background-color': 'rgb(220, 252, 231)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'backdrop-filter': 'blur(10px)',
						color: 'rgb(45, 55, 72)',
						'box-shadow': '0px 2px 8px rgb(34, 197, 94)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: ['feature-2-image', 'feature-2'],
		definitionKey: 'core-container',
		data: {},
	},

	'feature-2-image': {
		id: 'feature-2-image',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: 'auto',
						'max-width': '35px',
						margin: '0 auto',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="%2322c55e"><path d="M237.66,66.34a8,8,0,0,0-11.32,0L192,100.69,155.31,64l34.35-34.34a8,8,0,1,0-11.32-11.32L144,52.69,117.66,26.34a8,8,0,0,0-11.32,11.32L112.69,44l-53,53a40,40,0,0,0,0,56.57l15.71,15.71L26.34,218.34a8,8,0,0,0,11.32,11.32l49.09-49.09,15.71,15.71a40,40,0,0,0,56.57,0l53-53,6.34,6.35a8,8,0,0,0,11.32-11.32L203.31,112l34.35-34.34A8,8,0,0,0,237.66,66.34ZM147.72,185a24,24,0,0,1-33.95,0L71,142.23a24,24,0,0,1,0-33.95l53-53L200.69,132Z"/></svg>',
			alt: 'Plugin-Friendly Architecture',
		},
		parentID: 'feature-2-container',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'feature-2': {
		id: 'feature-2',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'center',
						gap: '0.75rem',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'feature-2-container',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Plugin-Friendly Architecture',
		},
	},

	'feature-3-container': {
		id: 'feature-3-container',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						gap: '1rem',
						'padding-top': '1.25rem',
						'padding-right': '1.25rem',
						'padding-bottom': '1.25rem',
						'padding-left': '1.25rem',
						'background-color': 'rgb(254, 243, 199)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'backdrop-filter': 'blur(10px)',
						color: 'rgb(45, 55, 72)',
						'box-shadow': '0px 2px 8px rgb(234, 179, 8)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: ['feature-3-image', 'feature-3'],
		definitionKey: 'core-container',
		data: {},
	},

	'feature-3-image': {
		id: 'feature-3-image',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: 'auto',
						'max-width': '35px',
						margin: '0 auto',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="%23eab308"><path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z"/></svg>',
			alt: 'Multi-Device Editing',
		},
		parentID: 'feature-3-container',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'feature-3': {
		id: 'feature-3',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'center',
						gap: '0.75rem',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'feature-3-container',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Multi-Device Editing',
		},
	},

	'feature-4-container': {
		id: 'feature-4-container',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						gap: '1rem',
						'padding-top': '1.25rem',
						'padding-right': '1.25rem',
						'padding-bottom': '1.25rem',
						'padding-left': '1.25rem',
						'background-color': 'rgb(243, 232, 255)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'backdrop-filter': 'blur(10px)',
						color: 'rgb(45, 55, 72)',
						'box-shadow': '0px 2px 8px rgb(168, 85, 247)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: ['feature-4-image', 'feature-4'],
		definitionKey: 'core-container',
		data: {},
	},

	'feature-4-image': {
		id: 'feature-4-image',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: 'auto',
						'max-width': '35px',
						margin: '0 auto',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="%23a855f7"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Z"/></svg>',
			alt: 'Cascading Styles System',
		},
		parentID: 'feature-4-container',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'feature-4': {
		id: 'feature-4',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'center',
						gap: '0.75rem',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'feature-4-container',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Cascading Styles System',
		},
	},

	// Block Container Section
	'block-container': {
		id: 'block-container',
		styles: {
			default: {
				default: {
					default: {
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(24, 117, 254)',

						'padding-left': '1.5rem',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-container-wrapper'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-container-wrapper': {
		id: 'block-container-wrapper',
		styles: {
			default: {
				default: {
					default: {
						// 'background-color': 'rgb(249, 250, 251)',
						// 'border-top-left-radius': '8px',
						// 'border-top-right-radius': '8px',
						// 'border-bottom-right-radius': '8px',
						// 'border-bottom-left-radius': '8px',
						// 'border-left-width': '4px',
						// 'border-left-style': 'solid',
						// 'border-left-color': 'rgb(24, 117, 254)',
						// 'box-shadow': '0px 2px 6px rgb(0, 0, 0, 0.05)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-container',
		childNodeIDs: ['block-container-title', 'block-container-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-container-title': {
		id: 'block-container-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',

						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-container-wrapper',
		childNodeIDs: ['block-container-title-text'],
		definitionKey: 'core-header',
		data: {},
	},
	'block-container-title-text': {
		id: 'block-container-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-container-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Core-Container',
		},
	},

	'block-container-content': {
		id: 'block-container-content',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'row',
						gap: '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'flex-wrap': 'wrap',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-container-wrapper',
		childNodeIDs: ['block-container-content-text', 'block-container-content-node'],
		definitionKey: 'core-container',
		data: {},
	},
	'block-container-content-text': {
		id: 'block-container-content-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-container-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'A flexible container used to group and organize layout elements. Renders as div, section, article, aside, or nav tags. Perfect for wrapping content blocks, creating page sections, organizing page layouts, and structuring component hierarchies.',
		},
	},
	'block-container-content-node': {
		id: 'block-container-content-node',
		styles: {
			default: {
				default: {
					default: {
						'min-width': '45%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0px 2px 8px rgb(0, 0, 0, 0.1)',
						display: 'flex',
						'flex-direction': 'column',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '1rem',
						gap: '0.75rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-container-content',
		childNodeIDs: ['block-container-content-node-title', 'block-container-content-node-text'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-container-content-node-title': {
		id: 'block-container-content-node-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': '600',
						'font-size': '0.95rem',
						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h4',
		attributes: {},
		parentID: 'block-container-content-node',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Example Block',
		},
	},

	'block-container-content-node-text': {
		id: 'block-container-content-node-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: 'rgb(113, 128, 150)',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-container-content-node',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Try editing the content, styles, and structure to see how containers organize elements.',
		},
	},

	// Block Markdown Section
	'block-markdown-container': {
		id: 'block-markdown-container',
		styles: {
			default: {
				default: {
					default: {
						'border-right-width': '4px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(168, 85, 247)',

						'padding-right': '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						direction: 'ltr',

						'border-right-width': '0px',

						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(168, 85, 247)',
						'padding-left': '1.5rem',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-markdown-wrapper'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-markdown-wrapper': {
		id: 'block-markdown-wrapper',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-markdown-container',
		childNodeIDs: ['block-markdown-title', 'block-markdown-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-markdown-title': {
		id: 'block-markdown-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						direction: 'rtl',
						color: 'rgb(168, 85, 247)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						direction: 'ltr',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-markdown-wrapper',
		childNodeIDs: ['block-markdown-title-text'],
		definitionKey: 'core-header',
		data: {},
	},
	'block-markdown-title-text': {
		id: 'block-markdown-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-markdown-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Core-Markdown',
		},
	},

	'block-markdown-content': {
		id: 'block-markdown-content',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'row-reverse',
						gap: '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'flex-wrap': 'wrap',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-markdown-wrapper',
		childNodeIDs: ['block-markdown-content-text', 'block-markdown-content-node'],
		definitionKey: 'core-container',
		data: {},
	},
	'block-markdown-content-text': {
		id: 'block-markdown-content-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-markdown-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'A markdown element for rendering formatted text content. Supports rich text formatting including bold, italics, links, and other markdown syntax. Perfect for paragraphs, descriptions, headers, and any text-based content that needs semantic HTML rendering with flexible styling options.',
		},
	},
	'block-markdown-content-node': {
		id: 'block-markdown-content-node',
		styles: {
			default: {
				default: {
					default: {
						'min-width': '45%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0px 2px 8px rgb(0, 0, 0, 0.1)',
						display: 'flex',
						'flex-direction': 'column',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '1rem',
						gap: '0.75rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-markdown-content',
		childNodeIDs: ['block-markdown-content-node-paragraph'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-markdown-content-node-paragraph': {
		id: 'block-markdown-content-node-paragraph',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: 'rgb(113, 128, 150)',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-markdown-content-node',
		childNodeIDs: ['block-markdown-content-node-paragraph-p1', 'block-markdown-content-node-paragraph-p2', 'block-markdown-content-node-paragraph-p3', 'block-markdown-content-node-paragraph-p4', 'block-markdown-content-node-paragraph-p5', 'block-markdown-content-node-paragraph-p6'],
		definitionKey: 'core-markdown',
		data: {},
	},

	'block-markdown-content-node-paragraph-p1': {
		id: 'block-markdown-content-node-paragraph-p1',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'This is a ',
		},
	},

	'block-markdown-content-node-paragraph-p2': {
		id: 'block-markdown-content-node-paragraph-p2',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'b',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'rich text markdown editor',
		},
	},

	'block-markdown-content-node-paragraph-p3': {
		id: 'block-markdown-content-node-paragraph-p3',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: '. Highlight any portion of the text you want to format, then apply semantic elements from the ',
		},
	},

	'block-markdown-content-node-paragraph-p4': {
		id: 'block-markdown-content-node-paragraph-p4',
		styles: {
			default: {
				default: {
					default: {
						'background-color': 'rgb(168, 85, 247)',
						color: 'rgb(255, 255, 255)',
						'padding-top': '0.2rem',
						'padding-right': '0.4rem',
						'padding-bottom': '0.2rem',
						'padding-left': '0.4rem',
						'border-radius': '3px',
						'font-size': '0.85em',
					},
				},
			},
		},
		elementKey: 'mark',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'node-action-bar',
		},
	},

	'block-markdown-content-node-paragraph-p5': {
		id: 'block-markdown-content-node-paragraph-p5',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: ' to transform it into ',
		},
	},

	'block-markdown-content-node-paragraph-p6': {
		id: 'block-markdown-content-node-paragraph-p6',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'i',
		attributes: {},
		parentID: 'block-markdown-content-node-paragraph',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'bold, italic, links, code, strikethrough, or any other semantic HTML element.',
		},
	},

	// Block List Section
	'block-list-container': {
		id: 'block-list-container',
		styles: {
			default: {
				default: {
					default: {
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(34, 197, 94)',

						'padding-left': '1.5rem',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-list-wrapper'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-list-wrapper': {
		id: 'block-list-wrapper',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-list-container',
		childNodeIDs: ['block-list-title', 'block-list-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-list-title': {
		id: 'block-list-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',

						color: 'rgb(34, 197, 94)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-list-wrapper',
		childNodeIDs: ['block-list-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-list-title-text': {
		id: 'block-list-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-list-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Core-List',
		},
	},

	'block-list-content': {
		id: 'block-list-content',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'row',
						gap: '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'flex-wrap': 'wrap',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-list-wrapper',
		childNodeIDs: ['block-list-content-text', 'block-list-content-node'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-list-content-text': {
		id: 'block-list-content-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-list-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'A list element for organizing items in ordered or unordered sequences. Supports nested lists, custom styling, and semantic list markup (ul, ol, li). Perfect for navigation menus, feature lists, step-by-step instructions, and data organization.',
		},
	},

	'block-list-content-node': {
		id: 'block-list-content-node',
		styles: {
			default: {
				default: {
					default: {
						'min-width': '45%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0px 2px 8px rgb(0, 0, 0, 0.1)',
						display: 'flex',
						'flex-direction': 'column',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '35px',
						gap: '0.75rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'ul',
		attributes: {},
		parentID: 'block-list-content',
		childNodeIDs: ['block-list-item-1', 'block-list-item-2'],
		definitionKey: 'core-list',
		data: {},
	},

	'block-list-item-1': {
		id: 'block-list-item-1',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: 'rgb(113, 128, 150)',
						'margin-bottom': '0.5rem',
					},
				},
			},
		},
		elementKey: 'li',
		attributes: {},
		parentID: 'block-list-content-node',
		childNodeIDs: ['block-list-item-1-text'],
		definitionKey: 'core-list-item',
		data: {},
	},

	'block-list-item-2': {
		id: 'block-list-item-2',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: 'rgb(113, 128, 150)',
						'margin-bottom': '0.5rem',
					},
				},
			},
		},
		elementKey: 'li',
		attributes: {},
		parentID: 'block-list-content-node',
		childNodeIDs: ['block-list-item-2-text'],
		definitionKey: 'core-list-item',
		data: {},
	},

	'block-list-item-1-text': {
		id: 'block-list-item-1-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-list-item-1',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Organize items in sequences with flexible styling and semantic markup.',
		},
	},

	'block-list-item-2-text': {
		id: 'block-list-item-2-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-list-item-2',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Support nested structures for complex hierarchies and multi-level content.',
		},
	},

	// Block Table Section
	'block-table-container': {
		id: 'block-table-container',
		styles: {
			default: {
				default: {
					default: {
						'border-right-width': '4px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(249, 115, 22)',

						'padding-right': '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						direction: 'ltr',

						'border-right-width': '0px',

						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(249, 115, 22)',
						'padding-left': '1.5rem',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-table-wrapper'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-table-wrapper': {
		id: 'block-table-wrapper',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-table-container',
		childNodeIDs: ['block-table-title', 'block-table-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-table-title': {
		id: 'block-table-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						direction: 'rtl',
						color: 'rgb(249, 115, 22)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						direction: 'ltr',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-table-wrapper',
		childNodeIDs: ['block-table-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-table-title-text': {
		id: 'block-table-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-table-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Core-Table',
		},
	},

	'block-table-content': {
		id: 'block-table-content',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'row-reverse',
						gap: '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'flex-wrap': 'wrap',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-table-wrapper',
		childNodeIDs: ['block-table-content-text', 'block-table-content-node'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-table-content-text': {
		id: 'block-table-content-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'A table element for organizing data in rows and columns. Supports headers, footers, body sections, and custom cell styling. Perfect for displaying data sets, comparisons, pricing tables, feature matrices, and any tabular information.',
		},
	},

	'block-table-content-node': {
		id: 'block-table-content-node',
		styles: {
			default: {
				default: {
					default: {
						'min-width': '45%',
						width: '100%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0px 2px 8px rgb(0, 0, 0, 0.1)',
						display: 'table',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '1rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'font-size': '9px',
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'table',
		attributes: {},
		parentID: 'block-table-content',
		childNodeIDs: ['block-table-head', 'block-table-body'],
		definitionKey: 'core-table',
		data: {},
	},

	'block-table-head': {
		id: 'block-table-head',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'thead',
		attributes: {},
		parentID: 'block-table-content-node',
		childNodeIDs: ['block-table-head-row'],
		definitionKey: 'core-table-head',
		data: {},
	},

	'block-table-head-row': {
		id: 'block-table-head-row',
		styles: {
			default: {
				default: {
					default: {
						'background-color': 'rgb(249, 115, 22)',
						color: 'rgb(255, 255, 255)',
						'border-bottom-width': '2px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(249, 115, 22)',
					},
				},
			},
		},
		elementKey: 'tr',
		attributes: {},
		parentID: 'block-table-head',
		childNodeIDs: ['block-table-head-cell-1', 'block-table-head-cell-2', 'block-table-head-cell-3'],
		definitionKey: 'core-table-row',
		data: {},
	},

	'block-table-head-cell-1': {
		id: 'block-table-head-cell-1',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						'text-align': 'left',
						'font-weight': '600',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(249, 115, 22)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.3rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'th',
		attributes: {},
		parentID: 'block-table-head-row',
		childNodeIDs: ['block-table-head-cell-1-text'],
		definitionKey: 'core-table-header-cell',
		data: {},
	},

	'block-table-head-cell-2': {
		id: 'block-table-head-cell-2',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						'text-align': 'left',
						'font-weight': '600',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(249, 115, 22)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.3rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'th',
		attributes: {},
		parentID: 'block-table-head-row',
		childNodeIDs: ['block-table-head-cell-2-text'],
		definitionKey: 'core-table-header-cell',
		data: {},
	},

	'block-table-head-cell-3': {
		id: 'block-table-head-cell-3',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						'text-align': 'left',
						'font-weight': '600',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.3rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'th',
		attributes: {},
		parentID: 'block-table-head-row',
		childNodeIDs: ['block-table-head-cell-3-text'],
		definitionKey: 'core-table-header-cell',
		data: {},
	},

	'block-table-body': {
		id: 'block-table-body',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'tbody',
		attributes: {},
		parentID: 'block-table-content-node',
		childNodeIDs: ['block-table-body-row-1'],
		definitionKey: 'core-table-body',
		data: {},
	},

	'block-table-body-row-1': {
		id: 'block-table-body-row-1',
		styles: {
			default: {
				default: {
					default: {
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
					},
				},
			},
		},
		elementKey: 'tr',
		attributes: {},
		parentID: 'block-table-body',
		childNodeIDs: ['block-table-body-cell-1-1', 'block-table-body-cell-1-2', 'block-table-body-cell-1-3'],
		definitionKey: 'core-table-row',
		data: {},
	},

	'block-table-body-cell-1-1': {
		id: 'block-table-body-cell-1-1',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						'font-weight': '500',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.3rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'td',
		attributes: {},
		parentID: 'block-table-body-row-1',
		childNodeIDs: ['block-table-body-cell-1-1-text'],
		definitionKey: 'core-table-cell',
		data: {},
	},

	'block-table-body-cell-1-2': {
		id: 'block-table-body-cell-1-2',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.3rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'td',
		attributes: {},
		parentID: 'block-table-body-row-1',
		childNodeIDs: ['block-table-body-cell-1-2-text'],
		definitionKey: 'core-table-cell',
		data: {},
	},

	'block-table-body-cell-1-3': {
		id: 'block-table-body-cell-1-3',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '0.75rem',
						'padding-right': '1rem',
						'padding-bottom': '0.75rem',
						'padding-left': '1rem',
						color: 'rgb(34, 197, 94)',
						'font-weight': '600',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'padding-top': '0.5rem',
						'padding-right': '0.3rem',
						'padding-bottom': '0.3rem',
						'padding-left': '0.3rem',
					},
				},
			},
		},
		elementKey: 'td',
		attributes: {},
		parentID: 'block-table-body-row-1',
		childNodeIDs: ['block-table-body-cell-1-3-text'],
		definitionKey: 'core-table-cell',
		data: {},
	},

	// Table cell text children
	'block-table-head-cell-1-text': {
		id: 'block-table-head-cell-1-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-head-cell-1',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Feature',
		},
	},

	'block-table-head-cell-2-text': {
		id: 'block-table-head-cell-2-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-head-cell-2',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Benefit',
		},
	},

	'block-table-head-cell-3-text': {
		id: 'block-table-head-cell-3-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-head-cell-3',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Status',
		},
	},

	'block-table-body-cell-1-1-text': {
		id: 'block-table-body-cell-1-1-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-body-cell-1-1',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Responsive',
		},
	},

	'block-table-body-cell-1-2-text': {
		id: 'block-table-body-cell-1-2-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-body-cell-1-2',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Adapts to any screen size',
		},
	},

	'block-table-body-cell-1-3-text': {
		id: 'block-table-body-cell-1-3-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-table-body-cell-1-3',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Active',
		},
	},

	// Block Image Section
	'block-image-container': {
		id: 'block-image-container',
		styles: {
			default: {
				default: {
					default: {
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(236, 72, 153)',

						'padding-left': '1.5rem',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-image-wrapper'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-image-wrapper': {
		id: 'block-image-wrapper',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-image-container',
		childNodeIDs: ['block-image-title', 'block-image-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-image-title': {
		id: 'block-image-title',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',

						color: 'rgb(236, 72, 153)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-image-wrapper',
		childNodeIDs: ['block-image-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-image-title-text': {
		id: 'block-image-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-image-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Core-Image',
		},
	},

	'block-image-content': {
		id: 'block-image-content',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'row',
						gap: '1.5rem',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'flex-wrap': 'wrap',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-image-wrapper',
		childNodeIDs: ['block-image-content-text', 'block-image-content-node'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-image-content-text': {
		id: 'block-image-content-text',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-image-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'An image element for displaying visual content. Supports responsive sizing, alt text, and various image formats. Perfect for photos, icons, illustrations, diagrams, and any visual media that enhances your content.',
		},
	},

	'block-image-content-node': {
		id: 'block-image-content-node',
		styles: {
			default: {
				default: {
					default: {
						'min-width': '45%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0px 2px 8px rgb(0, 0, 0, 0.1)',
						display: 'flex',
						'flex-direction': 'column',
						gap: '1rem',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '1rem',
						'max-height': '150px',
						'object-fit': 'cover',
					},
				},
			},

			'mobile-default': {
				default: {
					default: {
						'max-width': '100%',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%23ec4899" width="300" height="200"/><circle cx="150" cy="100" r="50" fill="%23fbbf24"/></svg>',
			alt: 'Image Example 1',
		},
		parentID: 'block-image-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},
};
