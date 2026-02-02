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
						overflow: 'auto',
						'background-color': '#ffffff',
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
		data: {},
	},

	// body container
	body: {
		id: 'body',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						height: 'auto',
						'background-color': '#ffffff',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						'justify-content': 'flex-start',
						'padding-top': '40px',
						'padding-right': '24px',
						'padding-bottom': '40px',
						'padding-left': '24px',
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'background-color': '#f0f9ff',
						'padding-top': '20px',
						'padding-right': '16px',
						'padding-bottom': '20px',
						'padding-left': '16px',
					},
				},
			},
			tablet: {
				default: {
					default: {
						'background-color': '#fef3c7',
						'padding-top': '30px',
						'padding-right': '20px',
						'padding-bottom': '30px',
						'padding-left': '20px',
					},
				},
			},
		},
		elementKey: 'body',
		attributes: {},
		parentID: 'html',
		childNodeIDs: ['hero', 'features-grid', 'timeline'],
		definitionKey: 'core-container',
		data: {},
	},

	// Hero section
	hero: {
		id: 'hero',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						'max-width': '1000px',
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '0px',
						'margin-left': '0px',
						'padding-top': '80px',
						'padding-right': '60px',
						'padding-bottom': '80px',
						'padding-left': '60px',
						'background-color': '#ffffff',
						'border-radius': '20px',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						color: '#111827',
						position: 'relative',
					},
					hover: {
						'box-shadow': '0 16px 64px rgba(0,0,0,0.15), 0px 4px 16px rgba(0,0,0,0.1)',
						transform: 'translateY(-2px)',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'max-width': '100%',
						'padding-top': '40px',
						'padding-right': '20px',
						'padding-bottom': '40px',
						'padding-left': '20px',
						'border-radius': '12px',
						'background-color': '#e0f2fe',
					},
				},
			},
			tablet: {
				default: {
					default: {
						'max-width': '90%',
						'padding-top': '60px',
						'padding-right': '40px',
						'padding-bottom': '60px',
						'padding-left': '40px',
						'border-radius': '16px',
						'background-color': '#fef3c7',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['hero-title', 'hero-desc'],
		definitionKey: 'core-container',
		data: {},
	},
	'hero-title': {
		id: 'hero-title',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '3.5rem',
						'font-weight': '800',
						'margin-bottom': '20px',
						'text-align': 'center',
						'letter-spacing': '-0.02em',
						'line-height': '1.1',
						color: '#111827',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'font-size': '2.5rem',
						'margin-bottom': '16px',
					},
				},
			},
			tablet: {
				default: {
					default: {
						'font-size': '3rem',
						'margin-bottom': '18px',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Design websites visually',
		},
		parentID: 'hero',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'hero-desc': {
		id: 'hero-desc',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1.375rem',
						'margin-bottom': '0px',
						'text-align': 'center',
						color: '#6b7280',
						'line-height': '1.6',
						'max-width': '800px',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Create responsive, professional websites with a visual page builder. Drag, drop, and customize blocks to build exactly what you need.',
		},
		parentID: 'hero',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},

	// Features section
	'features-grid': {
		id: 'features-grid',
		styles: {
			default: {
				default: {
					default: {
						display: 'grid',
						'grid-template-columns': 'repeat(auto-fit, minmax(150px, 1fr))',
						gap: '40px',
						width: '100%',
						'max-width': '1000px',
						'padding-top': '20px',
						'padding-bottom': '20px',
						'margin-top': '20px',
						'margin-bottom': '20px',
					},
				},
			},
			mobile: {
				default: {
					default: {
						'grid-template-columns': '1fr',
						gap: '20px',
						'padding-top': '10px',
						'padding-bottom': '10px',
						'margin-top': '10px',
						'margin-bottom': '10px',
					},
				},
			},
			tablet: {
				default: {
					default: {
						'grid-template-columns': 'repeat(2, 1fr)',
						gap: '30px',
						'padding-top': '15px',
						'padding-bottom': '15px',
						'margin-top': '15px',
						'margin-bottom': '15px',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
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
						'text-align': 'center',
						padding: '20px',
						background: '#ffffff',
						'border-radius': '12px',
						'backdrop-filter': 'blur(10px)',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
					},
					hover: {
						'box-shadow': '0px 12px 48px rgba(0,0,0,0.18), 0px 4px 16px rgba(0,0,0,0.12)',
						transform: 'translateY(-4px)',
						'background-color': '#f8fafc',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'features-grid',
		childNodeIDs: ['feature-1-label'],
		definitionKey: 'core-container',
		data: {},
	},
	'feature-1-label': {
		id: 'feature-1-label',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Visual drag-and-drop interface',
		},
		parentID: 'feature-1',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'feature-2': {
		id: 'feature-2',
		styles: {
			default: {
				default: {
					default: {
						'text-align': 'center',
						padding: '20px',
						background: '#ffffff',
						'border-radius': '12px',
						'backdrop-filter': 'blur(10px)',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
					},
					hover: {
						'box-shadow': '0px 12px 48px rgba(0,0,0,0.18), 0px 4px 16px rgba(0,0,0,0.12)',
						transform: 'translateY(-4px)',
						'background-color': '#f8fafc',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'features-grid',
		childNodeIDs: ['feature-2-label'],
		definitionKey: 'core-container',
		data: {},
	},
	'feature-2-label': {
		id: 'feature-2-label',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Responsive design across devices',
		},
		parentID: 'feature-2',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'feature-3': {
		id: 'feature-3',
		styles: {
			default: {
				default: {
					default: {
						'text-align': 'center',
						padding: '20px',
						background: '#ffffff',
						'border-radius': '12px',
						'backdrop-filter': 'blur(10px)',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
					},
					hover: {
						'box-shadow': '0px 12px 48px rgba(0,0,0,0.18), 0px 4px 16px rgba(0,0,0,0.12)',
						transform: 'translateY(-4px)',
						'background-color': '#f8fafc',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'features-grid',
		childNodeIDs: ['feature-3-label'],
		definitionKey: 'core-container',
		data: {},
	},
	'feature-3-label': {
		id: 'feature-3-label',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Real-time style customization',
		},
		parentID: 'feature-3',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'feature-4': {
		id: 'feature-4',
		styles: {
			default: {
				default: {
					default: {
						'text-align': 'center',
						padding: '20px',
						background: '#ffffff',
						'border-radius': '12px',
						'backdrop-filter': 'blur(10px)',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
					},
					hover: {
						'box-shadow': '0px 12px 48px rgba(0,0,0,0.18), 0px 4px 16px rgba(0,0,0,0.12)',
						transform: 'translateY(-4px)',
						'background-color': '#f8fafc',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'features-grid',
		childNodeIDs: ['feature-4-label'],
		definitionKey: 'core-container',
		data: {},
	},
	'feature-4-label': {
		id: 'feature-4-label',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: 'Nested component architecture',
		},
		parentID: 'feature-4',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},

	// Timeline
	timeline: {
		id: 'timeline',
		styles: {
			default: {
				default: {
					default: {
						width: '100%',
						'max-width': '1000px',
						'margin-top': '0px',
						'margin-right': '0px',
						'margin-bottom': '40px',
						'margin-left': '0px',
						'padding-top': '60px',
						'padding-right': '40px',
						'padding-bottom': '60px',
						'padding-left': '40px',
						background: '#ffffff',
						'border-radius': '20px',
						'box-shadow': '0 12px 40px rgba(0,0,0,0.15)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						color: '#111827',
						'text-align': 'center',
					},
					hover: {
						'box-shadow': '0px 12px 48px rgba(0,0,0,0.18), 0px 4px 16px rgba(0,0,0,0.12)',
						transform: 'translateY(-4px)',
						'background-color': '#f8fafc',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'body',
		childNodeIDs: ['timeline-container'],
		definitionKey: 'core-container',
		data: {},
	},
	'timeline-title': {
		id: 'timeline-title',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '2.5rem',
						'font-weight': '800',
						'margin-bottom': '16px',
						'line-height': '1.2',
						color: '#111827',
						'letter-spacing': '-0.02em',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {
			text: 'Updates',
		},
		parentID: 'timeline',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
		data: {},
	},
	'timeline-container': {
		id: 'timeline-container',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'flex-start',
						position: 'relative',
						width: '100%',
						'max-width': '800px',
						margin: '0 auto',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'timeline',
		childNodeIDs: ['timeline-item-1', 'timeline-item-2', 'timeline-item-3'],
		definitionKey: 'core-container',
		data: {},
	},

	'timeline-item-1': {
		id: 'timeline-item-1',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '40px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'timeline-container',
		childNodeIDs: ['timeline-content-1'],
		definitionKey: 'core-container',
		data: {},
	},

	'timeline-content-1': {
		id: 'timeline-content-1',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: '[Block Hierarchy] Added keyboard navigation for block selection using arrow keys.',
		},
		parentID: 'timeline-item-1',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'timeline-item-2': {
		id: 'timeline-item-2',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '40px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'timeline-container',
		childNodeIDs: ['timeline-content-2'],
		definitionKey: 'core-container',
		data: {},
	},

	'timeline-content-2': {
		id: 'timeline-content-2',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: '[Block Hierarchy] Added right-click context menu for copy, paste, duplicate, and delete block operations.',
		},
		parentID: 'timeline-item-2',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
	'timeline-item-3': {
		id: 'timeline-item-3',
		styles: {
			default: {
				default: {
					default: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '20px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		elementKey: 'div',
		attributes: {},
		parentID: 'timeline-container',
		childNodeIDs: ['timeline-content-3'],
		definitionKey: 'core-container',
		data: {},
	},

	'timeline-content-3': {
		id: 'timeline-content-3',
		styles: {
			default: {
				default: {
					default: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		elementKey: 'p',
		attributes: {},
		data: {
			text: '[Block Hierarchy] Added drag-and-drop functionality for block repositioning.',
		},
		parentID: 'timeline-item-3',
		childNodeIDs: [],
		definitionKey: 'core-markdown',
	},
};
