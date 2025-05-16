
# Style Store

## `useStyleStore()`

Central store for managing all style properties with device/orientation/pseudo awareness.

**Methods:**

### `setStyle(property, value)`

Sets a style property for current device/orientation/pseudo combination.  
**Parameters:**  

- `property`: Style property key  
- `value`: Value to set  

### `getStyle(property)`

Gets a style property with cascading fallback logic.  
**Fallback Order:**

- (1) Exact device/orientation/pseudo match
- (2) Same device/orientation with default pseudo
- (3) Same device with default orientation
- (4) Default device with current orientation
- (5) Default device/orientation  
- (6) Global default
- (7) Fallback to empty string
