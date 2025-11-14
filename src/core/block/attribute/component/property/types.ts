import { CSSProperties } from 'react';

// Types
import type { AttributeKey } from '@/src/core/block/attribute/types';

/** Props for an individual attribute property component. */
export interface PropertyProps {
	/** Component function to render the property editor */
	component: () => React.ReactNode;
	/** Label for the property */
	label: string | null;
	/** Whether the property should be hidden */
	hidden?: boolean;
	/** Whether the property is disabled */
	disabled?: boolean;
	/** The HTML attribute key this property represents */
	property?: AttributeKey;
	/** Custom styles for the property */
	styles?: CSSProperties;
}
