# utilities/style/option.ts

## Overview
Helpers for generating option data for value editors, including functions, dimensions, keywords, numbers, integers, colors, links, and for building slot-based options tables.

## Main Functions

### createFunctionOption (Internal)
Creates a FunctionOptionData object for a given function token.

- **Parameters:**
  - `token: string` — The function token string (e.g., 'calc(<length>|<percentage>)').
- **Returns:** `FunctionOptionData | undefined` — The created function option or undefined if invalid.
- **Example:**
  - `createFunctionOption('calc(<length>|<percentage>)') → { name: 'calc()', value: 'calc(0px)', syntax: '<length>|<percentage>', category: 'function', type: 'function' }`

---

### createDimensionOptions (Internal)
Creates an array of DimensionOptionData objects for a given dimension token.

- **Parameters:**
  - `token: string` — The dimension token string (e.g., '<length [0,100]>').
- **Returns:** `DimensionOptionData[] | undefined` — An array of dimension options or undefined if invalid.
- **Example:**
  - `createDimensionOptions('<length [0,100]>') → [{ name: 'px', value: '0px', type: 'length', min: 0, max: 100 }, ...]`

---

### createKeywordOption (Internal)
Creates a keyword option for a given token and property name.

- **Parameters:**
  - `token: string` — The keyword token string (e.g., 'auto').
  - `propertyName: string` — The name of the CSS property being edited (for keyword options).
- **Returns:** `KeywordOptionData | undefined` — The created keyword option or undefined if empty.
- **Example:**
  - `createKeywordOption('auto') → { name: 'auto', value: 'auto', category: 'keyword', icon: <Icon />, type: 'keyword' }`

---

### createNumberOption (Internal)
Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').

- **Parameters:**
  - `token: string` — The number token string (e.g., '<number [0,25]>').
- **Returns:** `OtherOptionData | undefined` — The created number option or undefined if invalid.
- **Example:**
  - `createNumberOption('<number [0,25]>') → { name: 'number', value: '0', min: 0, max: 25, category: 'other', type: 'number' }`

---

### createIntegerOption (Internal)
Creates an IntegerOptionData object for a given integer token (e.g., '<integer [0,100]>').

- **Parameters:**
  - `token: string` — The integer token string (e.g., '<integer [0,100]>').
- **Returns:** `OtherOptionData | undefined` — The created integer option or undefined if invalid.
- **Example:**
  - `createIntegerOption('<integer [0,100]>') → { name: 'integer', value: '0', min: 0, max: 100, category: 'other', type: 'integer' }`

---

### createColorOption (Internal)
Creates a color option for a given token (e.g., 'color').

- **Parameters:**
  - `token: string` — The color token string (e.g., 'color').
- **Returns:** `OtherOptionData | undefined` — The created color option or undefined if empty.
- **Example:**
  - `createColorOption('color') → { name: 'color', value: '#000000', category: 'other', type: 'color' }`

---

### createLinkOption (Internal)
Creates a link option for a given token (e.g., 'link').

- **Parameters:**
  - `token: string` — The link token string (e.g., 'link').
- **Returns:** `OtherOptionData | undefined` — The created link option or undefined if empty.
- **Example:**
  - `createLinkOption('link') → { name: 'link', value: 'https://example.com', category: 'other', type: 'link' }`

---

### createOption
Creates an InputOptionData object (or array) for a given token, using the correct factory based on type.

- **Parameters:**
  - `token: string` — The token string (e.g., 'auto', '<number>', '<length>', 'fit-content(...)').
  - `propertyName: string` — The name of the CSS property being edited (for keyword options).
- **Returns:** `InputOptionData | InputOptionData[] | undefined`

---

### isSlotOptionValid (Internal)
Checks if a token is a valid option for a given slot, given the current values and all valid variations.

- **Parameters:**
  - `token: string` — The candidate token for the slot (e.g., 'auto', '<number>').
  - `slotIndex: number` — The index of the slot being checked.
  - `validValueSet: string[]` — Set of all valid value strings (normalized).
  - `currentTokens: string[]` — The current value tokens for all slots (canonicalized).
  - `propertyName: string` — The name of the CSS property being edited.
- **Returns:** `boolean` — True if the token is valid for this slot in the current context.
- **Example:**
  - `isSlotOptionValid('auto', 0, validValueSet, ['auto', '10px']) → true`

---

### createOptionsTable
Builds a 2D options table for slot-based value editors. Each slot (column) contains only the valid options for the current context.

- **Parameters:**
  - `syntaxNormalized: string[]` — All valid variations, normalized and joined as strings.
  - `syntaxSet: Set<string>[]` — Array of arrays, each containing all possible tokens for that slot.
  - `values: string[]` — The current value tokens for all slots (user input, not yet canonicalized).
  - `propertyName: string` — The name of the CSS property being edited (for keyword options).
- **Returns:** `InputOptionData[][]` — 2D array of InputOptionData for each slot.
