# Page Factory Hook

The `hooks/page/factory.tsx` file provides a custom React hook for rendering page-level UI components, such as device selectors, in the editor. It centralizes logic for generating dropdowns and other controls that interact with the page context.

## What is factory.tsx?

- `factory.tsx` exports the `usePageFactory` hook, which returns an object with factory methods for rendering page-related UI components.
- The hook integrates with the page store to provide context-aware controls, such as device selection.

## What is it used for?

- **Device Selection:**  
  Renders a dropdown for selecting the current device (desktop, tablet, mobile, etc.), allowing users to preview and edit the page responsively.
- **UI Abstraction:**  
  Provides a unified interface for rendering page-level controls, reducing boilerplate in page panels and editors.

## Main Methods

### renderDeviceSelect

Renders a searchable, groupable dropdown for selecting the current device.

- **Returns:** `ReactNode` — The rendered device select dropdown.
- **Behavior:**  
  - Uses the current device and all available devices from the page store.
  - Displays a device icon as the placeholder.
  - Updates the current device in the store when a new device is selected.

---

## Example Usage

```tsx
import { usePageFactory } from "@/hooks/page/factory";

const { renderDeviceSelect } = usePageFactory();

// Render the device selector in your component
<div>
  {renderDeviceSelect()}
</div>
```

---

## Notes

- The hook uses the Zustand-based page store for state management.
- The dropdown is implemented with the `DropdownSelect` component and supports searching and grouping.
- Use this hook in page panels or layout editors to keep UI logic consistent