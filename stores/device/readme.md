# Device Store

## `useDeviceStore()`

Manages responsive device states with media queries.

**Methods:**

### `getDevices()`

Returns all available devices sorted by media query width.  
**Default Devices:**  

- default (0px)  
- mobile (≤767px)  
- tablet (768-1024px)  
- desktop (≥1200px)  

### `getDevice()`

Returns currently selected device.

### `setDevice(value)`

Sets current device.  
**Throws:** Error if invalid device provided.
