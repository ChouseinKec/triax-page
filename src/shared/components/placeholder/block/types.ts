import type { ReactNode, ComponentType } from 'react';

export interface PlaceholderProps {
	/** The main message to display */
	message: string;

	/** Optional description text */
	description?: string;

	/** Optional array of action buttons */
	actions?: Array<{
		label: string;
		onClick: (e: React.MouseEvent) => void;
	}>;

	/** Optional icon to display */
	icon?: ReactNode;

	/** Optional custom component to render under description */
	component?: ComponentType<any>;

	/** Optional click handler for selecting the block */
	onSelect?: (e: React.MouseEvent) => void;

	/** Optional element to render as instead of div */
	as?: React.ElementType;
}
