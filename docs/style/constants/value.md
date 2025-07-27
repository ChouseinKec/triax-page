# CSS Value Constants

The `constants/style/value.ts` file provides default values and separators for common CSS functions and value lists. These constants are used for initializing editors, generating UI defaults, and parsing or formatting CSS value strings.

## What is value.ts?

- `value.ts` is a TypeScript module that exports:
  - **`ValueFunctionDefaults`**: An object mapping CSS function names (e.g., `minmax`, `blur`, `url`) to their default value strings. Useful for initializing value editors or providing example values.
  - **`ValueSeparatorDefaults`**: An array of default separators (space, comma, slash) used for splitting or joining value lists in CSS.

## What is it used for?

- **Editor Initialization:**
  - Provides default values for CSS functions when creating new value slots in a UI.
- **Parsing and Formatting:**
  - Supplies default separators for splitting or joining multi-part CSS values.
- **UI Generation:**
  - Enables quick population of example values for function-based CSS properties.
- **Documentation and Tooling:**
  - Used to generate code completion, tooltips, and example snippets for CSS value functions.

## Example Structure

```ts
export const ValueFunctionDefaults = {
  minmax: 'minmax(0px,0px)',
  'fit-content': 'fit-content(0px)',
  repeat: 'repeat(1,1fr)',
  // ...more functions
  url: 'url("https://example.com")',
};

export const ValueSeparatorDefaults = [' ', ',', '/'];
```