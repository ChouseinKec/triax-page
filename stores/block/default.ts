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
		contentIDs: ['hero', 'features', 'footer'],
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
};
