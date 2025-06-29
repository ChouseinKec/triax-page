# utilities/style/value.ts

## Overview
Helpers for parsing, classifying, and tokenizing CSS values, including slotting and separator logic for the value editor.

## Main Functions

### isValueKeyword
Checks if a value is a CSS keyword.
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isValueFunction
Checks if a value is a CSS function.
- **Parameters:** `input: string`
- **Returns:** `boolean`

### getValueTokens
Converts a value string to an array of tokens.
- **Parameters:** `values: string[]`
- **Returns:** `string[]`

### fillTokenValues
Fills empty slots in a value array with the default value for the corresponding token using `getTokenValue`.
- **Parameters:**
  - `tokens: string[]` — Array of CSS tokens to use for fallback values.
  - `value: string[]` — The current value array with potential empty slots.
- **Returns:** `string[]` — New array with empty slots filled with the default value for each token.
