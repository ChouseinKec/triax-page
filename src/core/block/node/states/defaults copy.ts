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
						height: '100%',
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
						'padding-top': '0px',
						'padding-right': '24px',
						'padding-bottom': '40px',
						'padding-left': '24px',
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
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
		childNodeIDs: ['hero-section', 'layout-section', 'block-section'],
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
						'padding-top': '3rem',
						'padding-right': '2rem',
						'padding-bottom': '3rem',
						'padding-left': '2rem',
						'text-align': 'center',
						width: '100%',
						'max-width': '1200px',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'min-height': 'auto',
						'padding-top': '1rem',
						'padding-right': '1rem',
						'padding-bottom': '1rem',
						'padding-left': '1rem',
					},
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
						'max-width': '800px',
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
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
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
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
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
						'margin-top': '0px',
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
						'grid-template-columns': 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: '1.5rem',
						'margin-top': '2rem',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
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
		childNodeIDs: ['feature-1', 'feature-2', 'feature-3', 'feature-4'],
		definitionKey: 'core-container',
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
						'box-shadow': '0 2px 8px rgb(24, 117, 254, 0.2)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: '🏗️ Official HTML/CSS Compliance',
		},
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
						'box-shadow': '0 2px 8px rgb(34, 197, 94, 0.2)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: '🔌 Plugin-Friendly Architecture',
		},
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
						'box-shadow': '0 2px 8px rgb(234, 179, 8, 0.2)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: '📱 Multi-Device Editing',
		},
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
						'box-shadow': '0 2px 8px rgb(168, 85, 247, 0.2)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'hero-features',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: '🎨 Cascading Styles System',
		},
	},

	// Layout Domain Section
	'layout-section': {
		id: 'layout-section',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '4rem',
						'padding-right': '2rem',
						'padding-bottom': '4rem',
						'padding-left': '2rem',
						'max-width': '1200px',
						width: '100%',
						color: 'rgb(45, 55, 72)',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '12px',
						'border-top-right-radius': '12px',
						'border-bottom-right-radius': '12px',
						'border-bottom-left-radius': '12px',
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'box-shadow': '0 4px 12px rgb(0, 0, 0, 0.08)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '1px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(229, 231, 235)',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'padding-top': '2rem',
						'padding-right': '1rem',
						'padding-bottom': '2rem',
						'padding-left': '1rem',
					},
				},
			},
		},
		elementKey: 'section',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['layout-header', 'layout-page-details', 'layout-bench-details', 'layout-panels-details', 'layout-view-details'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-header': {
		id: 'layout-header',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '3rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '2rem',
						'padding-right': '2rem',
						'padding-bottom': '2rem',
						'padding-left': '2rem',
						'text-align': 'center',
						'background-image': 'linear-gradient(135deg, rgb(245, 208, 254) 0%, rgb(254, 243, 199) 100%)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
					},
				},
			},
		},
		elementKey: 'hgroup',
		attributes: {},
		parentID: 'layout-section',
		childNodeIDs: ['layout-title', 'layout-intro'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-title': {
		id: 'layout-title',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '2.5rem',
						'font-weight': 'bold',
						'margin-bottom': '1rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h2',
		attributes: {},
		parentID: 'layout-header',
		childNodeIDs: ['layout-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-title-text': {
		id: 'layout-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'layout-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Layout',
		},
	},

	'layout-intro': {
		id: 'layout-intro',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1.1rem',
						opacity: '0.9',
						'line-height': '1.8',
						'margin-bottom': '1rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(74, 85, 104)',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'layout-header',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Triax implements a hierarchical component architecture with four core layers: Page, Bench, Panels, and View. This layered approach provides clean separation of concerns, optimized rendering pipelines, and extensible APIs for custom integrations across different editing contexts.',
		},
	},

	'layout-page-details': {
		id: 'layout-page-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.5rem',
						'padding-right': '1.5rem',
						'padding-bottom': '1.5rem',
						'padding-left': '1.5rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(24, 117, 254)',
						'box-shadow': '0 2px 6px rgb(0, 0, 0, 0.05)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-section',
		childNodeIDs: ['layout-page-summary', 'layout-page-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-page-summary': {
		id: 'layout-page-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'layout-page-details',
		childNodeIDs: ['layout-page-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-page-content': {
		id: 'layout-page-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-page-details',
		childNodeIDs: ['layout-page-content-text', 'layout-page-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-page-summary-text': {
		id: 'layout-page-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'layout-page-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Page Editor',
		},
	},

	'layout-bench-details': {
		id: 'layout-bench-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.5rem',
						'padding-right': '1.5rem',
						'padding-bottom': '1.5rem',
						'padding-left': '1.5rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(34, 197, 94)',
						'box-shadow': '0 2px 6px rgb(0, 0, 0, 0.05)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-section',
		childNodeIDs: ['layout-bench-summary', 'layout-bench-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-bench-summary': {
		id: 'layout-bench-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(34, 197, 94)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'layout-bench-details',
		childNodeIDs: ['layout-bench-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-bench-content': {
		id: 'layout-bench-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-bench-details',
		childNodeIDs: ['layout-bench-content-text', 'layout-bench-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-bench-summary-text': {
		id: 'layout-bench-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'layout-bench-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Bench Editor',
		},
	},

	'layout-panels-details': {
		id: 'layout-panels-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.5rem',
						'padding-right': '1.5rem',
						'padding-bottom': '1.5rem',
						'padding-left': '1.5rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(234, 179, 8)',
						'box-shadow': '0 2px 6px rgb(0, 0, 0, 0.05)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-section',
		childNodeIDs: ['layout-panels-summary', 'layout-panels-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-panels-summary': {
		id: 'layout-panels-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(234, 179, 8)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'layout-panels-details',
		childNodeIDs: ['layout-panels-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-panels-content': {
		id: 'layout-panels-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-panels-details',
		childNodeIDs: ['layout-panels-content-text', 'layout-panels-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-panels-summary-text': {
		id: 'layout-panels-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'layout-panels-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Panels Editor',
		},
	},

	'layout-view-details': {
		id: 'layout-view-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.5rem',
						'padding-right': '1.5rem',
						'padding-bottom': '1.5rem',
						'padding-left': '1.5rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(168, 85, 247)',
						'box-shadow': '0 2px 6px rgb(0, 0, 0, 0.05)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-section',
		childNodeIDs: ['layout-view-summary', 'layout-view-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-view-summary': {
		id: 'layout-view-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.1rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(168, 85, 247)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'layout-view-details',
		childNodeIDs: ['layout-view-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'layout-view-content': {
		id: 'layout-view-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'layout-view-details',
		childNodeIDs: ['layout-view-content-text', 'layout-view-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'layout-view-summary-text': {
		id: 'layout-view-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'layout-view-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'View Editor',
		},
	},

	// Block Domain Section
	'block-section': {
		id: 'block-section',
		styles: {
			default: {
				default: {
					default: {
						'padding-top': '4rem',
						'padding-right': '2rem',
						'padding-bottom': '4rem',
						'padding-left': '2rem',
						'max-width': '1200px',
						width: '100%',
						'background-color': 'rgb(255, 255, 255)',
						'border-top-left-radius': '12px',
						'border-top-right-radius': '12px',
						'border-bottom-right-radius': '12px',
						'border-bottom-left-radius': '12px',
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'box-shadow': '0 4px 12px rgb(0, 0, 0, 0.08)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '1px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(229, 231, 235)',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'padding-top': '2rem',
						'padding-right': '1rem',
						'padding-bottom': '2rem',
						'padding-left': '1rem',
					},
				},
			},
		},
		elementKey: 'section',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['block-header', 'block-node-details', 'block-element-details', 'block-attribute-details', 'block-style-details'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-header': {
		id: 'block-header',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '3rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '2rem',
						'padding-right': '2rem',
						'padding-bottom': '2rem',
						'padding-left': '2rem',
						'text-align': 'center',
						'background-image': 'linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(220, 252, 231) 100%)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
					},
				},
			},
		},
		elementKey: 'hgroup',
		attributes: {},
		parentID: 'block-section',
		childNodeIDs: ['block-title', 'block-intro'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-title': {
		id: 'block-title',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '2.5rem',
						'font-weight': 'bold',
						'margin-bottom': '1rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h2',
		attributes: {},
		parentID: 'block-header',
		childNodeIDs: ['block-title-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-title-text': {
		id: 'block-title-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-title',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Block',
		},
	},

	'block-intro': {
		id: 'block-intro',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1.1rem',
						opacity: '0.9',
						'line-height': '1.8',
						'margin-bottom': '1rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(74, 85, 104)',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-header',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Triax implements a component-based architecture with four specialized block editors: Node, Element, Attribute, and Style. This hierarchical system provides granular control over block rendering, HTML structure validation, attribute management, and cascading style systems with plugin extensibility and official specification compliance.',
		},
	},

	'block-node-details': {
		id: 'block-node-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.75rem',
						'padding-right': '1.75rem',
						'padding-bottom': '1.75rem',
						'padding-left': '1.75rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.06)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-section',
		childNodeIDs: ['block-node-summary', 'block-node-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-node-summary': {
		id: 'block-node-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.15rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(24, 117, 254)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-node-details',
		childNodeIDs: ['block-node-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-node-summary-text': {
		id: 'block-node-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-node-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Node Editor',
		},
	},

	'block-node-content': {
		id: 'block-node-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-node-details',
		childNodeIDs: ['block-node-content-text', 'block-node-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-element-details': {
		id: 'block-element-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.75rem',
						'padding-right': '1.75rem',
						'padding-bottom': '1.75rem',
						'padding-left': '1.75rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.06)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(34, 197, 94)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-section',
		childNodeIDs: ['block-element-summary', 'block-element-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-element-summary': {
		id: 'block-element-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.15rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(34, 197, 94)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-element-details',
		childNodeIDs: ['block-element-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-element-summary-text': {
		id: 'block-element-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-element-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Element Editor',
		},
	},

	'block-element-content': {
		id: 'block-element-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-element-details',
		childNodeIDs: ['block-element-content-text', 'block-element-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-attribute-details': {
		id: 'block-attribute-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.75rem',
						'padding-right': '1.75rem',
						'padding-bottom': '1.75rem',
						'padding-left': '1.75rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.06)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(234, 179, 8)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-section',
		childNodeIDs: ['block-attribute-summary', 'block-attribute-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-attribute-summary': {
		id: 'block-attribute-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.15rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(234, 179, 8)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-attribute-details',
		childNodeIDs: ['block-attribute-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-attribute-summary-text': {
		id: 'block-attribute-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-attribute-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Attribute Editor',
		},
	},

	'block-attribute-content': {
		id: 'block-attribute-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-attribute-details',
		childNodeIDs: ['block-attribute-content-text', 'block-attribute-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-style-details': {
		id: 'block-style-details',
		styles: {
			default: {
				default: {
					default: {
						'margin-bottom': '2rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						'padding-top': '1.75rem',
						'padding-right': '1.75rem',
						'padding-bottom': '1.75rem',
						'padding-left': '1.75rem',
						'background-color': 'rgb(249, 250, 251)',
						'border-top-left-radius': '8px',
						'border-top-right-radius': '8px',
						'border-bottom-right-radius': '8px',
						'border-bottom-left-radius': '8px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.06)',
						'border-top-width': '1px',
						'border-top-style': 'solid',
						'border-top-color': 'rgb(229, 231, 235)',
						'border-right-width': '1px',
						'border-right-style': 'solid',
						'border-right-color': 'rgb(229, 231, 235)',
						'border-bottom-width': '1px',
						'border-bottom-style': 'solid',
						'border-bottom-color': 'rgb(229, 231, 235)',
						'border-left-width': '4px',
						'border-left-style': 'solid',
						'border-left-color': 'rgb(168, 85, 247)',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-section',
		childNodeIDs: ['block-style-summary', 'block-style-content'],
		definitionKey: 'core-container',
		data: {},
	},

	'block-style-summary': {
		id: 'block-style-summary',
		styles: {
			default: {
				default: {
					default: {
						'font-weight': 'bold',
						'font-size': '1.15rem',
						'margin-bottom': '0.75rem',
						'margin-top': '0px',
						'margin-left': '0px',
						'margin-right': '0px',
						color: 'rgb(168, 85, 247)',
					},
				},
			},
		},
		elementKey: 'h3',
		attributes: {},
		parentID: 'block-style-details',
		childNodeIDs: ['block-style-summary-text'],
		definitionKey: 'core-header',
		data: {},
	},

	'block-style-summary-text': {
		id: 'block-style-summary-text',
		styles: {
			default: {
				default: {
					default: {},
				},
			},
		},
		elementKey: 'span',
		attributes: {},
		parentID: 'block-style-summary',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'Style Editor',
		},
	},

	'block-style-content': {
		id: 'block-style-content',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						display: 'flex',
						'flex-direction': 'row',
						'flex-wrap': 'wrap',
						gap: '1.5rem',
						'align-items': 'center',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'block-style-details',
		childNodeIDs: ['block-style-content-text', 'block-style-content-image'],
		definitionKey: 'core-container',
		data: {},
	},

	// Text and Image children for layout and block content sections
	'layout-page-content-text': {
		id: 'layout-page-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'layout-page-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Page layer serves as the application root container, managing global state through centralized stores and coordinating document lifecycle events. It handles serialization/deserialization of project data, implements undo/redo stacks, and orchestrates the initialization sequence for child components. As the top-level orchestrator, it establishes the reactive data flow that powers the entire editing experience.',
		},
	},

	'layout-page-content-image': {
		id: 'layout-page-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EPage Editor%3C/text%3E%3C/svg%3E',
			alt: 'Page layer architecture',
		},
		parentID: 'layout-page-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'layout-bench-content-text': {
		id: 'layout-bench-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'layout-bench-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Bench layer implements workspace context management with environment switching capabilities. It maintains state for bench configurations (Main/Test modes), manages panel visibility through reactive bindings, and coordinates inter-component communication via event-driven architecture. This layer optimizes rendering performance by implementing lazy loading and conditional mounting strategies for heavy UI components.',
		},
	},

	'layout-bench-content-image': {
		id: 'layout-bench-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EBench Editor%3C/text%3E%3C/svg%3E',
			alt: 'Bench layer architecture',
		},
		parentID: 'layout-bench-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'layout-panels-content-text': {
		id: 'layout-panels-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'layout-panels-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Panels layer implements specialized UI components with domain-specific functionality. Hierarchy Panel provides tree-based navigation with virtual scrolling for large DOM structures. Inspector Panel offers property editing with real-time validation and type checking. Library Panel manages component registries with drag-and-drop APIs. Tabs Panel implements multi-document interfaces with session persistence. Each panel exposes context-aware APIs and implements optimized rendering strategies for complex data visualization.',
		},
	},

	'layout-panels-content-image': {
		id: 'layout-panels-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EPanels Editor%3C/text%3E%3C/svg%3E',
			alt: 'Panels layer architecture',
		},
		parentID: 'layout-panels-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'layout-view-content-text': {
		id: 'layout-view-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'layout-view-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The View layer implements the core rendering pipeline with multi-viewport support and responsive design tools. Block View provides device-specific rendering contexts with CSS media query simulation, orientation switching, and pseudo-state testing (:hover, :focus, :active). The layer optimizes performance through virtual DOM diffing, lazy image loading, and GPU-accelerated animations. It exposes APIs for custom view modes and integrates with build tools for hot module replacement during development.',
		},
	},

	'layout-view-content-image': {
		id: 'layout-view-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EView Editor%3C/text%3E%3C/svg%3E',
			alt: 'View layer architecture',
		},
		parentID: 'layout-view-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'block-node-content-text': {
		id: 'block-node-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-node-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Node editor handles block rendering and user actions within the page editor. It renders blocks with their styles in <style> tags and manages attributes. Each block supports actions like delete, add, and sort. Nodes can use single elements or element groups - for example, core-container supports [div, section, article], core-markdown supports [p, span, sub, sup], while core-table uses only [table].',
		},
	},

	'block-node-content-image': {
		id: 'block-node-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3ENode Editor%3C/text%3E%3C/svg%3E',
			alt: 'Node editor system',
		},
		parentID: 'block-node-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'block-element-content-text': {
		id: 'block-element-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-element-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Element editor manages the structure of each element based on official HTML documentation. It determines which elements can accept children, what child tags are allowed, and the required structure (e.g., details elements must have at least one summary). It also specifies which attributes each element accepts.',
		},
	},

	'block-element-content-image': {
		id: 'block-element-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EElement Editor%3C/text%3E%3C/svg%3E',
			alt: 'Element editor system',
		},
		parentID: 'block-element-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'block-attribute-content-text': {
		id: 'block-attribute-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-attribute-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Attribute editor manages each attribute with its key, syntax, description, and category. It provides methods for UI components to render only attributes valid for specific elements, such as those applicable to table or img elements.',
		},
	},

	'block-attribute-content-image': {
		id: 'block-attribute-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EAttribute Editor%3C/text%3E%3C/svg%3E',
			alt: 'Attribute editor system',
		},
		parentID: 'block-attribute-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},

	'block-style-content-text': {
		id: 'block-style-content-text',
		styles: {
			default: {
				default: {
					default: {
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'font-size': '1rem',
						'line-height': '1.8',
						color: 'rgb(74, 85, 104)',
						'flex-shrink': '1',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		parentID: 'block-style-content',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {
			text: 'The Style editor manages the style system and style definitions. It provides API methods for cascading styles based on device, orientation, hover, and other conditions. It uses parsing based on official CSS documentation, converting syntax to tokens to validate whether a given value is acceptable for a specific style key.',
		},
	},

	'block-style-content-image': {
		id: 'block-style-content-image',
		styles: {
			default: {
				default: {
					default: {
						width: '250px',
						height: '180px',
						'object-fit': 'cover',
						'border-top-left-radius': '6px',
						'border-top-right-radius': '6px',
						'border-bottom-right-radius': '6px',
						'border-bottom-left-radius': '6px',
						'box-shadow': '0 2px 8px rgb(0, 0, 0, 0.1)',
						'flex-shrink': '0',
					},
				},
			},
		},
		elementKey: 'img',
		attributes: {
			src: 'data:image/svg+xml,%3Csvg width="250" height="180" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3f4f6" width="250" height="180"/%3E%3Ctext x="50%25" y="50%25" font-family="Geist, Arial, sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="central"%3EStyle Editor%3C/text%3E%3C/svg%3E',
			alt: 'Style editor system',
		},
		parentID: 'block-style-content',
		childNodeIDs: [],
		definitionKey: 'core-image',
		data: {},
	},
};
