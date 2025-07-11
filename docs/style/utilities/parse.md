# utilities/style/parse.ts

## Overview
Main parser for CSS value definition syntax. Handles token expansion, normalization, parsing of combinators (||, &&, |, comma, space), bracketed groups, and multipliers (?, +, *, {m,n}).

## Main Functions

### expandTokens
Recursively expands all <token> references in a CSS syntax string using StyleTokenDefinitions.
- **Parameters:**
  - `syntax: string` — The CSS property syntax string (e.g. `'auto |<ratio>'`)
  - `seen?: Set<string>` — (internal) Set of already expanded tokens to prevent infinite recursion
- **Returns:** `string` — The syntax string with all known tokens recursively expanded
- **Example:**
  - `parse('auto || <ratio>') → 'auto || <number> / <number>'`

---

### normalizeSyntax
Normalizes a CSS syntax string by adjusting spaces
- **Parameters:**
  - `syntax: string` — The syntax string
- **Returns:** `string` — The normalized syntax string
- **Example:**
  - `parse('a || b && c') → 'a || b&&c'`

---

### parse
Main parser for CSS Value Definition Syntax. Recursively parses the syntax string, handling combinators in precedence order.
- **Parameters:**
  - `syntax: string` — The syntax string
- **Returns:** `string[]` — All possible combinations as strings
- **Example:**
  - `parse('a || b && c') → ['a', 'b c', 'c b', 'a b c', 'a c b', 'b c a', 'c b a']`

---

## Brackets

### hasBrackets
Checks if the input starts and ends with brackets ([a b]).
- **Parameters:**
  - `input: string` — The input string to check for brackets.
- **Returns:** `boolean` — Returns true if the input is a bracketed group, false otherwise.
- **Example:**
  - `hasBrackets('[a b]') → true`

---

### hasBracketsMultiplier
Checks if the input is a bracketed group with a multiplier ([a b]+).
- **Parameters:**
  - `input: string` — The input string to check for a bracketed group with a multiplier.
- **Returns:** `boolean` — Returns true if the input is a bracketed group with a multiplier, false otherwise.
- **Example:**
  - `hasBracketsMultiplier('[a b]+') → true`

---

### parseBrackets (Internal)
Parses an optional group in brackets.
- **Parameters:**
  - `input: string` — The syntax string (e.g. '[a b]')
- **Returns:** `string[]` — All possible combinations (with and without the group)
- **Example:**
  - `parseBrackets('[a b]') → ['', 'a b']`

---

### parseBracketsMultiplier (Internal)
Parses a bracketed group with a multiplier (e.g., [a b]+) and returns all possible combinations. Handles group extraction, recursive parsing, and multiplier logic internally.
- **Parameters:**
  - `input: string` — The syntax string to parse, expected to be in the format [group]multiplier (e.g., [a b]+).
- **Returns:** `string[]` — Returns an array of strings with all possible combinations based on the group and multiplier.
- **Example:**
  - `parseBracketsMultiplier('[a b]+') → ['a b', 'a b a b', 'a b a b a b']`

---

## Combinators

### hasDoubleBar
Checks if the input contains a double bar (||) combinator at the top level.
- **Parameters:**
  - `input: string` — The input string to check for double bar combinators.
- **Returns:** `boolean` — Returns true if the input contains a double bar combinator, false otherwise.
- **Example:**
  - `hasDoubleBar('a || b') → true`

---

### hasDoubleAmp
Checks if the input contains a double ampersand (&&) combinator at the top level.
- **Parameters:**
  - `input: string` — The input string to check for double ampersand combinators.
- **Returns:** `boolean` — Returns true if the input contains a double ampersand combinator, false otherwise.
- **Example:**
  - `hasDoubleAmp('a && b') → true`

---

### hasSingleBar
Checks if the input contains a single bar (|) combinator at the top level.
- **Parameters:**
  - `input: string` — The input string to check for single bar combinators.
- **Returns:** `boolean` — Returns true if the input contains a single bar combinator, false otherwise.
- **Example:**
  - `hasSingleBar('a | b') → true`

---

### hasComma
Checks if the input contains a top-level comma (,) separator.
- **Parameters:**
  - `input: string` — The input string to check for comma separators.
- **Returns:** `boolean` — Returns true if the input contains a comma separator, false otherwise.
- **Example:**
  - `hasComma('a, b') → true`

