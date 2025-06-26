# utilities/style/parse.ts

## Overview
Main parser for CSS value definition syntax. Handles token expansion, normalization, parsing of combinators (||, &&, |, comma, space), bracketed groups, and multipliers (?, +, *, {m,n}).

## Main Functions

### expandTokens
Recursively expands all <token> references in a CSS syntax string.
- **Parameters:** `syntax: string, seen?: Set<string>`
- **Returns:** `string`

### normalizeSyntax
Normalizes a CSS value definition syntax string for consistent parsing.
- **Parameters:** `input: string`
- **Returns:** `string`

### parse
Main parser for CSS Value Definition Syntax. Recursively parses the syntax string, handling combinators, brackets, and multipliers in precedence order.
- **Parameters:** `syntax: string`
- **Returns:** `string[]` (all possible value combinations)
- **Example:** `parse('a || b && c') // ['a', 'b c', 'c b', 'a b c', ...]`

### Brackets

#### hasBrackets
Checks if the input starts and ends with brackets.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### hasBracketsGroup
Checks if the input is a bracketed group with a multiplier.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### parseBrackets
Parses an optional group in brackets and returns all possible combinations.
- **Parameters:** `input: string`
- **Returns:** `string[]`

### Combinators

#### hasDoubleBar
Checks for a double bar (||) combinator at the top level.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### hasDoubleAmp
Checks for a double ampersand (&&) combinator at the top level.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### hasSingleBar
Checks for a single bar (|) combinator at the top level.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### hasComma
Checks for a comma separator at the top level.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### hasSequence
Checks if the input contains a sequence combinator (space, comma, or slash) at the top level.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### parseComma
Parses a comma-separated list at the top level. Recursively parses each part and generates the cross product of all possible combinations, then joins each combination with a comma.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseComma('a,b+') // ['a,b', 'a,b b', 'a,b b b']`

#### parseDoubleBar
Parses a double bar (`||`) combinator. Generates all non-empty subsets and their permutations, then recursively parses each part and returns all possible combinations.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseDoubleBar('a || b c') // ['a b c', 'a c b', 'b c a', 'c b a']`

#### parseDoubleAmp
Parses a double ampersand (`&&`) combinator. Generates all permutations, then recursively parses each part and returns all possible combinations.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseDoubleAmp('a && b c') // ['a b c', 'a c b', 'b c a', 'c b a']`

#### parseSingleBar
Parses a single bar (`|`) combinator. Recursively parses each part and returns all possible combinations.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseSingleBar('a | b c') // ['a b c', 'a c b', 'b c a', 'c b a']`

#### parseSequence
Parses a sequence separated by space, comma, or slash. Recursively parses each part and generates the cross product of all possible combinations, then joins each combination with the original separator.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseSequence('a b+') // ['a', 'a b', 'a b b']`

### Multipliers

#### duplicateToken
Duplicates a token up to `maxDepth` times, joining with spaces (for + and * multipliers).
- **Parameters:** `input: string, maxDepth: number`
- **Returns:** `string[]`
- **Example:** `duplicateToken('a', 3) // ['a', 'a a', 'a a a']`

#### hasMultiplier
Checks if the input ends with a multiplier.
- **Parameters:** `input: string`
- **Returns:** `boolean`

#### parseMultiplierQuestion
Handles the ? multiplier (zero or one occurrence).
- **Parameters:** `input: string`
- **Returns:** `string[]`

#### parseMultiplierPlus
Handles the + multiplier (one or more occurrences).
- **Parameters:** `input: string, maxDepth?: number`
- **Returns:** `string[]`

#### parseMultiplierStar
Handles the * multiplier (zero or more occurrences). Returns all possible combinations for zero or more occurrences, including an empty string.
- **Parameters:** `input: string, maxDepth?: number`
- **Returns:** `string[]`
- **Example:** `parseMultiplierStar('a*', 3) // ['', 'a', 'a a', 'a a a']`

#### parseMultiplier
Parses a multiplier (?, +, *, {m,n}) and returns all possible combinations. Handles different multiplier types and returns an array of strings.
- **Parameters:** `input: string`
- **Returns:** `string[]`
- **Example:** `parseMultiplier('a?') // ['', 'a']`

#### parseMultiplierWithGroup
Parses a bracketed group with a multiplier (e.g., [a b]+) and returns all possible combinations. Handles group extraction, recursive parsing, and multiplier logic internally.
- **Parameters:** `syntax: string`
- **Returns:** `string[]`
- **Example:** `parseMultiplierWithGroup('[a b]+') // ['a b', 'a b a b', 'a b a b a b']`
