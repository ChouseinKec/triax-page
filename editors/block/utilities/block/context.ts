import { BlockActionID, BlockActionIcon, BlockActionTitle, BlockActionClick } from '@/editors/block/types';

export function isBlockActionIDValid(actionID: unknown): actionID is BlockActionID {
	return !!actionID && typeof actionID === 'string' && actionID.trim().length > 0;
}

export function isBlockActionIconValid(icon: unknown): icon is BlockActionIcon {
	return icon != null && typeof icon === 'object';
}

export function isBlockActionTitleValid(title: unknown): title is BlockActionTitle {
	return typeof title === 'string' && title.trim().length > 0;
}

export function isBlockActionOnClickValid(onClick: unknown): onClick is BlockActionClick {
	return typeof onClick === 'function';
}

export default {
	validate: {
		id: isBlockActionIDValid,
		icon: isBlockActionIconValid,
		title: isBlockActionTitleValid,
		onClick: isBlockActionOnClickValid,
	},
} as const;