---

### hasSequence
Checks if the input contains a sequence combinator (space) at the top level.
- **Parameters:**
  - `input: string` — The input string to check for sequence combinators.
- **Returns:** `boolean` — Returns true if the input contains a sequence combinator, false otherwise.
- **Example:**
  - `hasSequence('a b') → true`

---

### parseComma (Internal)
Parses a comma-separated list at the top level. Recursively parses each part and generates the cross product of all possible combinations, then joins each combination with a comma.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns all possible combinations as strings.
- **Example:**
  - `parseComma('a,b+') → ['a,b', 'a,b b', 'a,b b b']`

---

### parseDoubleBar (Internal)
Parses a double bar (||) combinator. Generates all non-empty subsets and their permutations, then recursively parses each part and returns all possible combinations.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns an array of all possible combinations as strings.
- **Example:**
  - `parseDoubleBar('a || b c') → ['a b c', 'a c b', 'b c a', 'c b a']`

---

### parseDoubleAmp (Internal)
Parses a double ampersand (&&) combinator. Generates all permutations, then recursively parses each part and returns all possible combinations.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns an array of all possible combinations as strings.
- **Example:**
  - `parseDoubleAmp('a && b c') → ['a b c', 'a c b', 'b c a', 'c b a']`

---

### parseSingleBar (Internal)
Parses a single bar (|) combinator. Recursively parses each part and returns all possible combinations.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns an array of all possible combinations as strings.
- **Example:**
  - `parseSingleBar('a | b c') → ['a b c', 'a c b', 'b c a', 'c b a']`

---

### parseSequence (Internal)
Parses a sequence separated by space. Recursively parses each part and generates the cross product of all possible combinations, then joins each combination with the original separator.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns all possible combinations as strings.
- **Example:**
  - `parseSequence('a b+') → ['a', 'a b', 'a b b']`

---

## Multipliers

### duplicateToken (Internal)
Duplicates a token up to maxDepth times, joining with spaces (for + and * multipliers).
- **Parameters:**
  - `input: string` — The input string to duplicate.
  - `maxDepth: number` — The maximum depth to duplicate the token.
- **Returns:** `string[]` — Returns an array of strings with the token duplicated up to maxDepth
- **Example:**
  - `duplicateToken('a', 3) → ['a', 'a a', 'a a a']`

---

### hasMultiplier
Checks if the input ends with a multiplier (?, +, *, {m,n}).
- **Parameters:**
  - `input: string` — The input string to check for a multiplier.
- **Returns:** `boolean` — Returns true if the input has a multiplier, false otherwise.
- **Example:**
  - `hasMultiplier('a?') → true`

---

### parseMultiplierQuestion (Internal)
Returns ['', input] for the ? multiplier (zero or one occurrence).
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns an array with an empty string and the input.
- **Example:**
  - `parseMultiplierQuestion('a?') → ['', 'a']`

---

### parseMultiplierPlus (Internal)
Handles the + multiplier (one or more occurrences).
- **Parameters:**
  - `input: string` — The input string to parse.
  - `maxDepth?: number` — The maximum depth to duplicate the token.
- **Returns:** `string[]` — Returns an array of strings with the token duplicated up to maxDepth times.
- **Example:**
  - `parseMultiplierPlus('a+', 3) → ['a', 'a a', 'a a a']`

---

### parseMultiplierStar (Internal)
Handles the * multiplier (zero or more occurrences). Returns all possible combinations for zero or more occurrences, including an empty string.
- **Parameters:**
  - `input: string` — The input string to parse.
  - `maxDepth?: number` — The maximum depth to duplicate the token.
- **Returns:** `string[]` — Returns an array of strings with the token duplicated up to maxDepth times, including an empty string.
- **Example:**
  - `parseMultiplierStar('a*', 3) → ['', 'a', 'a a', 'a a a']`

---

### parseMultiplier
Parses a multiplier (?, +, *, {m,n}) and returns all possible combinations. Handles different multiplier types and returns an array of strings.
- **Parameters:**
  - `input: string` — The input string to parse.
- **Returns:** `string[]` — Returns an array of strings with all possible combinations based on the multiplier.
- **Example:**
  - `parseMultiplier('a?') → ['', 'a']`
