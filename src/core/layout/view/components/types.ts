// Types
import type { ViewDefinition } from '@/core/layout/view/types';
import type { RefObject } from 'react';

export interface ViewEditorProps {}

export interface ViewProps {
	viewDefinition: ViewDefinition;
	actionContainerRef: RefObject<HTMLDivElement | null>;
}
