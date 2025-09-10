# Style Editor
The style editor is a modular, slot-based system for building, parsing, and editing CSS property values in a structured and context-aware way. It leverages a set of core concepts—Value, Parse, Property, Token, and Unit—to provide robust parsing, validation, and UI generation for CSS editing.

## Table of Contents

| Section   | Description |
|-----------|-------------|
| [Parse](#parse) | CSS value syntax parsing, combinators, multipliers, and precedence |
| [Value](#value) | Slot-based value editing, splitting/joining, and options filtering |
| [Property](#property) | Property definitions, syntax, and usage |
| [Token](#token) | Token types, canonicalization, and usage |
| [Unit](#unit) | Unit definitions, categories, and usage |

---

## Parse
CSS parsing refers to the process of analyzing and breaking down CSS value definition syntax strings into their component parts, following the official CSS specification rules. This enables the system to understand, validate, and generate all possible value combinations for a given property, which is essential for building robust style editors and tools.

**Note:** 
- While every effort is made to follow the official CSS documentation and specification as closely as possible, some aspects of the spec are either undocumented or ambiguous. As a result, there may be slight differences in parsing methods compared to the official implementation. However, these differences should not affect the set of possible values that a property can accept.
 - In this project, we use the term **token** (e.g., `<length>`, `<ratio>`, `<angle>`) instead of "component" or "value component" as used in the official CSS specification, to avoid confusion with React components. Whenever you see "token" in this documentation, it refers to these CSS syntax elements.
### Combinators

| Symbol      | Name/Type         | Meaning / Usage                                                                 | Example Syntax                        | Example Expansion                |
|-------------|-------------------|-------------------------------------------------------------------------------|---------------------------------------|----------------------------------|
| <code>&#124;</code>         | Single bar (or)   | Exactly one of the options, in listed order                                    | <code>&lt;a&gt;&#124;&lt;b&gt;</code>                  | `<a>`, `<b>`            |
| <code>&#124;&#124;</code>        | Double bar (any order, one or more) | One or more, any order, each at most once (no duplicates unless a multiplier allows) | <code>&lt;a&gt; &#124;&#124; &lt;b&gt;</code>                 | `<a>`, `<b>`, `<a> <b>`, `<b> <a>` |
| `&&`        | Double ampersand (all, any order) | All must appear, any order, each exactly once                     | `<a> && <b>`                 | `<a> <b>`, `<b> <a>` |
| `space`     | Space (sequence)   | Items must appear in the given order, separated by spaces                      | `<a> <b>`                    | `<a> <b>`               |
| `[]`        | Brackets (optional group) | The content inside is optional (may appear 0 or 1 times)                      | `[ <a> ]`                        | `''`, `<a>`            |

### Multipliers

| Symbol      | Name/Type         | Meaning / Usage                                                                 | Example Syntax                        | Example Expansion                |
|-------------|-------------------|-------------------------------------------------------------------------------|---------------------------------------|----------------------------------|
| `{m,n}`     | Curly braces (repetition) | Repeat previous item at least m and at most n times                            | `<a>{2,4}`                       | `<a> <a>`, `<a> <a> <a>`, `<a> <a> <a> <a>` |
| `*`         | Asterisk (zero or more) | Previous item may appear any number of times (including zero)                  | `<a>*`                            | `''`, `<a>`, `<a> <a>`, ... |
| `+`         | Plus (one or more) | Previous item must appear at least once                                        | `<a>+`                            | `<a>`, `<a> <a>`, ... |
| `?`         | Question mark (zero or one) | Previous item is optional (may appear 0 or 1 times)                        | `<a>?`                            | `''`, `<a>`             |
| `#`         | Hash (comma-separated list) | One or more, comma-separated, of previous item                                | `<c>#`                            | `<c>`, `<c>, <c>`, ... |

### Precedence

When parsing a CSS Value Definition Syntax string, always split by the **lowest-precedence combinator first** (the one that binds least tightly):

| Precedence | Combinator / Grouping | Description                                 |
|------------|----------------------|---------------------------------------------|
| 1 (lowest) | <code>&#124;&#124;</code>       | Any order, one or more                      |
| 2          | `&&`                 | All, any order   
| 3          | <code>&#124;</code>        | Exactly one                                 |
|                           |
| 4          | <code>' '</code>              | Sequence, in order                          |
 5          | `[]`                 | Brackets (optional group, zero or one)      |
| 6 (highest)| Multipliers (`*`, `+`, `?`, `{m,n}`) | Repetition, optionality, range of previous item or group |


### How Parsing Works

Parsing a CSS Value Definition Syntax string involves recursively breaking down the syntax into its valid value combinations, following the official precedence rules for combinators and groupings. The process ensures that the parser respects the intended grouping and order of operations, just like operator precedence in mathematics.



1. **Split by the lowest-precedence combinator first** (the one that binds least tightly):
   - `||` (double bar, any order, one or more)
2. **Recursively split each part by the next-lowest precedence combinator:**
   - `&&` (all, any order)
3. **Continue recursively for higher-precedence combinators:**
   - `|` (exactly one)
   - (space) (sequence, in order)
   - `[]` (optional group)
   - Multipliers (`*`, `+`, `?`, `{m,n}`)
4. **Combine results** at each level to generate all valid value combinations.



For the syntax:
```
[<a> && <b>] || <c>
```
- **Step 1:** Split by `||` (lowest precedence):
  - Parts: `[<a> && <b>]`, `<c>`
- **Step 2:** Parse each part recursively:
  - For `[<a> && <b>]`:
    - Remove brackets (optional group): possible values are `''` (empty) and `<a> && <b>`
    - For `<a> && <b>`: split by `&&` → `<a>`, `<b>`
    - Generate all permutations: `<a> <b>`, `<b> <a>`
    - So, `[<a> && <b>]` expands to: `''`, `<a> <b>`, `<b> <a>`
  - For `<c>`: just `<c>`
- **Step 3:** Combine all results from `||`:
  - All non-empty subsets and permutations of the parts:
    - `''` (empty, from optional group)
    - `<a> <b>`
    - `<b> <a>`
    - `<c>`
    - `<a> <b> <c>`
    - `<b> <a> <c>`
    - `<c> <a> <b>`
    - `<c> <b> <a>`


**Notes:**

- `||` must have spaces on both sides.  
    - Example: `a || b`
- `&&` and `|` must have no spaces on either side.  
    - Example: `a&&b`, `a|b`
- Multipliers (`*`, `{m,n}`) must be directly after the item, with no spaces.  
    - Example: `<a>*`, `<a>{1,1}`
- Repetition is only allowed if a multiplier is present, and the <span style="color:rgb(255, 73, 73);"> maximum repetition depth is currently capped at 2 to avoid enormous syntax explosion.</span>
- The parser will attempt to normalize the string by removing extra spaces or correcting spacing for combinators and multipliers. However, for better readability, performance, and to minimize errors, always use the correct spacing as shown above.
- The main `parse` function always receives the already-expanded syntax string (see `property.ts`). Expansion of component (token) references is handled before parsing.

### See Also
- **Utilities**:
    - [Parse](utilities/parse.md)
- **References**:
    - [CSS Value Definition Syntax: Precedence](https://drafts.csswg.org/css-values-4/#component-combinators)
    - [MDN: Value Definition Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax#value_definition_syntax)
---

## Value
A CSS value represents the data assigned to a CSS property—such as a keyword, number, dimension, function, or a combination of these—and can be simple (e.g., `auto`, `10px`) or complex (e.g., `auto 10px / 20px`). In the style editor, values are parsed, validated, and rendered using a slot-based approach: each possible value pattern (variation) is split into slots (columns) using top-level separators (space, comma, or slash). For each slot, the editor provides context-aware options and input components, enabling incremental and context-aware editing so users can build valid values step by step, even for complex property syntaxes.

### Value Splitting and Joining

- **Splitting:**
  - Value strings are split into slots using top-level separators (space, comma, slash) via `splitAdvanced`.
  - This ensures that only separators at the top level (not inside brackets or functions) are considered, so complex values like `minmax(10px, 1fr)` are handled correctly.

- **Joining:**
  - When the user edits a slot, the updated slot values are joined back into a single value string using the correct separators for the matched variation.
  - This is handled by `joinAdvanced`, which takes the slot values and the corresponding separator array (extracted from the matched variation) and joins them in the correct order.
  - This guarantees that values like `10px / 2` or `auto 1 / 2` are always joined with the right syntax, matching the CSS property definition.

### Slot Options and Tuple

The style editor dynamically generates valid options for each value slot using a pre-calculated lookup table from `property.ts`. This enables context-aware editing and robust support for complex CSS value patterns, including tuples.

- **Pre-calculated Syntax Tables:**
  - Each property definition in `property.ts` includes `syntaxSet` (all possible tokens for each slot) and `syntaxNormalized` (all valid value token strings for each variation).
  - These tables are generated from the CSS value definition syntax and allow the editor to efficiently determine which options are valid at any editing step.

- **Option Generation with `createOptionTable`:**
  - The `createOptionTable` function takes `syntaxSet` and `syntaxNormalized` and, for each slot, checks the current and previous slot values (joined as a string) against all valid variations.
  - An option is only shown if inserting it at the current slot position would result in a value string that matches (or could match) a valid syntax variation.
  - This ensures that only contextually valid options are presented, preventing invalid combinations and guiding the user toward valid CSS values.

- **Tuple and Partial Matching:**
  - The slot option logic supports tuple syntaxes (e.g., `<length> <color> <angle>`, `<color> <length>`) by checking not just for exact matches but also for partial matches (using `startsWith`).
  - This means that as the user fills in slots, the editor can match incomplete input to the start of a valid tuple, and dynamically update the available options for the next slot.

- **Value Updates and Tuple Completion (`Value` component):**
  - In the `Value` component (`component.tsx`), the `handleSlotsChange` function is responsible for updating the value as the user edits slots.
  - It first tries to find an exact match for the current slot values in `syntaxNormalized` (e.g., `<length> <number>` must match `<length> <number>`).
  - If no exact match is found, it uses a flexible match (with `startsWith`) to find the first tuple that matches the current input. When a match is found, the editor fills in the remaining slots with default token values for that tuple, allowing the user to complete complex patterns incrementally.
  - This approach enables seamless editing of tuple-based syntaxes and ensures the editor always produces valid, spec-compliant CSS values.

**Example:**
If the syntax variations are:
```
[
  <length> <color> <angle>,
  <color> <length>,
]
```
- If the user enters `[<length>]`, the editor matches it to `<length> <color> <angle>` and offers `<color>` as the next valid option.
- As more slots are filled, the editor continues to match the input to the most appropriate tuple, updating available options and filling in defaults as needed.

This dynamic, context-aware approach makes the style editor intuitive and powerful, especially for advanced CSS properties with multiple valid value patterns.

### See Also
- **Utilities**:
    - [Value](utilities/value.md)
    - [Function](utilities/function.md)
    - [Dimension](utilities/dimension.md)
    - [Option](utilities/option.md)

---

## Property
A CSS property defines a specific aspect of an element's style, such as its color, size, layout, or typography. Each property accepts a set of allowed values, which are described by a formal syntax and interpreted by the browser to render the element accordingly.

### See Also
- **Constants**:
    - [Property](constants/property.md)


---

## Token
A CSS token represents a fundamental component in the CSS value definition syntax, such as a data type, keyword, or function. Tokens are used to describe the possible values that a CSS property can accept, and serve as the building blocks for parsing, validation, and UI generation in style editors.

**Note:** In the official CSS specification, these are called "value components", "components", or "data types". In this project, we use the term **token** for clarity and consistency.

### See Also
- **Constants:**
    - [Token](constants/token.md)
- **Utilities:**
    - [Token](utilities/token.md)


---

## Unit
A CSS unit defines the measurement system or scale for a value in CSS, such as pixels (`px`), ems (`em`), percentages (`%`), or angles (`deg`). Units are used to specify the magnitude and type of values for CSS properties, enabling flexible and precise control over layout, sizing, and other style aspects.
### See Also
- **Constants:**
    - [Unit](constants/unit.md)

