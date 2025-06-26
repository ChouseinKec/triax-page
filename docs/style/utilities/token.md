# utilities/style/token.ts

## Overview
Helpers for working with CSS tokens, including type checks, canonicalization, and conversion between tokens and values.

## Main Functions

### isTokenKeyword
Checks if the input is a valid CSS keyword token.
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenDimension
Checks if the input is a valid CSS dimension token.
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenInteger
Checks if the input is a valid CSS data integer (e.g., '<integer>').
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenNumber
Checks if the input is a valid CSS data number (e.g., '<number>').
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenFunction
Checks if the input is a valid CSS data function (e.g., 'fit-content(10px)').
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenColor
Checks if the input is a valid CSS data color (e.g., '<color>').
- **Parameters:** `input: string`
- **Returns:** `boolean`

### isTokenLink
Checks if the input is a valid CSS data link (e.g., '<link>').
- **Parameters:** `input: string`
- **Returns:** `boolean`

### getTokenType
Determines the group of a CSS data token based on its format.
- **Parameters:** `input: string`
- **Returns:** `CSSTokenGroups | undefined`

### getTokenCanonical
Extracts the canonical type string from a CSS data type string.
- **Parameters:** `input: string`
- **Returns:** `string | undefined`

### getTokenBase
Extracts the base token from a CSS data type string, removing any range or step part.
- **Parameters:** `input: string`
- **Returns:** `string | undefined`

### getTokenRange
Extracts the range part from a CSS data type string, if present.
- **Parameters:** `input: string`
- **Returns:** `string | undefined`

### getTokenParam
Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
- **Parameters:** `input: string`
- **Returns:** `Record<string, any> | undefined`

### getTokenValue
Converts a single token to its default value.
- **Parameters:** `token: string`
- **Returns:** `string`

### getTokenValues
Converts all tokens in a syntax string to their default values.
- **Parameters:** `syntax: string`
- **Returns:** `string`
