type Style = { [key: string]: string };

/**
 * Represents the props for a FlexView component.
 * Defines the style properties for a flexible container with custom styles.
 * 
 * @param {Style} styles - The styles object containing key-value pairs for CSS properties.
*/
interface FlexViewProps {
    styles: Style;
}

export type { FlexViewProps };
