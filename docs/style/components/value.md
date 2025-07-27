# Value Components

The value components in `editors/style/components/value` provide a modular, slot-based system for editing CSS property values in the style editor. Each component is responsible for rendering and validating a specific type of CSS value (dimension, color, keyword, function, etc.), and together they enable robust, context-aware value editing for any CSS property.

## Overview

- **Value**: Main entry point for rendering a value editor for a CSS property. Handles parsing, slotting, and incremental UI for property values.
- **Slots**: Renders a row of slot editors for each value slot, plus an extra dropdown for the next possible slot.
- **Slot**: Renders the appropriate input component for a single value slot based on its type.
- **DimensionValue**: Input for CSS dimension values (e.g., `10px`, `2rem`), with numeric and unit selection.
- **NumberValue**: Input for numeric values, with optional alternative options (keywords, etc.).
- **KeywordValue**: Selector for keyword values, using a radio group or dropdown.
- **FunctionValue**: Editor for CSS function values (e.g., `repeat(2, 1fr)`), with function selection and argument editing.
- **ColorValue**: Input for CSS color values, using a color picker.
- **LinkValue**: Input for URL/link values, with validation.
- **Error**: Displays error messages in a floating tooltip.

---

## Value

**File:** `value/component.tsx`

Main entry for rendering a CSS property value editor. Handles parsing, slotting, and incremental UI for property values.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `property`| `object`     | The CSS property definition (with syntax).  |
| `value`   | `string`     | The current value string for the property.  |
| `onChange`| `function`   | Callback to update the value.               |

**Usage:**
```tsx
<Value property={property} value="10px auto" onChange={setValue} />
```

---

## Slots

**File:** `value/slots/component.tsx`

Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `values`  | `string[]`   | Array of current slot values.               |
| `options` | `array`      | Options for each slot.                      |
| `onChange`| `function`   | Callback to update slot values.             |

---

## Slot

**File:** `value/slot/component.tsx`

Renders the appropriate input component for a single value slot based on its type (function, keyword, dimension, number, color, link, etc.).

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | The value for this slot.                    |
| `options` | `array`      | Options for this slot.                      |
| `onChange`| `function`   | Callback to update the slot value.          |

---

## DimensionValue

**File:** `value/dimension/component.tsx`

Input for CSS dimension values (e.g., `10px`, `2rem`). Splits values into numeric and unit components for separate editing.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | Current dimension value.                    |
| `onChange`| `function`   | Callback for value changes.                 |
| `options` | `array`      | Available unit options with categories.     |

---

## NumberValue

**File:** `value/number/component.tsx`

Input for numeric values, with optional alternative options (keywords, etc.). Supports integer and float, with validation.

**Props:**

| Prop           | Type         | Description                                 |
|----------------|--------------|---------------------------------------------|
| `value`        | `string`     | Current numeric value.                      |
| `onChange`     | `function`   | Callback for value changes.                 |
| `options`      | `array`      | Alternative options (keywords, etc.).       |
| `forceInteger` | `boolean`    | If true, only allows integer values.        |

---

## KeywordValue

**File:** `value/keyword/component.tsx`

Selector for keyword values, using a radio group (if all options have icons) or a dropdown.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | Current keyword value.                      |
| `options` | `array`      | Keyword options (with optional icons).      |
| `onChange`| `function`   | Callback for value changes.                 |

---

## FunctionValue

**File:** `value/function/component.tsx`

Editor for CSS function values (e.g., `repeat(2, 1fr)`). Allows function selection and argument editing.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | Current function value.                     |
| `options` | `array`      | Function options with categories and syntax.|
| `onChange`| `function`   | Callback for value changes.                 |

---

## ColorValue

**File:** `value/color/component.tsx`

Input for CSS color values, using a color picker.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | Current color value.                        |
| `onChange`| `function`   | Callback for value changes.                 |

---

## LinkValue

**File:** `value/link/component.tsx`

Input for URL/link values, with validation and formatting.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `value`   | `string`     | Current link value.                         |
| `onChange`| `function`   | Callback for value changes.                 |

---

## Error

**File:** `value/error/component.tsx`

Displays error messages in a floating tooltip for invalid or malformed values.

**Props:**

| Prop      | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| `message` | `string`     | Error message to display.                   |

---

## How They Work Together

- The `Value` component is the main entry point and uses `Slots` to render each slot in a multi-part value.
- Each `Slot` determines the value type and renders the appropriate value component (`DimensionValue`, `NumberValue`, `KeywordValue`, `FunctionValue`, `ColorValue`, `LinkValue`).
- The system supports complex CSS value patterns, incremental editing, and robust validation for each value type.

---

## See Also

- [Style Editor](../../editor.md)
- [Property Component](../property.md)