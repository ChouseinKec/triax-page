import type { AttributeRecord } from '@/src/core/block/attribute/types';

export const SCHEMA_ATTRIBUTES: Partial<AttributeRecord> = {
	itemref: {
		name: 'itemref',
		syntax: { type: 'string' },
		description: 'References other elements for microdata.',
		category: 'schema',
	},
	itemtype: {
		name: 'itemtype',
		syntax: { type: 'string' },
		description: 'Specifies the type of item for microdata.',
		category: 'schema',
	},
	itemscope: {
		name: 'itemscope',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Defines the scope of microdata item.',
		category: 'schema',
	},
	itemid: {
		name: 'itemid',
		syntax: { type: 'string' },
		description: 'Unique identifier for microdata item.',
		category: 'schema',
	},
	itemprop: {
		name: 'itemprop',
		syntax: { type: 'string' },
		description: 'Property name for microdata.',
		category: 'schema',
	},
};
