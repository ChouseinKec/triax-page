# CSS Property Constants

The `constants/style/property.ts` file serves as the main lookup table for CSS property definitions in this project. It provides structured metadata and syntax information for each supported CSS property, enabling robust parsing, validation, and UI generation.

## What is property.ts?

- `property.ts` is a TypeScript module that exports an object mapping CSS property names (e.g., `aspect-ratio`, `width`, `background-color`) to their definitions.
- Each property definition includes:
  - **`name`** The canonical property name.
  - **`description`** A human-readable description.
  - **`syntaxRaw`** The value definition syntax string (as found in the CSS spec).
  - **`syntaxParsed`**: An array of all possible value combinations for the property, generated on demand from the syntax string. Enables efficient incremental parsing and UI slot generation without precomputing all combinations at load time.
  - **`syntaxExpanded`**: An array of all expanded value combinations, including permutations and optional groups, as defined by the CSS Value Definition Syntax.
  - **`syntaxSet`**: An array of allowed tokens for each slot position in the value, used to generate slot options and validate input.
  - **`syntaxNormalized`**: An array of canonicalized value token strings for each variation, used for strict matching and comparison.
  - **`syntaxSeparators`**: An array of separator arrays (e.g., spaces, commas, slashes) for each variation, used to join slot values correctly in the editor.

## What is it used for?

- **Parsing:**
  - The parser uses `property.ts` to look up the syntax for a given property and expand it into all valid value combinations.
- **Validation:**
  - User input is checked against the allowed values for the property, as defined in the syntax.
- **UI Generation:**
  - The slot-based editor uses the parsed syntax to determine how many slots to render, what types of values are allowed in each slot, and what options to show in dropdowns.
- **Documentation and Tooling:**
  - The property definitions can be used to generate documentation, code completion, and other tooling features.

## Example Structure

```ts
export const CSSPropertyDefs = {
  'aspect-ratio': {
    name: 'aspect-ratio',
    description: 'Specifies the preferred aspect ratio of the box',
    syntaxRaw: '<number> | auto',
    syntaxExpanded: // lazy-loaded
    syntaxParsed: // lazy-loaded 
    syntaxSet: // lazy-loaded  
    syntaxNormalized: // lazy-loaded
    syntaxSeparators: // lazy-loaded
  },
  // ...more properties
};
```

