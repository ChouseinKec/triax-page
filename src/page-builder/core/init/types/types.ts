export interface InitStep {
	name: string;
	init: () => Promise<void> | void;
	required?: boolean;
	description?: string;
}
