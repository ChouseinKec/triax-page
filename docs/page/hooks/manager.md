# Page Manager Hook

The `hooks/page/manager.ts` file provides a React hook for managing device-related state and actions at the page level in the editor. It centralizes logic for retrieving and updating the current device, as well as accessing the list of all available devices.

## What is manager.ts?

- `manager.ts` exports the `usePageManager` hook, which returns an object with methods for device management.
- The hook integrates with the page store to provide a simple interface for getting and setting the current device, and for retrieving all devices.

## What is it used for?

- **DeviceDefinition Selection:**  
  Allows components to get or set the current device context (e.g., desktop, tablet, mobile).
- **DeviceDefinition List:**  
  Provides access to the full list of devices supported by the editor.
- **Context Provider:**  
  Supplies device context to page and style editors for responsive editing and preview.

## Main Methods

### getSelectedDevice

Returns the current device object.

- **Returns:** `DeviceDefinition` — The currently selected device.

---

### setSelectedDeviceID

Sets the current device.

- **Parameters:**
  - `device: DeviceName` — The device name to set as current.

---

### getAllDevices

Returns the list of all available device objects.

- **Returns:** `DeviceDefinition[]` — Array of all devices.

---

## Example Usage

```tsx
import { usePageManager } from "@/hooks/page/manager";

const { getSelectedDevice, setSelectedDeviceID, getAllDevices } = usePageManager();

// Get the current device
const device = getSelectedDevice();

// Set the current device to 'mobile'
setSelectedDeviceID('mobile');

// Get all available devices
const devices = getAllDevices();
```

---

## Notes

- The hook uses [Zustand](https://zustand-demo.pmnd.rs/) for state management via the page store.
- All methods are memoized with `useCallback` for performance.
- Use this hook in any component that needs to interact with device context at the page level.