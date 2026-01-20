export interface Tool {
	key: string;
	icon: React.ReactNode;
	onClick: () => void;
	panelKey: string;
}
