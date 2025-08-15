import type { BlockInstance } from '@/types/block/block';

export const DefaultBlocks: Record<string, BlockInstance> = {
	// Root container
	root: {
		id: 'root',
		styles: {
			all: {
				all: {
					all: {
						width: '100%',
						'min-height': '100vh',
						background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						'justify-content': 'flex-start',
						padding: '10px',
						margin: '0',
					},
				},
			},
		},
		attributes: {},
		parentID: null,
		contentIDs: ['hero', 'footer', 'features', 'timeline'],
		tag: 'div',
		tags: [],
		permittedContent: null,
		permittedParent: null,
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
						'max-width': '900px',
						margin: '40px 0 24px 0',
						padding: '32px 24px',
						background: 'linear-gradient(120deg, #6366f1 0%, #06b6d4 100%)',
						'border-radius': '18px',
						'box-shadow': '0 8px 32px rgba(0,0,0,0.08)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						color: '#fff',
					},
				},
			},
		},
		attributes: {},
		parentID: 'root',
		contentIDs: ['hero-title', 'hero-desc'],
		tag: 'div',
		tags: [],
		permittedContent: null,
		permittedParent: null,
		type: 'container',
	},
	'hero-title': {
		id: 'hero-title',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '2.5rem',
						'font-weight': 'bold',
						'margin-bottom': '12px',
						'text-align': 'center',
						'letter-spacing': '0.02em',
					},
				},
			},
		},
		attributes: {
			text: '👋 Welcome to Triax Page Builder!',
		},
		parentID: 'hero',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},
	'hero-desc': {
		id: 'hero-desc',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1.25rem',
						'margin-bottom': '0',
						'text-align': 'center',
						color: '#e0f2fe',
					},
				},
			},
		},
		attributes: {
			text: 'Start building visually. Nest, and style blocks. Select a block to see its settings. 🚀',
		},
		parentID: 'hero',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},

	// Features section
	features: {
		id: 'features',
		styles: {
			all: {
				all: {
					all: {
						width: '100%',
						'max-width': '900px',
						margin: '0 0 32px 0',
						padding: '24px',
						background: '#fff',
						'border-radius': '14px',
						'box-shadow': '0 4px 16px rgba(0,0,0,0.04)',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						color: '#334155',
					},
				},
			},
		},
		attributes: {},
		parentID: 'root',
		contentIDs: ['features-title', 'features-list'],
		tag: 'div',
		tags: [],
		permittedContent: null,
		permittedParent: null,
		type: 'container',
	},
	'features-title': {
		id: 'features-title',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1.5rem',
						'font-weight': 'bold',
						'margin-bottom': '10px',
						'text-align': 'center',
						color: '#0ea5e9',
					},
				},
			},
		},
		attributes: {
			text: '✨ Features',
		},
		parentID: 'features',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},
	'features-list': {
		id: 'features-list',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1.1rem',
						'line-height': '1.7',
						'text-align': 'center',
						color: '#334155',
					},
				},
			},
		},
		attributes: {
			text: '• Nest blocks\n• Change devices\n• Edit styles visually\n• Try selecting a block to see its settings!',
		},
		parentID: 'features',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},

	// Footer
	footer: {
		id: 'footer',
		styles: {
			all: {
				all: {
					all: {
						width: '100%',
						'max-width': '900px',
						margin: '0 0 24px 0',
						padding: '16px',
						background: '#f1f5f9',
						'border-radius': '10px',
						'text-align': 'center',
						color: '#64748b',
						'font-size': '1rem',
					},
				},
			},
		},
		attributes: {
			text: 'Made with ❤️ using Triax. Edit this page or add your own blocks!',
		},
		parentID: 'root',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
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
						'max-width': '900px',
						margin: '0 0 24px 0',
						padding: '18px',
						background: '#f3f6fd', // soft blue background
						'border-radius': '10px',
						'box-shadow': '0 2px 8px rgba(0,0,0,0.03)',
						'text-align': 'left',
						color: '#334155',
						'font-size': '1rem',
					},
				},
			},
		},
		attributes: {},
		parentID: 'root',
		contentIDs: ['timeline-title', 'timeline-date-2025-08-13'],
		tag: 'div',
		tags: [],
		permittedContent: null,
		permittedParent: null,
		type: 'container',
	},
	'timeline-title': {
		id: 'timeline-title',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1.5rem', // match Features title size
						'font-weight': 'bold',
						'margin-bottom': '10px',
						'text-align': 'center', // center like Features
						color: '#0ea5e9', // match Features accent color
					},
				},
			},
		},
		attributes: {
			text: '🕒 Timeline', // match Features icon and rename
		},
		parentID: 'timeline',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},
	'timeline-date-2025-08-13': {
		id: 'timeline-date-2025-08-13',
		styles: {
			all: {
				all: {
					all: {
						'margin-bottom': '8px',
						padding: '8px 0 0 0',
						'border-left-width': '3px',
						'border-left-style': 'solid',
						'border-left-color': '#2563eb', // blue accent
						background: '#f8fafc', // very light background
					},
				},
			},
		},
		attributes: {},
		parentID: 'timeline',
		contentIDs: ['timeline-date-2025-08-13-title', 'timeline-entry-1'],
		tag: 'div',
		tags: [],
		permittedContent: null,
		permittedParent: null,
		type: 'container',
	},
	'timeline-date-2025-08-13-title': {
		id: 'timeline-date-2025-08-13-title',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1.1rem',
						'font-weight': 'bold',
						color: '#2563eb', // blue accent
						'margin-bottom': '4px',
						'padding-left': '12px',
					},
				},
			},
		},
		attributes: {
			text: ' 2025-08-13',
		},
		parentID: 'timeline-date-2025-08-13',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},
	'timeline-entry-1': {
		id: 'timeline-entry-1',
		styles: {
			all: {
				all: {
					all: {
						'font-size': '1rem',
						'line-height': '1.7',
						color: '#334155',
						'margin-bottom': '4px',
						'padding-left': '12px',
					},
				},
			},
		},
		attributes: {
			text: '• Added ArrowUp/ArrowDown block selection in Block Hierarchy.',
		},
		parentID: 'timeline-date-2025-08-13',
		contentIDs: [],
		tag: 'p',
		tags: [],
		permittedContent: [],
		permittedParent: null,
		type: 'text',
	},
};
