# CSS Unit

A CSS unit defines the measurement system or scale for a value in CSS, such as pixels (`px`), ems (`em`), percentages (`%`), or angles (`deg`). Units are used to specify the magnitude and type of values for CSS properties, enabling flexible and precise control over layout, sizing, and other style aspects.

## Constants
The `constants/style/units.ts` file serves as the main lookup table for CSS unit definitions in this project. It provides structured metadata and grouping information for each supported CSS unit, enabling robust parsing, validation, and UI generation.

### What is units.ts?

- `units.ts` is a TypeScript module that exports an object mapping CSS unit names (e.g., `px`, `em`, `fr`, `%`, `deg`) to their definitions.
- Each unit definition includes:
  - The canonical unit name
  - The value string (e.g., `0px`, `0em`)
  - The unit category (e.g., relative, absolute)
  - The dimension group (e.g., length, angle, percentage)
  - The support status (e.g., widely, not widely)
  - All metadata needed for validation and UI rendering

### What is it used for?

- **Parsing:**
    - The parser does not directly utilize `units.ts`.
- **Validation:**
  - User input is checked against the allowed units for the property and data type.
- **UI Generation:**
  - The slot-based editor uses the unit definitions to populate dropdowns, radio selects, and suggestions for unit selection.
- **Documentation and Tooling:**
  - The unit definitions can be used to generate documentation, code completion, and other tooling features.

### Example Structure

```ts
export const CSSUnitDefs = {
  px: { name: 'px', value: '0px', category: 'absolute', dimensionGroup: 'length', supported: 'widely' },
  em: { name: 'em', value: '0em', category: 'relative', dimensionGroup: 'length', supported: 'widely' },
  fr: { name: 'fr', value: '0fr', category: 'relative', dimensionGroup: 'flex', supported: 'widely' },
  deg: { name: 'deg', value: '0deg', category: 'absolute', dimensionGroup: 'angle', supported: 'widely' },
  '%': { name: '%', value: '0%', category: 'relative', dimensionGroup: 'percentage', supported: 'widely' },
  // ...more units
};
```

- The `CSSUnitDefs` object provides all metadata for each unit, which is used throughout the style system for parsing, validation, and UI generation.
