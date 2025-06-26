# CSS Parse

CSS parsing refers to the process of analyzing and breaking down CSS value definition syntax strings into their component parts, following the official CSS specification rules. This enables the system to understand, validate, and generate all possible value combinations for a given property, which is essential for building robust style editors and tools.

> **Note:** While every effort is made to follow the official CSS documentation and specification as closely as possible, some aspects of the spec are either undocumented or ambiguous. As a result, there may be slight differences in parsing methods compared to the official implementation. However, these differences should not affect the set of possible values that a property can accept.

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
| 2          | `&&`                 | All, any order   
| 3          | <code>&#124;</code>        | Exactly one                                 |
|                           |
| 4          | <code>' '</code>              | Sequence, in order                          |
 5          | `[]`                 | Brackets (optional group, zero or one)      |
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

