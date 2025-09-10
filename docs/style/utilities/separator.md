# utilities/style/separator.ts

## Overview
Helpers for extracting separator characters (such as spaces, slashes, commas) from CSS value variation strings. Used for parsing and tokenizing value patterns in the style editor.

## Main Functions

### extractSeparators
Extracts separators between tokens for each variation in an array of CSS value variations.

- **Parameters:**
  - `variations: string[]` — An array of CSS value variations to extract separators from.
- **Returns:** `string[][]` — An array of arrays of separators for each variation.
- **Example:**
  - `extractSeparators(['a b / c', 'd e / f']) → [[' ', '/'], [' ', '/']]`

---

### extractStyleSeparator (Internal)
Extracts separators from a single variation string. Used internally by `extractSeparators`.

- **Parameters:**
  - `variation: string` — The variation string to extract separators from.
- **Returns:** `string[]` — An array of separators found in the string.
- **Example:**
  - `extractStyleSeparator('a b / c') → [' ', '/']`
