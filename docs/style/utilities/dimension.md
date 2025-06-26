# utilities/style/dimension.ts

## Overview
Helpers for parsing, extracting, validating, and clamping CSS dimension values (e.g., `10px`, `2em`, `100%`).

## Main Functions

### extractNumber
Extracts the numeric part from a CSS dimension string.
- **Parameters:** `input: string`
- **Returns:** `string | undefined`

### extractUnit
Extracts the unit part from a CSS dimension string.
- **Parameters:** `input: string`
- **Returns:** `string | undefined`

### isValueDimension
Checks if a string is a valid CSS dimension (number + unit).
- **Parameters:** `input: string`
- **Returns:** `boolean`

### getDimensionType
Determines the CSS dimension group (e.g., 'length', 'percentage') for a given value.
- **Parameters:** `input: string`
- **Returns:** `CSSDimensionGroups | undefined`

### clampDimension
Clamps a CSS value to a maximum px value (default: 15px).
- **Parameters:** `value: string, maxPx?: number`
- **Returns:** `string | undefined`
