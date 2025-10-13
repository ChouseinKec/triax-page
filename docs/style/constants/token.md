# CSS Token Constants

The `constants/style/token.ts` file defines the canonical set of CSS value definition tokens  used throughout this project. It provides the base forms and mappings for all recognized tokens, enabling robust parsing, validation, and UI generation.

## What is token.ts?

- `token.ts` is a TypeScript module that exports definitions and canonical forms for all CSS value definition tokens  (e.g., `<length>`, `<angle>`, `<ratio>`) used in this project.
- Each token definition includes:
  - **`type`** The canonical token string.
  - **`syntax`** The syntax pattern or allowed structure for the token, typically matching the CSS value definition syntax.


## What is it used for?

- **Parsing:**
  - Used as a lookup for valid tokens/components during parsing of CSS value definition syntax.
  - Enables canonicalization and normalization of tokens for robust comparison and expansion.
- **Validation:**
  - Ensures that only recognized tokens are used in property definitions and user input.
- **UI Generation:**
  - Drives the generation of dropdowns, suggestions, and validation logic for token-based value editors.
- **Documentation and Tooling:**
  - Provides a source of truth for all recognized tokens, supporting documentation and code completion features.

## Example Structure

```ts
export const TOKEN_DEFINITIONS = {
  '<length>': {
    type: '<length>',
    syntax: '<length>',
  },
  '<ratio>': {
    type: '<ratio>',
    syntax: '<length> [/ <length>]',
  },
  // ...more tokens
};
```


## Parameters in Tokens

Function tokens can take **parameters**, which restrict the allowed inner values. For example, `fit-content(<length> | auto | number)` restricts the parameter to be a `<length>`, `auto`, or a number.

## Ranges in Tokens

Some tokens specify a range, e.g. `<angle [0,180]>`:
- This means the value must be an `<angle>` (such as `45deg`), and the numeric part must be within the range 0 to 180 (inclusive).
- Ranges are used to further restrict the allowed values for a token.

