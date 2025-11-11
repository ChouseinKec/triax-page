import {TabProps} from '@/src/shared/components/types/tab'

/** Represents a group of tab items to be rendered together. */
export type TabGroupProps = {
	/** List of tab items to display */
	items: TabProps[];
	/** Optional class name for custom styling */
	className?: string;
};
