# Block Store

## `useBlockStore()`

Manages block-level styles and selection state.

**Default Structure:**  

```typescript
[
  {
    id: 'string',
    style: {
      [device]: {
        [orientation]: {
          [pseudo]: {
            /* style properties */
          }
        }
      }
    }
  },
  {...},
  {...},
]
```

**Methods:**

### `setSelected(id)`

Sets the currently active block  
**Parameters:**  

- `id`: String - Block identifier  

### `getSelected()`

Gets current block ID  
**Returns:**  

- `string | null` - Active block ID or null  

### `getBlock(id?)`

Retrieves full block data  
**Parameters:**  

- `id`: Optional string - Block ID (defaults to current selection)  
**Returns:**  
- `BLOCK | null` - Complete block object  

### `setBlockStyles(styles, id?)`

Bulk updates all styles for a block  
**Parameters:**  

- `styles`: STYLE - Complete style object  
- `id`: Optional string - Target block ID  

### `getBlockStyles(id?)`

Retrieves all styles for a block  
**Parameters:**  

- `id`: Optional string - Block ID  
**Returns:**  
- `STYLE | null` - Style object  

### `setBlockStyle(device, orientation, pseudo, property, value, id?)`

Precisely updates a single style property  
**Parameters:**  

- `device`: String - Target device  
- `orientation`: String - Screen orientation  
- `pseudo`: String - Pseudo-class  
- `property`: String - CSS property  
- `value`: String - New value  
- `id`: Optional string - Block ID  
