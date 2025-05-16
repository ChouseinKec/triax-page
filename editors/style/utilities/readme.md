# Style Utilities

A collection of utility functions for working with CSS styles, values, and validation.

## Value Extraction

### `extractNumber(input)`

Extracts the numeric value from a string if it starts with a number.  
**Examples:**  

- `"10px"` → `"10"`  
- `"-10.5rem"` → `"-10.5"`  
- `"abc123"` → `""` (no leading number)

### `extractLength(input)`

Extracts CSS length units from a string.  
**Examples:**  

- `"10px"` → `"px"`  
- `"20%"` → `"%"`  
- `"max-content"` → `"max-content"`

### `extractValue(input)`

Extracts content from parentheses if the entire string is a function.  
**Examples:**  

- `"repeat(1,10px)"` → `"1,10px"`  
- `"10px"` → `"10px"` (unchanged)

### `extractFunction(input)`

Gets the function name if the string is wrapped in a single function.  
**Examples:**  

- `"var(--test)"` → `"var"`  
- `"10px"` → `""` (no function)

### `extractSeperator(input)`

Detects the top-level separator in multi-value strings.  
**Examples:**  

- `"1px 2px 3px"` → `" "`  
- `"red,green,blue"` → `","`

## Value Manipulation

### `splitExpression(expression)`

Splits math expressions into values and operators.  
**Example:**  
`"10px + 20px"` → `[["10px", "20px"], ["+"]]`

### `splitMultiValue(input, separator)`

Splits strings while ignoring separators inside functions.  
**Example:**  
`"rgb(255,0,0), hsl(120,100%,50%)"` → `["rgb(255,0,0)", "hsl(120,100%,50%)"]`

### `updateMultiValue(input, value, index, separator)`

Updates a value in a multi-value string.  
**Example:**  
`updateMultiValue("1px 2px 3px", "4px", 1)` → `"1px 4px 3px"`

### `deleteMultiValue(input, index, separator)`

Removes a value from a multi-value string.  
**Example:**  
`deleteMultiValue("red,green,blue", 1, ",")` → `"red,blue"`

## Validation

### `isLengthScalable(input)`

Checks if a value is a scalable CSS length.  
**Examples:**  

- `"10px"` → `true`  
- `"px"` → `false` (missing number)

### `isLengthKeyword(input)`

Validates CSS keyword lengths.  
**Examples:**  

- `"auto"` → `true`  
- `"10px"` → `false`

### `isLengthFunction(input)`

Checks for CSS length functions.  
**Examples:**  

- `"min(0px,10px)"` → `true`  
- `"rgb(255,0,0)"` → `false`

### `isFunctionVariable(input)`

Validates CSS variable syntax.  
**Examples:**  

- `"var(--color)"` → `true`  
- `"var( --space )"` → `false` (spaces invalid)

### `isLengthList(input)`

Checks for valid multi-value lists.  
**Examples:**  

- `"1px 2px 3px"` → `true`  
- `"single-value"` → `false`

### `isOptionValid(input, option)`

Validates a value against a style option pattern.  
**Example:**  
`isOptionValid("16/9", { syntax: "[number / number]" })` → `true`

### `isPropertyValid(property)`

Validates camelCase CSS property names.  
**Examples:**  

- `"backgroundColor"` → `true`  
- `"background-color"` → `false`

## Helpers

### `splitSyntax(input)`

Splits CSS syntax strings.  
**Example:**  
`"length|number|color"` → `["length", "number", "color"]`

### `getStyleOptionByValue(value, options)`

Finds a style option matching a value.  
**Example:**  
`getStyleOptionByValue("10px", LENGTH_OPTIONS)` → `{ value: "10px", ... }`

### `getStyleVariables()`

Returns available CSS variables.  
**Returns:**  
`[{ name: "--font-sm", value: "var(--font-sm)" }, ...]`

### `getStyleOptions(property)`

Gets options for a CSS property.  
**Example:**  
`getStyleOptions("width")` → `[ { value: "auto", ... }, ... ]`
