# CSS Value

A CSS value represents the data assigned to a CSS property—such as a keyword, number, dimension, function, or a combination of these—and can be simple (e.g., `auto`, `10px`) or complex (e.g., `auto 10px / 20px`). In the style editor, values are parsed, validated, and rendered using a slot-based approach: each possible value pattern (variation) is split into slots (columns) using top-level separators (space, comma, or slash). For each slot, the editor provides context-aware options and input components, enabling incremental and context-aware editing so users can build valid values step by step, even for complex property syntaxes.

## Value Splitting and Joining with Separators

- **Splitting:**
  - Value strings are split into slots using top-level separators (space, comma, slash) via `splitAdvanced`.
  - This ensures that only separators at the top level (not inside brackets or functions) are considered, so complex values like `minmax(10px, 1fr)` are handled correctly.

- **Joining:**
  - When the user edits a slot, the updated slot values are joined back into a single value string using the correct separators for the matched variation.
  - This is handled by `joinAdvanced`, which takes the slot values and the corresponding separator array (extracted from the matched variation) and joins them in the correct order.
  - This guarantees that values like `10px / 2` or `auto 1 / 2` are always joined with the right syntax, matching the CSS property definition.

- **Separator Extraction:**
  - The `extractSeparators` utility parses all syntax variations and extracts the top-level separators for each, so the editor always knows how to join slot values for any valid variation.

## Flexible Variation and Options Filtering

- **No More Strict Filtering:**
  - The old `variationFilter` logic (which required strict matching of slot values to variations) has been removed.
  - Now, all filtering and matching logic is handled inside `createOptionsTable`, which is more flexible and robust.
  - `createOptionsTable` considers all allowed variations and builds the slot options table based on partial matches and context, not just strict string equality.
  - This enables incremental, context-aware editing and ensures that only valid slot options are presented at each step, even for complex or partially-complete values.

## Constants
The `constants/style/value.ts` file currently defines only the value separators (such as space, comma, and slash) used to split value patterns into slots. In the future, any additional value-related constants or definitions will be added here.

---

## Components

### How `Value` Component Works

The `editors/style/components/value/value.ts` component provides core logic for parsing, joining, and handling CSS value variations:

- **Retrieving Variations:**
  - For a given property, the value editor retrieves the array of possible value variations from the property definition's `syntaxParsed` field (see `property.ts`).
- **Slot Splitting:**
  - The value string is split into slots using the defined separators, enabling incremental editing and validation for each part of the value.
- **Slot Joining:**
  - When the user edits a slot, the updated slot values are joined using the correct separators for the matched variation, ensuring the value string always matches the CSS syntax.
- **Flexible Options Table:**
  - The editor uses `createOptionsTable` to build the slot options table, considering all allowed variations and supporting partial/incremental editing.

---

### How `Slots` Component Works

The `editors/style/components/value/Slots/component.tsx` component is responsible for managing slot-wise logic:

- **Rendering currentSlots:**
  - The `Slots` component maps over the current slot values and renders a `Slot` component for each, passing the relevant slot variations and change handlers.
- **Rendering nextSlot:**
  - If there are more possible slots (i.e., the user can add another value), the `Slots` component renders an extra dropdown for the next available slot, using the options generated from the next slot's variations.

---

### How `Slot` Component Works

The `editors/style/components/value/Slot/component.tsx` component is responsible for managing the logic associated with an individual value slot:

- **Determining valueType:**
  - The `getValueType` function analyzes the current slot value and determines its type (e.g., keyword, function, dimension, number). This type is used to select the appropriate input component.
- **Generating Slot Options:**
  - The `createOptions` function creates the list of valid options for the slot, based on the slot's possible variations. These options are passed to the input component for dropdowns or suggestions.
- **Rendering the Correct Component:**
  - Based on the detected value type, the `Slot` component renders the corresponding `Input` component: `Keyword`, `Function`, `Dimension`, or `Number`.

---

### How `Input` Components Work

Each value type has a dedicated input component for editing and validation:

#### `Function` Component
- Renders an input for CSS function values (e.g., `fit-content(10px)`).
- Handles parsing and validation of function arguments.

#### `Keyword` Component
- Renders a dropdown or input for keyword values (e.g., `auto`, `inherit`).
- Provides suggestions and validation for allowed keywords.

#### `Number` Component
- Renders an input for numeric values (e.g., `1`, `100`).
- Handles validation for allowed ranges and formats.

#### `Dimension` Component
- Renders an input for dimension values (e.g., `10px`, `2em`).
- Provides unit selection and validation based on allowed units for the property.

---
