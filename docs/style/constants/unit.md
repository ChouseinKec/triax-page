# CSS Unit Constants

The `constants/style/units.ts` file serves as the main lookup table for CSS unit definitions in this project. It provides structured metadata and grouping information for each supported CSS unit, enabling robust parsing, validation, and UI generation.

## What is units.ts?

- `units.ts` is a TypeScript module that exports an object mapping CSS unit names (e.g., `px`, `em`, `fr`, `%`, `deg`) to their definitions.
- Each unit definition includes:
  - **`type`** The string 'unit', indicating this is a unit definition object.
  - **`name`** The canonical unit name.
  - **`value`** The default value string for the unit.
  - **`supported`** Indicates the support status of the unit (e.g., 'widely', 'not widely').
  - **`category`** The unit category, such as 'relative' or 'absolute'.
  - **`dimensionGroup`** The dimension group this unit belongs to (e.g., 'length', 'angle', 'percentage').


## What is it used for?

- **Parsing:**
    - The parser does not directly utilize `units.ts`.
- **Validation:**
  - User input is checked against the allowed units for the property and data type.
- **UI Generation:**
  - The slot-based editor uses the unit definitions to populate dropdowns, radio selects, and suggestions for unit selection.
- **Documentation and Tooling:**
  - The unit definitions can be used to generate documentation, code completion, and other tooling features.

## Example Structure

```ts
export const UnitDefinitions = {
  px: {
     type: 'unit',
     name: 'px',
     value: '0px',
     category: 'absolute',
     dimensionGroup: 'length',
     supported: 'widely'
  },
  '%': {
     type: 'unit',
     name: '%',
     value: '0%',
     category: 'relative',
     dimensionGroup: 'percentage',
     supported: 'widely'
  },
  // ...more units
};
```

