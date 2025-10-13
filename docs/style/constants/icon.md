# CSS Icon Constants

The `constants/style/icon.tsx` file provides a mapping of CSS property and value names to React SVG icon components. These icons are used throughout the UI to visually represent CSS properties, values, and options in editors, dropdowns, and tooltips.

## What is icon.tsx?

- `icon.tsx` is a TypeScript/React module that exports:
  - **`STYLE_ICON_DEFINITIONS`**: An object mapping string keys (such as `'flex-direction-row'`, `'align-items-center'`, `'display-flex'`, etc.) to React SVG elements.
  - **`CSSIcons`**: A type representing all valid icon keys.

## What is it used for?

- **UI Representation:**
  - Provides visual cues for CSS properties and values in editors, property LayoutPanels, and dropdowns.
- **Accessibility:**
  - Helps users quickly identify and select CSS options by icon.
- **Consistency:**
  - Ensures a consistent look and feel for CSS-related controls across the application.

## Example Structure

```tsx
export const STYLE_ICON_DEFINITIONS = {
  'flex-direction-row': (
    <svg ...>...</svg>
  ),
  'align-items-center': (
    <svg ...>...</svg>
  ),
  'display-flex': (
    <svg ...>...</svg>
  ),
  // ...many more icons
};

export type CSSIcons = keyof typeof STYLE_ICON_DEFINITIONS;
```

## Example Usage

```tsx
import { STYLE_ICON_DEFINITIONS } from '@/constants/style/icon';

function PropertyIcon({ iconKey }: { iconKey: string }) {
  return STYLE_ICON_DEFINITIONS[iconKey] ?? null;
}

// Usage in a component
<PropertyIcon iconKey="flex-direction-row" />
```

## Notes

- Each icon key is a string that typically combines the CSS property and value (e.g., `'flex-direction-row-reverse'`, `'align-items-flex-end'`).
- The icons are SVG elements designed for 24x24 or 32x32 viewboxes, styled for clarity and consistency.
- Not all possible CSS values have icons; only commonly used or visually