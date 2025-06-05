# CSS Value Definition Syntax Parser

## Combinators & Multipliers

### Combinators

| Symbol      | Name/Type         | Meaning / Usage                                                                 | Example Syntax                        | Example Expansion                |
|-------------|-------------------|-------------------------------------------------------------------------------|---------------------------------------|----------------------------------|
| <code>&#124;</code>         | Single bar (or)   | Exactly one of the options, in listed order                                    | <code>&lt;a&gt;&#124;&lt;b&gt;</code>                  | `<a>`, `<b>`            |
| <code>&#124;&#124;</code>        | Double bar (any order, one or more) | One or more, any order, each at most once (no duplicates unless a multiplier allows) | <code>&lt;a&gt; &#124;&#124; &lt;b&gt;</code>                 | `<a>`, `<b>`, `<a> <b>`, `<b> <a>` |
| `&&`        | Double ampersand (all, any order) | All must appear, any order, each exactly once                     | `<a> && <b>`                 | `<a> <b>`, `<b> <a>` |
| `space`     | Space (sequence)   | Items must appear in the given order, separated by spaces                      | `<a> <b>`                    | `<a> <b>`               |
| `[]`        | Brackets (optional group) | The content inside is optional (may appear 0 or 1 times)                      | `[ <a> ]`                        | `''`, `<a>`            |
| `#`         | Hash (comma-separated list) | One or more, comma-separated, of previous item                                | `<c>#`                            | `<c>`, `<c>, <c>`, ... |

### Multipliers

| Symbol      | Name/Type         | Meaning / Usage                                                                 | Example Syntax                        | Example Expansion                |
|-------------|-------------------|-------------------------------------------------------------------------------|---------------------------------------|----------------------------------|
| `{m,n}`     | Curly braces (repetition) | Repeat previous item at least m and at most n times                            | `<a>{2,4}`                       | `<a> <a>`, `<a> <a> <a>`, `<a> <a> <a> <a>` |
| `*`         | Asterisk (zero or more) | Previous item may appear any number of times (including zero)                  | `<a>*`                            | `''`, `<a>`, `<a> <a>`, ... |
| `+`         | Plus (one or more) | Previous item must appear at least once                                        | `<a>+`                            | `<a>`, `<a> <a>`, ... |
| `?`         | Question mark (zero or one) | Previous item is optional (may appear 0 or 1 times)                        | `<a>?`                            | `''`, `<a>`             |


### Precedence

When parsing a CSS Value Definition Syntax string, always split by the **lowest-precedence combinator first** (the one that binds least tightly):

| Precedence | Combinator / Grouping | Description                                 |
|------------|----------------------|---------------------------------------------|
| 1 (lowest) | <code>&#124;&#124;</code>       | Any order, one or more                      |
| 2          | `&&`                 | All, any order                              |
| 3          | <code>&#124;</code>        | Exactly one                                 |
| 4          | (space)              | Sequence, in order                          |
| 5          | `[]`                 | Brackets (optional group, zero or one)      |
| 6 (highest)| Multipliers (`*`, `+`, `?`, `{m,n}`) | Repetition, optionality, range of previous item or group |

### Notes

- `||` *must have a space before and after* the symbol.
    - *Correct:* `a || b`
    - *Incorrect:* `a||b`, `a ||b`, `a|| b`
- `&&` *must not have spaces before or after* the symbol.
    - *Correct:* `a&&b`
    - *Incorrect:* `a && b`, `a&& b`, `a &&b`
- `|` *must not have spaces before or after* the symbol.
    - *Correct:* `a|b`
    - *Incorrect:* `a | b`
- *No space is allowed before or between the item and its multiplier.*
  - *Invalid:*  
    - `<a> *`  
    - `<a> {1,1}` or `<a>{1 , 1}` ...
  - *Valid:*  
    - `<a>*`  
    - `<a>{1,1}`
- *Repetition is only allowed if a multiplier is present.*
- *The parser will attempt to normalize the string by removing extra spaces or correcting spacing for combinators and multipliers. However, for better readability, performance, and to minimize errors, always use the correct spacing as shown above.*


## Parsing

### How Parsing Works

Parsing a CSS Value Definition Syntax string involves recursively breaking down the syntax into its valid value combinations, following the official precedence rules for combinators and groupings. The process ensures that the parser respects the intended grouping and order of operations, just like operator precedence in mathematics.

#### Parsing Steps
1. **Split by the lowest-precedence combinator first** (the one that binds least tightly):
   - `||` (double bar, any order, one or more)
2. **Recursively split each part by the next-lowest precedence combinator:**
   - `&&` (all, any order)
3. **Continue recursively for higher-precedence combinators:**
   - `|` (exactly one)
   - (space) (sequence, in order)
   - `[]` (optional group)
   - Multipliers (`*`, `+`, `?`, `{m,n}`)
4. **Expand components and ranges** as needed using the lookup tables.
5. **Combine results** at each level to generate all valid value combinations.

#### Example
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

**Note:** The actual set of valid combinations depends on the combinators and groupings in the syntax. The parser always respects the official precedence and grouping rules.

**Reference:**
- [CSS Value Definition Syntax: Precedence](https://drafts.csswg.org/css-values-4/#component-combinators)
- [MDN: Value Definition Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax#value_definition_syntax)

# CSS Syntax Component Types

## Components (Value Definition Components)

In CSS Value Definition Syntax, items like `<length>`, `<angle>`, `<color>`, etc. are called **components** (or sometimes "value definition components").
- A **component** is a named placeholder for a set of allowed values, which can be recursively expanded using the lookup tables.
- Components can be keywords (like `auto`), data types (like `<length>`), or functions (like `rgb()`).

## Ranges in Components

Some components specify a range, e.g. `<angle [0,180]>`:
- This means the value must be an `<angle>` (such as `45deg`), and the numeric part must be within the range 0 to 180 (inclusive).
- Ranges are used to further restrict the allowed values for a component.

## Example

For the property:
```
'rotate': createProperty('rotate', '<angle [0,180]>', 'Rotates the element by a given angle', 'transform'),
```
- `<angle [0,180]>` is a component with a range restriction.
- The parser will expand `<angle>` using `data-types.ts` and validate the numeric value using the range.

---

These lookup tables and component definitions are the foundation for parsing, validating, and generating all possible value combinations for CSS properties in this project.


# CSS Syntax Lookup Tables

## property.ts, data-types.ts, units.ts

The files `property.ts`, `data-types.ts`, and `units.ts` in this project serve as lookup tables for CSS Value Definition Syntax parsing and expansion:

- **property.ts**: Maps CSS property names to their value definition syntax, descriptions, and categories. This allows the parser and UI to know what values are valid for each CSS property.
- **data-types.ts**: Defines the expansion for each CSS data type (e.g., `<length>`, `<angle>`, `<color>`, etc.), mapping them to their syntax or possible values. This enables recursive expansion of data types in property definitions.
- **units.ts**: Lists all valid CSS units (e.g., `px`, `em`, `deg`, `s`, etc.), their categories (length, angle, time, etc.), and their support status. This is used to validate and suggest units for numeric values.

These lookup tables are essential for:
- Expanding shorthand or composite syntax into all possible valid values.
- Validating user input against the CSS specification.
- Generating UI controls for editing CSS properties.
