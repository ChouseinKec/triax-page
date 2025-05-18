# Style Render Hooks

A collection of React hooks for rendering style-related UI components consistently.

## `useStyleRender()`

The main hook that provides all rendering utilities.  
**Returns:**  
An object containing all render functions below.

### `renderFlexView()`

Renders a preview of flexbox container with current flex styles.

### `renderGridView()`

Renders a preview of grid container with current grid styles.

### `renderLengthInput(style)`

Renders a length input with unit selector.  
**Parameters:**  

- `style`: The CSS property to control (e.g. 'width', 'height')

### `renderInputGroup(style, separator)`

Renders dynamic inputs for multi-value properties like padding/margin.  
**Parameters:**  

- `style`: The CSS property  
- `separator`: Character to split values (e.g. space for '10px 20px')

### `renderNumberInput(style)`

Renders a basic number input for style properties.

### `renderDropdownSelect(style)`

Renders a dropdown select for style properties.

### `renderColorSelect(style)`

Renders a color picker input.

### `renderRadioSelect(style)`

Renders radio button options for style properties.

### `renderPositionSelect(onChangeSide, onChangeCorner, areCornersVisible)`

Renders a visual position selector.  
**Parameters:**  

- `onChangeSide`: Callback for side selection  
- `onChangeCorner`: Callback for corner selection  
- `areCornersVisible`: Toggle corner visibility

# Style State Hook

Core hook for managing style properties with validation and multi-value support.

## `useStyleState()`

The main hook that provides style management utilities.  
**Returns:**  
An object containing all style management functions below.

### `getSingleStyle(property)`

Gets a single style property value.  
**Parameters:**  

- `property`: The style property to get (STYLES_CONSTANTS_KEY)  
**Returns:**  
The current property value or empty string if not found

### `setSingleStyle(property, value)`

Sets a single style property value.  
**Parameters:**  

- `property`: The style property to set (STYLES_CONSTANTS_KEY)  
- `value`: The value to set for the property  
**Validation:**  
- Checks property validity  
- Validates value format  

### `getMultiStyle(property, separator)`

Gets a multi-value style property split into array.  
**Parameters:**  

- `property`: The style property to get (STYLES_CONSTANTS_KEY)  
- `separator`: Character used to split values (e.g. space for padding)  
**Returns:**  
Array of split values or empty array on error  

### `setMultiStyle(property, value, index, separator)`

Updates specific parts of a multi-value style property.  
**Parameters:**  

- `property`: The style property to update  
- `value`: The new value part  
- `index`: The index of the value part to update  
- `separator`: Character used in the multi-value string  
**Features:**  
- Handles value deletion when empty  
- Validates multi-value format  
- Preserves existing values  
