type Style = { [key: string]: string };

/**
 * Represents the props for a DisplayView component.
 * Defines the style properties for a flexible container with custom styles.
 * 
 * @param {Style} styles - The styles object containing key-value pairs for CSS properties.
*/
interface DisplayViewProps {
    styles: Style;
}

export type { DisplayViewProps };
