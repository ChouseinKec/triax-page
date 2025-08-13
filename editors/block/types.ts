export interface BlockEditorProps {}

export interface BlockActionProps {
	/** Unique identifier for the action */
	id: string;

	/** Icon for the action */
	icon: React.ReactNode;

	/** Title for the action */
	title: string;

	/** Function to execute when the action is triggered */
	onClick: () => void;
}
