# utilities/style/token.ts

## Overview
Helpers for working with CSS tokens, including type checks, canonicalization, and conversion between tokens and values.

## Main Functions

### isTokenKeyword (Internal)
Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data keyword, false otherwise.
- **Example:**
  - `isTokenKeyword('auto') → true`
  - `isTokenKeyword('fit-content') → true`
  - `isTokenKeyword('10px') → false`

---

### isTokenDimension (Internal)
Checks if a value is a CSS dimension (e.g., <length>, <percentage>).

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid dimension format, false otherwise.
- **Example:**
  - `isTokenDimension('<length>') → true`
  - `isTokenDimension('<percentage>') → true`
  - `isTokenDimension('10px') → false`
  - `isTokenDimension('fit-content(10px)') → false`

---

### isTokenInteger (Internal)
Checks if the input string is a valid CSS data integer (e.g., '<integer>').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data integer, false otherwise.
- **Example:**
  - `isTokenInteger('<integer>') → true`
  - `isTokenInteger('<number>') → false`

---

### isTokenNumber (Internal)
Checks if the input string is a valid CSS data number (e.g., '<number>').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data number, false otherwise.
- **Example:**
  - `isTokenNumber('<number>') → true`
  - `isTokenNumber('<integer>') → false`

---

### isTokenFunction (Internal)
Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data function, false otherwise.
- **Example:**
  - `isTokenFunction('fit-content(10px)') → true`
  - `isTokenFunction('calc(100% - 20px)') → true`
  - `isTokenFunction('10px') → false`

---

### isTokenColor (Internal)
Checks if the input string is a valid CSS data color (e.g., '<color>').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data color, false otherwise.
- **Example:**
  - `isTokenColor('<color>') → true`
  - `isTokenColor('rgb(255, 0, 0)') → false`

---

### isTokenLink (Internal)
Checks if the input string is a valid CSS data link (e.g., '<link>').

- **Parameters:**
  - `input: string` — The string to check.
- **Returns:** `boolean` — True if the input is a valid CSS data link, false otherwise.
- **Example:**
  - `isTokenLink('<link>') → true`
  - `isTokenLink('https://example.com/image.png') → false`

---

### getTokenType
Determines the group of a CSS data token based on its format.

- **Parameters:**
  - `input: string` — The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
- **Returns:** `StyleTokenType | undefined` — The group of the token as a string ('keyword', 'dimension', 'function', 'integer', 'number') or undefined if not recognized.
- **Example:**
  - `getTokenType('auto') → 'keyword'`
  - `getTokenType('<length>') → 'dimension'`
  - `getTokenType('fit-content(10px)') → 'function'`
  - `getTokenType('<integer>') → 'integer'`
  - `getTokenType('<number>') → 'number'`
  - `getTokenType('<link>') → 'link'`

---

### getTokenCanonical
Extracts the canonical type string from a CSS data type string.

- **Parameters:**
  - `input: string` — The CSS data type string (e.g., 'fit-content(10px)', '<length [0,10]>').
- **Returns:** `string | undefined` — The canonical type string (e.g., 'fit-content()', '<length>') or undefined if not recognized.
- **Example:**
  - `getTokenCanonical('fit-content(<length> <percentage>)') → 'fit-content()'`
  - `getTokenCanonical('<length [0,10]>') → '<length>'`
  - `getTokenCanonical('auto') → 'auto'`
  - `getTokenCanonical('10px') → undefined`
  - `getTokenCanonical('10') → undefined`

---

### getTokenBase
Extracts the base token from a CSS data type string, removing any range or step part.

- **Parameters:**
  - `input: string` — The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
- **Returns:** `string | undefined` — The base token string (e.g., 'length', 'fit-content') or undefined if not recognized.
- **Example:**
  - `getTokenBase('<length [0,10]>') → 'length'`
  - `getTokenBase('fit-content(<length> <percentage>)') → 'fit-content'`
  - `getTokenBase('auto') → 'auto'`

---

### getTokenRange
Extracts the range part from a CSS data type string, if present.

- **Parameters:**
  - `input: string` — The CSS data type string (e.g., '<length [0,10]>').
- **Returns:** `string | undefined` — The range string (e.g., '[0,10]') or undefined if not present.
- **Example:**
  - `getTokenRange('<length [0,10]>') → '[0,10]'`
  - `getTokenRange('fit-content(<length> <percentage>)') → undefined`

---

### getTokenParam
Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.

- **Parameters:**
  - `input: string` — The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
- **Returns:** `Record<string, any> | undefined` — An object with the extracted arguments (e.g., { min: 0, max: 10 } or { syntax: '<length> <percentage>' }) or undefined if not recognized.
- **Example:**
  - `getTokenParam('<length [0,10]>') → { min: 0, max: 10 }`
  - `getTokenParam('fit-content(<length> <percentage>)') → { syntax: '<length> <percentage>' }`
  - `getTokenParam('<number [0,15]>') → { min: 0, max: 15 }`

---

### getTokenValue
Converts a single token (e.g., <length>, <color>) to its default value.

- **Parameters:**
  - `token: string` — The token string (without brackets or with brackets)
- **Returns:** `string | undefined` — The default value for the token, or the token itself if not found
- **Example:**
  - `getTokenValue('<length>') → '0px'`
  - `getTokenValue('<color>') → '#ffffff'`
  - `getTokenValue('<angle>') → '0deg'`
  - `getTokenValue('<percentage>') → '0%'`
  - `getTokenValue('<number>') → '0.0'`

---

### getTokenValues
  Converts an array of tokens to their default values.

- **Parameters:**
  - `tokens: string[]` — The array of tokens to convert.
- **Returns:** `string[]` — The array with all tokens replaced by their default values.
- **Example:**
  - `getTokenValues(['auto', '<length>', '<color>']) → ['auto', '0px', '#ffffff']`

---

### expandTokens
Recursively expands all <token> references in a CSS syntax string using StyleTokenDefinitions.
- **Parameters:**
  - `syntax: string` — The CSS property syntax string (e.g. `'auto |<ratio>'`)
  - `seen?: Set<string>` — (internal) Set of already expanded tokens to prevent infinite recursion
- **Returns:** `string` — The syntax string with all known tokens recursively expanded
- **Example:**
  - `parse('auto || <ratio>') → 'auto || <number> / <number>'`
