# CSS Value

A CSS value represents the data assigned to a CSS property—such as a keyword, number, dimension, function, or a combination of these—and can be simple (e.g., `auto`, `10px`) or complex (e.g., `auto 10px / 20px`). In the style editor, values are parsed, validated, and rendered using a slot-based approach: each possible value pattern (variation) is split into slots (columns) using top-level separators (space, comma, or slash). For each slot, the editor provides context-aware options and input components, enabling incremental and context-aware editing so users can build valid values step by step, even for complex property syntaxes.



## Data Flow

### Example:

Suppose the property syntax is:

```
raw property syntax: auto || <ratio>
```

In `token.ts`, `<ratio>` expands as:

```
<ratio> = <number [0,∞]> [ / <number [0,∞]> ]
```

**All variations (syntaxParsed) retrieved from property definition:**

```
[
    "auto",
    "<number [0,∞]>",
    "auto <number [0,∞]>",
    "<number [0,∞]>  auto",
    "<number [0,∞]> / <number [0,∞]>",
    "auto <number [0,∞]> / <number [0,∞]>",
    "<number [0,∞]> / <number [0,∞]> auto"
]
```

**Slot lookup table (allSlotVariations) generated in slots.ts:**

```
[
    [
        { type: "keyword", params: { value: "auto" } },
        { type: "number", params: { min: "0", max: "∞" } }
    ],
    [
        { type: "number", params: { min: "0", max: "∞" } },
        { type: "keyword", params: { value: "auto" } }
    ],
    [
        { type: "number", params: { min: "0", max: "∞" } },
        { type: "keyword", params: { value: "auto" } }
    ]
]
```

**Step-by-step flow:**
1. **Value.ts** receives the property name (`aspect-ratio`) and the current value string (e.g., `auto` or `2 / 1`).
2. It retrieves the property definition and expands the syntax to all possible variations (see above).
3. As the user types, `filterVariations` narrows the list to only those variations matching the current input.
4. The value string is split into slots (e.g., `['2', '/', '1']`).
5. `createSlotVariations` builds a lookup table of all unique options for each slot, based on the filtered variations.
6. The `Slots` component renders a `Slot` for each slot value, passing the relevant options.
7. Each `Slot` determines its type (keyword, number, etc.) and renders the correct input component.
8. The user can incrementally build or edit the value, with the UI updating contextually at each step.

---

This slot-based, incremental approach enables robust, context-aware editing of complex CSS property values, ensuring that users can only enter valid combinations at each step.



## Constants
The `constants/style/value.ts` file currently defines only the value separators (such as space, comma, and slash) used to split value patterns into slots. In the future, any additional value-related constants or definitions will be added here.

---

## Components

### How `Value` Component Works

The `editors/style/components/value/value.ts` component provides core logic for parsing, filtering, and handling CSS value variations:

- **Retrieving Variations:**
  - For a given property, the value editor retrieves the array of possible value variations from the property definition's `syntaxParsed` field (see `property.ts`).
- **Filtering Variations:**
  - As the user enters values, the editor filters the list of variations to only those that match the current input prefix. This is handled by the `filterVariations` function, which compares the current slot values to each variation and returns only the compatible ones.
- **Slot Splitting:**
  - The value string is split into slots using the defined separators, enabling incremental editing and validation for each part of the value.

---

### How `Slots` Component Works

The `editors/style/components/value/slot.ts` component is responsible for managing slot-wise logic:

- **Gathering allSlotVariations:**
  - The `createSlotVariations` function takes the filtered variations and builds a lookup table of all unique options for each slot (column). This enables the editor to show only valid options for each slot, based on the current context.
- **Rendering currentSlots:**
  - The `Slots` component maps over the current slot values and renders a `Slot` component for each, passing the relevant slot variations and change handlers.
- **Rendering nextSlot:**
  - If there are more possible slots (i.e., the user can add another value), the `Slots` component renders an extra dropdown for the next available slot, using the options generated from the next slot's variations.

---

### How `Slot` Component Works

The `editors/style/components/value/slot.ts` component is responsible for managing the logic associated with an individual value slot:

- **Determining valueType:**
  - The `getValueType` function analyzes the current slot value and determines its type (e.g., keyword, function, dimension, number). This type is used to select the appropriate input component.

- **Generating Slot Options:**
  - The `createOptionsTable` function creates the list of valid options for the slot, based on the slot's possible variations. These options are passed to the input component for dropdowns or suggestions.

- **Rendering the Correct Component:**
  - Based on the detected value type, the `Slot` component renders the corresponding `Input` component: `Keyword`, `Function`, `Dimension`, or `Number`.
---

### How `Input` Components Works

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
