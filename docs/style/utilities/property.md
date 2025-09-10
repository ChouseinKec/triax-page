# CSS Property Utilities

## Overview
Helpers for validating and generating CSS property names, including support for compound property patterns.

## Main Functions

### isKeyValid
Checks if a given CSS property is valid according to the defined CSS properties.

- **Parameters:**
  - `property: StyleKeys` — The CSS property to validate.
- **Returns:** `boolean` — True if the property is valid, false otherwise.
- **Example:**
  - `isKeyValid('color') → true`
  - `isKeyValid('invalid-property') → false`

---

### generateKey
Generates a CSS property name based on the provided property, position, and optional suffix. Handles multiple CSS property naming patterns:

- property-position (e.g., `padding-top`, `margin-left`)
- property-position-suffix (e.g., `border-top-width`, `border-left-style`)
- property-suffix (e.g., `background-color`, `font-size`)
- property (e.g., `color`, `display`)

- **Parameters:**
  - `property: string` — The base CSS property (e.g., 'border', 'padding', 'background').
  - `position?: Side | Corner` — The position/side for the property (e.g., 'top', 'left', 'top-left').
  - `suffix?: string` — The suffix to append (e.g., 'width', 'style', 'color').
- **Returns:** `StyleKeys` — The generated CSS property name.
- **Example:**
  - `generateKey('padding', 'top') → 'padding-top'`
  - `generateKey('border', 'top', 'width') → 'border-top-width'`
  - `generateKey('background', undefined, 'color') → 'background-color'`
  - `generateKey('color') →