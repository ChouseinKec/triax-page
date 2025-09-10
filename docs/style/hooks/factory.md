# Style Factory Hook

The `hooks/style/factory.tsx` file provides a custom React hook for rendering style-related UI components in the editor. It centralizes logic for rendering value editors and position selectors for CSS properties, making it easy to build consistent, context-aware style editing interfaces.

## What is factory.tsx?

- `factory.tsx` exports the `useStyleFactory` hook, which returns an object with factory methods for rendering style-related components.
- The hook integrates with the style manager and property definitions to provide context-aware editors for CSS property values.

## What is it used for?

- **Value Editing:**  
  Renders a `Value` component for editing a specific CSS property, handling value changes and validation.
- **Position Selection:**  
  Renders a `PositionSelect` component for selecting sides or corners (e.g., for padding, margin, border-radius).
- **Abstraction:**  
  Provides a unified interface for rendering style editors, reducing boilerplate in style panels and property editors.

# Style Factory Hook

The `hooks/style/factory.tsx` file provides a custom React hook for rendering style-related UI components in the editor. It centralizes logic for rendering value editors and position selectors for CSS properties, making it easy to build consistent, context-aware style editing interfaces.

## What is factory.tsx?

- `factory.tsx` exports the `useStyleFactory` hook, which returns an object with factory methods for rendering style-related components.
- The hook integrates with the style manager and property definitions to provide context-aware editors for CSS property values.

## What is it used for?

- **Value Editing:**  
  Renders a `Value` component for editing a specific CSS property, handling value changes and validation.
- **Position Selection:**  
  Renders a `PositionSelect` component for selecting sides or corners (e.g., for padding, margin, border-radius).
- **Abstraction:**  
  Provides a unified interface for rendering style editors, reducing boilerplate in style panels and property editors.

## Main Methods

### renderPositionSelect

Renders a `PositionSelect` component for selecting sides or corners.

- **Parameters:**  
  - `setCurrentSide: (side: Side) => void` — Callback for side selection.
  - `setCurrentCorner: (corner: Corner) => void` — Callback for corner selection.
  - `isCornerSelectable: boolean` — Whether corners are selectable.
  - `isCenterSelectable: boolean` — Whether the center is selectable.
- **Returns:** `ReactElement` — The rendered `PositionSelect` component.

---

## Example Usage

```tsx
import { useStyleFactory } from "@/hooks/style/factory";
import { useSelectedBlockID } from "@/hooks/block/manager";
import Value from "@/editors/block/components/style/value/component";

const { renderPositionSelect } = useStyleFactory();
const selectedBlockID = useSelectedBlockID();

// Render a value editor for 'padding-top' using the new pattern
const PaddingTopEditor = selectedBlockID ? (
  <Value blockID={selectedBlockID} propertyName="padding-top" />
) : null;

// Render a position selector
const PositionSelector = renderPositionSelect(
  setCurrentSide,
  setCurrentCorner,
  true,   // isCornerSelectable
  false   // isCenterSelectable
);
```

---

## Notes

- The hook uses the style manager for getting and setting property values.
- Property definitions are sourced from `StyleDefinitions`.
- Use this hook in style panels or property editors to keep UI---

## Notes

- The hook uses the style manager for getting and setting property values.
- Property definitions are sourced from `StyleDefinitions`.
- Use this hook in style panels or property editors to keep UI