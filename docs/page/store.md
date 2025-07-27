# Page Store

The `stores/page/store.ts` file defines the main Zustand store for managing page-level state in the editor. It provides all core logic for handling devices, orientations, pseudo-states, and other global page settings that affect block rendering and style context.

## What is store.ts?

- `store.ts` is a TypeScript module that exports a Zustand hook (commonly `usePageStore`) for accessing and updating the page state.
- The store manages:
  - The current device (e.g., desktop, tablet, mobile).
  - The current orientation (e.g., portrait, landscape).
  - The current pseudo-state (e.g., all, hover, focus).
  - Lists of all available devices and orientations.
  - Other global page settings relevant to the editor.

## What is it used for?

- **Responsive Editing:**  
  Allows switching between devices and orientations to preview and edit styles responsively.
- **Pseudo-State Editing:**  
  Enables editing styles for different pseudo-states (like hover or focus).
- **Context Provider:**  
  Supplies context to block and style editors so they can resolve and render styles correctly for the current device, orientation, and pseudo-state.
- **Global Page State:**  
  Centralizes all page-level settings for consistent access across the editor.

## Main Functions

### setCurrentDevice
Sets the current device context.

- **Parameters:**
  - `device: DeviceName` — The device to set as current.

---

### setCurrentOrientation
Sets the current orientation context.

- **Parameters:**
  - `orientation: OrientationName` — The orientation to set as current.

---

### setCurrentPseudo
Sets the current pseudo-state context.

- **Parameters:**
  - `pseudo: PseudoName` — The pseudo-state to set as current.

---

### getAllDevices
Retrieves the list of all available devices.

- **Returns:** `DeviceName[]`

---

### getAllOrientations
Retrieves the list of all available orientations.

- **Returns:** `OrientationName[]`

---

## Example Usage

```ts
import usePageStore from "@/stores/page/store";

// Set the current device to 'mobile'
usePageStore.getState().setCurrentDevice('mobile');

// Get the current orientation
const orientation = usePageStore.getState().currentOrientation.value;

// Get all devices
const devices = usePageStore.getState().allDevices;
```

---

## Notes

- The store uses [Zustand](https://zustand-demo.pmnd.rs/) for state management.
- All updates are immutable and safe for concurrent access.
- The page store is essential for responsive and stateful editing in the block