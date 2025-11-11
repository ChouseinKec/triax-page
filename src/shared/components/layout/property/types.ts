import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface PropertyProps {
	label: string | null;
	name: string;
	description: string;

	hidden?: boolean;
	disabled?: boolean;
	styles?: CSSProperties;

	actions: () => ReactNode;
	content: () => ReactElement;
}
