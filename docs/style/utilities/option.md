# utilities/style/option.ts

## Overview
Helpers for generating option data for value editors, including functions, dimensions, keywords, numbers, integers, colors, links, and for building slot-based options tables.

## Main Functions

### createFunctionOption
Creates a function option object for a given function token.
- **Parameters:** `token: string`
- **Returns:** `FunctionOptionData | undefined`

### createDimensionOptions
Creates an array of dimension option objects for a given dimension token.
- **Parameters:** `token: string`
- **Returns:** `DimensionOptionData[] | undefined`

### createKeywordOption
Creates a keyword option for a given token and property name.
- **Parameters:** `token: string, propertyName: string`
- **Returns:** `KeywordOptionData | undefined`

### createNumberOption
Creates a number option for a given number token.
- **Parameters:** `token: string`
- **Returns:** `OtherOptionData | undefined`

### createIntegerOption
Creates an integer option for a given integer token.
- **Parameters:** `token: string`
- **Returns:** `OtherOptionData | undefined`

### createColorOption
Creates a color option for a given color token.
- **Parameters:** `token: string`
- **Returns:** `OtherOptionData | undefined`

### createLinkOption
Creates a link option for a given link token.
- **Parameters:** `token: string`
- **Returns:** `OtherOptionData | undefined`

### createOption
Creates an option (or array of options) for a given token and property name, using the correct factory based on type.
- **Parameters:** `token: string, propertyName: string`
- **Returns:** `InputOptionData | InputOptionData[] | undefined`

### isSlotOptionValid
Checks if a token is a valid option for a given slot, given the current values and all valid variations.
- **Parameters:** `token: string, slotIndex: number, validValueSet: string[], currentTokens: string[], propertyName: string`
- **Returns:** `boolean`

### createOptionsTable
Builds a 2D options table for slot-based value editors. Each slot contains only the valid options for the current context.
- **Parameters:** `syntaxNormalized: string[], syntaxSet: Set<string>[], values: string[], propertyName: string`
- **Returns:** `InputOptionData[][]`
