# CSS Cascade Utilities

## Overview
Helpers for resolving CSS property values with cascade logic, supporting device, orientation, and pseudo-state fallbacks.

## Main Functions

### cascadeStyle
Gets a style property value with CSS cascade fallback logic.

- **Parameters:**
  - `styles: BlockStyleDefinition` — The block's complete style data.
  - `property: StyleKey` — The style property to lookup.
  - `device: DeviceName` — Current device context.
  - `orientation: OrientationName` — Current orientation context.
  - `pseudo: PseudoName` — Current pseudo context.
  - `defaultDevice?: DeviceName` — Default device fallback (default: 'all').
  - `defaultOrientation?: OrientationName` — Default orientation fallback (default: 'all').
  - `defaultPseudo?: PseudoName` — Default pseudo fallback (default: 'all').
- **Returns:** `string` — The resolved value or empty string if not found.
- **Example:**
  - `cascadeStyle(styles, 'color', 'desktop', 'portrait', 'hover')`

---

### cascadeCSSStyles
Gets all properties with their resolved values for the current context. Useful for rendering context-specific styles.

- **Parameters:**
  - `styles: BlockStyleDefinition` — The block's complete style data.
  - `device: DeviceName` — Current device context.
  - `orientation: OrientationName` — Current orientation context.
  - `pseudo: PseudoName` — Current pseudo context.
  - `defaultDevice?: DeviceName` — Default device fallback (default: 'all').
  - `defaultOrientation?: OrientationName` — Default orientation fallback (default: 'all').
  - `defaultPseudo?: PseudoName` — Default pseudo fallback (default: 'all').
- **Returns:** `Record<string, string>` — Object of resolved property values.
- **Example:**
  - `cascadeCSSStyles(styles, 'desktop', 'portrait',