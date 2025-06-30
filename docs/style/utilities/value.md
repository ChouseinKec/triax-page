# utilities/style/value.ts

## Overview
Helpers for parsing, classifying, and tokenizing CSS values, including slotting and separator logic for the value editor.

## Main Functions

### isValueKeyword (Internal)
Checks if a value is a CSS keyword (e.g., 'auto', 'none', 'inherit').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid keyword format, false otherwise.
- **Example:**
  - `isValueKeyword('auto') → true`
  - `isValueKeyword('10px') → false`
  - `isValueKeyword('10') → false`
  - `isValueKeyword('function(args)') → false`

---

### isValueFunction (Internal)
Checks if a value is a CSS function (e.g., functionName(args)).

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid function format, false otherwise.
- **Example:**
  - `isValueFunction('fit-content(10px)') → true`
  - `isValueFunction('10px') → false`
  - `isValueFunction('auto') → false`

---

### isValueNumber (Internal)
Checks if a value is a number (e.g., '10', '-5.5', '0.1').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid number format, false otherwise.
- **Example:**
  - `isValueNumber('10') → true`
  - `isValueNumber('abc') → false`

---

### isValueInteger (Internal)
Checks if a value is an integer (e.g., '10', '-5').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid integer format, false otherwise.
- **Example:**
  - `isValueInteger('10') → true`
  - `isValueInteger('10.5') → false`

---

### isValueColor (Internal)
Checks if a value is a CSS color (e.g., '#fff', 'rgba(255, 0, 0)', 'hsl(120, 100%, 50%)').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid color format, false otherwise.
- **Example:**
  - `isValueColor('#fff') → true`
  - `isValueColor('rgba(255, 0, 0)') → true`
  - `isValueColor('10px') → false`

---

### isValueLink (Internal)
Checks if a value is a link (e.g., 'https://example.com', '/path/to/resource').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid link format, false otherwise.
- **Example:**
  - `isValueLink('"https://example.com"') → true`
  - `isValueLink('"./path/to/resource"') → true`
  - `isValueLink('10px') → false`

---

### getValueType
Determines the type of a CSS value based on its format. Uses specific checks for dimension, keyword, function, number, color, and link.

- **Parameters:**
  - `input: string` — The CSS value string to classify.
- **Returns:** `CSSTokenGroups | undefined` — The detected value type or undefined if not recognized.
- **Example:**
  - `getValueType('10px') → 'dimension'`
  - `getValueType('auto') → 'keyword'`
  - `getValueType('fit-content(10px)') → 'function'`
  - `getValueType('10') → 'integer'`
  - `getValueType('10.5') → 'number'`
  - `getValueType('#fff') → 'color'`
  - `getValueType('"https://example.com"') → 'link'`

---

### getValueToken
Converts a CSS value string to its canonical token representation. Converts keywords to their canonical form, numbers to '<number>', and dimensions to '<dimensionType>'. If the value type is not recognized, returns undefined.

- **Parameters:**
  - `value: string` — The CSS value string to convert.
- **Returns:** `string | undefined` — The token representation of the value or undefined if not recognized.
- **Example:**
  - `getValueToken('10px') → '<length>'`
  - `getValueToken('auto') → 'auto'`
  - `getValueToken('fit-content(10px)') → 'fit-content()'`
  - `getValueToken('10') → '<number>'`

---

### getValueTokens
Converts an array of CSS value strings to an array of tokens. Uses getValueToken to convert each value to its token representation. Filters out any unrecognized values.

- **Parameters:**
  - `values: string[]` — An array of CSS value strings to convert.
- **Returns:** `string[]` — An array of value tokens corresponding to the input values.
- **Example:**
  - `getValueTokens(['10px', 'auto', 'fit-content(10px)', '10']) → ['<length>', 'auto', 'fit-content()', '<number>']`

