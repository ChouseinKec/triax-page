# CSS Cascade Utilities

## Overview
Helpers for resolving CSS property values with cascade logic, supporting device, orientation, and pseudo-state fallbacks.

## Main Functions

### getStyleWithFallback
Gets a style property value with CSS cascade fallback logic.

- **Parameters:**
  - `styles: BlockStyleData` — The block's complete style data.
  - `property: StylePropertyKeys` — The style property to lookup.
  - `device: DeviceName` — Current device context.
  - `orientation: OrientationName` — Current orientation context.
  - `pseudo: PseudoName` — Current pseudo context.
  - `defaultDevice?: DeviceName` — Default device fallback (default: 'all').
  - `defaultOrientation?: OrientationName` — Default orientation fallback (default: 'all').
  - `defaultPseudo?: PseudoName` — Default pseudo fallback (default: 'all').
- **Returns:** `string` — The resolved value or empty string if not found.
- **Example:**
  - `getStyleWithFallback(styles, 'color', 'desktop', 'portrait', 'hover')`

---

### getAllStylesWithFallback
Gets all properties with their resolved values for the current context. Useful for rendering context-specific styles.

- **Parameters:**
  - `styles: BlockStyleData` — The block's complete style data.
  - `device: DeviceName` — Current device context.
  - `orientation: OrientationName` — Current orientation context.
  - `pseudo: PseudoName` — Current pseudo context.
  - `defaultDevice?: DeviceName` — Default device fallback (default: 'all').
  - `defaultOrientation?: OrientationName` — Default orientation fallback (default: 'all').
  - `defaultPseudo?: PseudoName` — Default pseudo fallback (default: 'all').
- **Returns:** `Record<string, string>` — Object of resolved property values.
- **Example:**
  - `getAllStylesWithFallback(styles, 'desktop', 'portrait',