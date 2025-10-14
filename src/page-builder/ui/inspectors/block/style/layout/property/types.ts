import { CSSProperties } from 'react';

// Types
import type { StyleKey } from '@/src/page-builder/core/block/style/types';

/** Props for an individual style property component. */
export interface PropertyProps {
	/** Component function to render the property editor */
	component: () => React.ReactNode;
	/** Label for the property */
	label: string | null;
	/** Whether the property should be hidden */
	hidden?: boolean;
	/** Whether the property is disabled */
	disabled?: boolean;
	/** The CSS property key this property represents */
	property?: StyleKey;
	/** Custom styles for the property */
	styles?: CSSProperties;
}
