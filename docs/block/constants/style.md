# Block Style Defaults

The `constants/block/style.ts` file provides default CSS style values for blocks in the editor. These defaults are used to initialize new blocks with a consistent appearance and ensure a visually coherent layout before any user customization.

## What is style.ts?

- `style.ts` is a TypeScript module that exports:
  - **`BlockStyleDefaults`**: An object mapping pseudo-state names (such as `'all'`, `'hover'`, etc.) to partial style property/value maps. Each property key is a valid CSS property, and each value is a string representing the default value for that property.

## What is it used for?

- **Block Initialization:**
  - Sets the initial style for new blocks, ensuring they have padding, borders, and background color by default.
- **Consistent Appearance:**
  - Provides a baseline look for all blocks, making the editor visually consistent and user-friendly.
- **Pseudo-State Support:**
  - Allows for different default styles based on pseudo-states (e.g., `all`, `hover`), enabling richer block interactions.

## Example Structure

```ts
export const BlockStyleDefaults = {
  all: {
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '10px',
    'padding-right': '10px',
    'margin-top': '10px',
    'margin-bottom': '10px',
    'background-color': 'rgba(111, 155, 191, 0.3)',
    'border-top-style': 'solid',
    'border-bottom-style': 'solid',
    'border-left-style': 'solid',
    'border-right-style': 'solid',
    'border-top-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
    'border-right-width': '1px',
    'border-top-color': '#ffffff',
    'border-bottom-color': '#ffffff',
    'border-left-color': '#ffffff',
    'border-right-color': '#ffffff',
    'font-size': '10px',
  },
  // Additional pseudo-states (e.g., hover) can be added as needed
};
```

## Notes

- Only a subset of CSS properties are included by default; you can extend this object to include more properties or pseudo-states as needed.
- Commented-out properties indicate optional or alternative defaults that can be enabled