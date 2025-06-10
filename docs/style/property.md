# CSS Property

A CSS property defines a specific aspect of an element's style, such as its color, size, layout, or typography. Each property accepts a set of allowed values, which are described by a formal syntax and interpreted by the browser to render the element accordingly.

## Constants
The `constants/style/property.ts` file serves as the main lookup table for CSS property definitions in this project. It provides structured metadata and syntax information for each supported CSS property, enabling robust parsing, validation, and UI generation.

### What is property.ts?

- `property.ts` is a TypeScript module that exports an object mapping CSS property names (e.g., `aspect-ratio`, `width`, `background-color`) to their definitions.
- Each property definition includes:
  - The canonical property name
  - A human-readable description
  - The value definition syntax string (as found in the CSS spec)
  - The property category (e.g., layout, color, typography)
  - The initial value (if any)
  - **A lazily-parsed `syntaxParsed` field**: This is an array of all possible value combinations for the property, generated on demand from the syntax string. This enables efficient incremental parsing and UI slot generation without precomputing all combinations at load time.

### What is it used for?

- **Parsing:**
  - The parser uses `property.ts` to look up the syntax for a given property and expand it into all valid value combinations.
- **Validation:**
  - User input is checked against the allowed values for the property, as defined in the syntax.
- **UI Generation:**
  - The slot-based editor uses the parsed syntax to determine how many slots to render, what types of values are allowed in each slot, and what options to show in dropdowns.
- **Documentation and Tooling:**
  - The property definitions can be used to generate documentation, code completion, and other tooling features.

### Example Structure

```ts
export const CSSPropertyDefs = {
  'aspect-ratio': {
    name: 'aspect-ratio',
    description: 'Specifies the preferred aspect ratio of the box',
    syntax: '<number> | auto',
    category: 'layout',
    initialValue: 'auto',
    syntaxParsed: /* lazy-loaded array of all valid value combinations */
  },
  // ...more properties
};
```

- The `syntaxParsed` field is typically generated on first access by parsing the `syntax` string using the CSS Value Definition Syntax parser. This avoids unnecessary computation and memory usage for properties that are not used.

