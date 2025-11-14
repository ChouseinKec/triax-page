export type StoreDefinition = {
	name: string;
	initFn: () => Promise<void> | void;
};
