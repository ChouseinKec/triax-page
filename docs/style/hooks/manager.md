# Style Manager Hook

The `hooks/style/manager.ts` file provides the main React hook for managing CSS styles in the block editor. It centralizes logic for getting, setting, copying, pasting, and resetting style properties, with full support for responsive devices, orientations, and pseudo-states.

## What is manager.ts?

- `manager.ts` exports the `useStyleManager` hook, which returns an object with methods for all style-related operations.
- The hook integrates with the block and page stores, property definitions, and validation utilities to provide a robust, context-aware interface for style editing.

## What is it used for?

- **Style Access:**  
  Get and set style property values for the currently selected block, with full cascade and shorthand support.
- **Clipboard Actions:**  
  Copy and paste style values using the system clipboard.
- **Resetting:**  
  Reset a style property to its default (empty) value.
- **Validation:**  
  Ensures only valid properties and values are set, using project-wide validation utilities.

## Main Methods

### getStyle

Gets a style property value for the current block, device, orientation, and pseudo-state, with CSS-like cascade and shorthand support.

- **Parameters:**
  - `property: StylePropertyKeys` — The style property to get.
- **Returns:** `string` — The resolved value or empty string if not found.

---

### setStyle

Sets a style property value for the current block, device, orientation, and pseudo-state. Handles shorthands and validates property and value.

- **Parameters:**
  - `property: StylePropertyKeys` — The style property to set.
  - `value: string` — The value to set for the property.

---

### copyStyle

Copies a style property value to the clipboard.

- **Parameters:**
  - `property: StylePropertyKeys` — The style property to copy.

---

### pasteStyle

Pastes a style property value from the clipboard.

- **Parameters:**
  - `property: StylePropertyKeys` — The style property to paste into.

---

### resetStyle

Resets a style property value to an empty string for the current context.

- **Parameters:**
  - `property: StylePropertyKeys` — The style property to reset.

---

## Example Usage

```tsx
import { useStyleManager } from "@/hooks/style/manager";

const {
  getStyle,
  setStyle,
  copyStyle,
  pasteStyle,
  resetStyle,
} = useStyleManager();

// Get the current value for 'padding-top'
const paddingTop = getStyle('padding-top');

// Set a new value for 'background-color'
setStyle('background-color', '#ff0000');

// Copy and paste a style property
copyStyle('font-size');
pasteStyle('font-size');

// Reset a property
resetStyle('margin-bottom');
```

---

## Notes

- The hook is fully context-aware: all operations use the current device, orientation, and pseudo-state from the page store.
- Shorthand properties (like `margin` or `padding`) are expanded to all their longhand equivalents.
- All property and value changes are validated before being applied.
- Clipboard operations use the browser's Clipboard API and may require user permissions.