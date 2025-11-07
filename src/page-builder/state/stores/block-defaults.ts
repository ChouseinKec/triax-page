import type { BlockInstance, BlockID } from '@/src/page-builder/core/block/block/types';

export const DefaultBlocks: Record<BlockID, BlockInstance> = {
	// body container
	body: {
		id: 'body',
		styles: {
			all: {
				all: {
					all: {
						width: '100%',
						height: '100%',
						overflow: 'auto',
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
				all: {
					all: {
						'background-color': '#f0f9ff',
						'padding-top': '20px',
						'padding-right': '16px',
						'padding-bottom': '20px',
						'padding-left': '16px',
					},
				},
			},
			tablet: {
				all: {
					all: {
						'background-color': '#fef3c7',
						'padding-top': '30px',
						'padding-right': '20px',
						'padding-bottom': '30px',
						'padding-left': '20px',
					},
				},
			},
		},
		tag: 'body',
		attributes: {},
		parentID: 'root',
		contentIDs: ['hero', 'features-grid', 'timeline'],
		type: 'container',
	},

	// Hero section
	hero: {
		id: 'hero',
		styles: {
			all: {
				all: {
					all: {
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
				all: {
					all: {
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
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'body',
		contentIDs: ['hero-title', 'hero-desc'],
		type: 'container',
	},
	'hero-title': {
		id: 'hero-title',
		styles: {
			all: {
				all: {
					all: {
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
				all: {
					all: {
						'font-size': '2.5rem',
						'margin-bottom': '16px',
					},
				},
			},
			tablet: {
				all: {
					all: {
						'font-size': '3rem',
						'margin-bottom': '18px',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: 'Design websites visually',
		},
		parentID: 'hero',
		contentIDs: [],
		type: 'text',
	},
	'hero-desc': {
		id: 'hero-desc',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'p',
		attributes: {},
		content: {
			text: 'Create responsive, professional websites with a visual page builder. Drag, drop, and customize blocks to build exactly what you need.',
		},
		parentID: 'hero',
		contentIDs: [],
		type: 'text',
	},

	// Features section
	'features-grid': {
		id: 'features-grid',
		styles: {
			all: {
				all: {
					all: {
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
				all: {
					all: {
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
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'body',
		contentIDs: ['feature-1', 'feature-2', 'feature-3', 'feature-4'],
		type: 'container',
	},
	'feature-1': {
		id: 'feature-1',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'features-grid',
		contentIDs: ['feature-1-label'],
		type: 'container',
	},
	'feature-1-label': {
		id: 'feature-1-label',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: 'Visual drag-and-drop interface',
		},
		parentID: 'feature-1',
		contentIDs: [],
		type: 'text',
	},
	'feature-2': {
		id: 'feature-2',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'features-grid',
		contentIDs: ['feature-2-label'],
		type: 'container',
	},
	'feature-2-label': {
		id: 'feature-2-label',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: 'Responsive design across devices',
		},
		parentID: 'feature-2',
		contentIDs: [],
		type: 'text',
	},
	'feature-3': {
		id: 'feature-3',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'features-grid',
		contentIDs: ['feature-3-label'],
		type: 'container',
	},
	'feature-3-label': {
		id: 'feature-3-label',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: 'Real-time style customization',
		},
		parentID: 'feature-3',
		contentIDs: [],
		type: 'text',
	},
	'feature-4': {
		id: 'feature-4',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'features-grid',
		contentIDs: ['feature-4-label'],
		type: 'container',
	},
	'feature-4-label': {
		id: 'feature-4-label',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'font-weight': '500',
						'text-align': 'center',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: 'Nested component architecture',
		},
		parentID: 'feature-4',
		contentIDs: [],
		type: 'text',
	},

	// Timeline
	timeline: {
		id: 'timeline',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'body',
		contentIDs: ['timeline-container'],
		type: 'container',
	},
	'timeline-title': {
		id: 'timeline-title',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'p',
		attributes: {
			text: 'Updates',
		},
		parentID: 'timeline',
		contentIDs: [],
		type: 'text',
	},
	'timeline-container': {
		id: 'timeline-container',
		styles: {
			all: {
				all: {
					all: {
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
		tag: 'div',
		attributes: {},
		parentID: 'timeline',
		contentIDs: ['timeline-line', 'timeline-item-1', 'timeline-item-2', 'timeline-item-3'],
		type: 'container',
	},
	'timeline-line': {
		id: 'timeline-line',
		styles: {
			all: {
				all: {
					all: {
						position: 'absolute',
						left: '15px',
						top: '30px',
						bottom: '30px',
						width: '2px',
						'background-color': '#667eea',
						'z-index': '1',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-container',
		contentIDs: [],
		type: 'container',
	},
	'timeline-item-1': {
		id: 'timeline-item-1',
		styles: {
			all: {
				all: {
					all: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '40px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-container',
		contentIDs: ['timeline-dot-1', 'timeline-content-1'],
		type: 'container',
	},
	'timeline-dot-1': {
		id: 'timeline-dot-1',
		styles: {
			all: {
				all: {
					all: {
						position: 'absolute',
						left: '7px',
						top: '8px',
						width: '16px',
						height: '16px',
						'background-color': '#667eea',
						'border-radius': '50%',
						'border-width': '3px',
						'border-style': 'solid',
						'border-color': '#ffffff',
						'z-index': '2',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-item-1',
		contentIDs: [],
		type: 'container',
	},

	'timeline-content-1': {
		id: 'timeline-content-1',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: '[Block Hierarchy] Added keyboard navigation for block selection using arrow keys.',
		},
		parentID: 'timeline-item-1',
		contentIDs: [],
		type: 'text',
	},
	'timeline-item-2': {
		id: 'timeline-item-2',
		styles: {
			all: {
				all: {
					all: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '40px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-container',
		contentIDs: ['timeline-dot-2', 'timeline-content-2'],
		type: 'container',
	},
	'timeline-dot-2': {
		id: 'timeline-dot-2',
		styles: {
			all: {
				all: {
					all: {
						position: 'absolute',
						left: '7px',
						top: '8px',
						width: '16px',
						height: '16px',
						'background-color': '#667eea',
						'border-radius': '50%',
						'border-width': '3px',
						'border-style': 'solid',
						'border-color': '#ffffff',
						'z-index': '2',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-item-2',
		contentIDs: [],
		type: 'container',
	},

	'timeline-content-2': {
		id: 'timeline-content-2',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: '[Block Hierarchy] Added right-click context menu for copy, paste, duplicate, and delete block operations.',
		},
		parentID: 'timeline-item-2',
		contentIDs: [],
		type: 'text',
	},
	'timeline-item-3': {
		id: 'timeline-item-3',
		styles: {
			all: {
				all: {
					all: {
						display: 'flex',
						'align-items': 'flex-start',
						'margin-bottom': '20px',
						position: 'relative',
						'padding-left': '50px',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-container',
		contentIDs: ['timeline-dot-3', 'timeline-content-3'],
		type: 'container',
	},
	'timeline-dot-3': {
		id: 'timeline-dot-3',
		styles: {
			all: {
				all: {
					all: {
						position: 'absolute',
						left: '7px',
						top: '8px',
						width: '16px',
						height: '16px',
						'background-color': '#667eea',
						'border-radius': '50%',
						'border-width': '3px',
						'border-style': 'solid',
						'border-color': '#ffffff',
						'z-index': '2',
					},
				},
			},
		},
		tag: 'div',
		attributes: {},
		parentID: 'timeline-item-3',
		contentIDs: [],
		type: 'container',
	},

	'timeline-content-3': {
		id: 'timeline-content-3',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'line-height': '1.5',
						color: '#111827',
					},
				},
			},
		},
		tag: 'p',
		attributes: {},
		content: {
			text: '[Block Hierarchy] Added drag-and-drop functionality for block repositioning.',
		},
		parentID: 'timeline-item-3',
		contentIDs: [],
		type: 'text',
	},
};
