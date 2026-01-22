import type { AttributeDefinition } from '@/core/block/attribute/definition/types';

export const SCHEMA_DEFINITIONS: AttributeDefinition[] = [
	{
		key: 'itemref',
		syntax: { type: 'string' },
		description: 'References other elements for microdata.',
		category: 'schema',
	},
	{
		key: 'itemtype',
		syntax: { type: 'string' },
		description: 'Specifies the type of item for microdata.',
		category: 'schema',
	},
	{
		key: 'itemscope',
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
	{
		key: 'itemid',
		syntax: { type: 'string' },
		description: 'Unique identifier for microdata item.',
		category: 'schema',
	},
	{
		key: 'itemprop',
		syntax: { type: 'string' },
		description: 'Property name for microdata.',
		category: 'schema',
	},
];
