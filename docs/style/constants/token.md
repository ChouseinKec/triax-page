# CSS Token

A CSS token represents a fundamental component in the CSS value definition syntax, such as a data type, keyword, or function. Tokens are used to describe the possible values that a CSS property can accept, and serve as the building blocks for parsing, validation, and UI generation in style editors.

**Note:** In the official CSS specification, these are called "value components", "components", or "data types". In this project, we use the term **token** for clarity and consistency.

## Constants
The `constants/style/token.ts` file defines the canonical set of CSS value definition tokens  used throughout this project. It provides the base forms and mappings for all recognized tokens, enabling robust parsing, validation, and UI generation.

### What is token.ts?

- `token.ts` is a TypeScript module that exports definitions and canonical forms for all CSS value definition tokens used in this project.
- Each token definition includes:
  - The canonical token string (e.g., `<length>`, `<angle>`, `<color>`, `auto`, etc.)
  - Mappings for keywords, data types, and function names
  - Groupings and categories for tokens (e.g., dimension, keyword, function)

### What is it used for?

- **Parsing:**
  - Used as a lookup for valid tokens/components during parsing of CSS value definition syntax.
  - Enables canonicalization and normalization of tokens for robust comparison and expansion.
- **Validation:**
  - Ensures that only recognized tokens are used in property definitions and user input.
- **UI Generation:**
  - Drives the generation of dropdowns, suggestions, and validation logic for token-based value editors.
- **Documentation and Tooling:**
  - Provides a source of truth for all recognized tokens, supporting documentation and code completion features.

### Example Structure

```ts
export const CSSTokenDefs = {
  '<length>': { group: 'dimension', ... },
  '<angle>': { group: 'dimension', ... },
  'auto': { group: 'keyword', ... },
  'fit-content()': { group: 'function', ... },
  // ...more tokens
};
```

---

### Parameters in Tokens

Function tokens can take **parameters**, which restrict the allowed inner values. For example, `fit-content(<length> | auto | number)` restricts the parameter to be a `<length>`, `auto`, or a number.

### Ranges in Tokens

Some tokens specify a range, e.g. `<angle [0,180]>`:
- This means the value must be an `<angle>` (such as `45deg`), and the numeric part must be within the range 0 to 180 (inclusive).
- Ranges are used to further restrict the allowed values for a token.

---
