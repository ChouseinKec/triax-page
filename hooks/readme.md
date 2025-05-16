# Hooks Documentation

## Render Hooks

### Device Render Hook

#### `useDeviceRender()`

Hook for managing device selection UI.  
**Returns:**  Object with device rendering utilities.

**Methods:**

#### `renderDeviceSelect()`

Renders a dropdown for device selection.  
**Returns:**  DropdownSelect component with current device preselected.

---

### Orientation Render Hook

#### `useOrientationRender()`

Hook for managing orientation selection UI.  
**Returns:**  Object with orientation rendering utilities.

**Methods:**

#### `renderOrientationSelect()`

Renders a dropdown for orientation selection.  
**Returns:**  DropdownSelect component with current orientation preselected.

---

### Pseudo Selector Hook

#### `usePseudoRender()`

Hook for managing pseudo selector UI.  
**Returns:**  Object with pseudo selector rendering utilities.

**Methods:**

#### `renderPseudoSelect()`

Renders a dropdown for pseudo selector.  
**Returns:**  DropdownSelect component with current pseudo selector preselected.

---

## Debounce Hooks

### `useDebouncedValue(inputValue, delay)`

Debounces a value update.  
**Parameters:**  

- `inputValue`: Value to debounce (string/number)  
- `delay`: Debounce delay in milliseconds  
**Returns:**  Debounced value that updates after specified delay  

**Example:**

```js
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
```

---

### `useDebouncedCallback(callback, delay)`

Debounces a callback function.  
**Parameters:**  

- `callback`: Function to debounce  
- `delay`: Debounce delay in milliseconds  
**Returns:**  Debounced version of the callback  

**Features:**

- Automatic cleanup on unmount
- Cancels pending calls if re-invoked

**Example:**

```js
const handleSearch = useDebouncedCallback((term) => {
  // code here
}, 300);
```
