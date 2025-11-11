import type { StyleOptionDefinition } from '@/src/page/core/block/style/types';

/** Props for number style value editor components. */
export type NumberValueProps = {
	/** Current numeric value as string */
	value: string;
	/** Available number options */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
	/** Whether to force integer values only */
	forceInteger?: boolean;
};
