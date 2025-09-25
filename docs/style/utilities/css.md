# CSS Generation Utilities

## Overview
Helpers for formatting CSS property names, generating CSS property blocks, and building CSS selectors and rules from JavaScript objects.

## Main Functions

### formatStyleKey
Converts a camelCase CSS property name to kebab-case.

- **Parameters:**
  - `property: string` — The camelCase property name (e.g., 'backgroundColor').
- **Returns:** `string` — The kebab-case property name (e.g., 'background-color').
- **Example:**
  - `formatStyleKey('backgroundColor') → 'background-color'`
  - `formatStyleKey('fontSize') → 'font-size'`

---

### generateCSSStyles
Generates a formatted CSS properties block from an object of styles.

- **Parameters:**
  - `styles: Record<string, string>` — Object containing CSS properties and values.
  - `indentLevel?: number` — Number of spaces for indentation (default: 1).
- **Returns:** `string` — Formatted CSS properties string.
- **Example:**
  - `generateCSSStyles({ color: 'red', fontSize: '16px' })`  
    →  
    ```
      color: red;
      font-size: 16px;
    ```

---

### generateCSSRule
Generates a complete CSS rule block from a selector and a styles object.

- **Parameters:**
  - `selector: string` — CSS selector (e.g., '#block-123', '.class-name').
  - `styles: Record<string, string>` — Object containing CSS properties and values.
  - `indentLevel?: number` — Number of spaces for indentation (default: 0).
- **Returns:** `string` — Complete CSS rule block.
- **Example:**
  - `generateCSSRule('.my-class', { color: 'blue', marginTop: '10px' })`  
    →  
    ```
    .my-class {
      color: blue;
      margin-top: 10px;
    }
    ```

---

### generateCSSSelector
Generates a CSS selector for a block with an optional pseudo-state.

- **Parameters:**
  - `blockID: string` — The block ID.
  - `pseudoName?: string` — The pseudo-state name ('all' means no pseudo, default: 'all').
- **Returns:** `string` — CSS selector string.
- **Example:**
  - `generateCSSSelector('123') → '#block-123'`
  - `generateCSSSelector('123', 'hover') → '#block-123:hover'`