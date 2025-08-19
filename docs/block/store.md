# Block Store

The `stores/block/store.ts` file defines the main Zustand store for managing block editor state. It provides all core logic for creating, updating, selecting, and deleting blocks, as well as managing their styles and attributes.

## What is store.ts?

- `store.ts` is a TypeScript module that exports a Zustand hook (`useBlockStore`) for accessing and updating the block editor state.
- The store manages:
  - All block instances and their hierarchical relationships.
  - Block styles, attributes, and content.
  - Selection and editing state.

## What is it used for?

- **State Management:**  
  Centralizes all block-related state, making it accessible throughout the editor.
- **Block Operations:**  
  Provides functions to add, delete, update, and retrieve blocks.
- **Style & Attribute Updates:**  
  Allows granular updates to block styles and attributes, supporting device, orientation, and pseudo-state variations.
- **Selection:**  
  Tracks which block is currently selected for editing.

## Main Functions

### selectBlock
Sets the currently selected block by ID.

- **Parameters:**
  - `blockID: string` — The ID of the block to select.

---

### addBlock
Adds a new block to the editor, optionally as a child of another block.

- **Parameters:**
  - `type: BlockType` — The type of block to add.
  - `parentID?: string` — Optional parent block ID.
- **Returns:** The newly created block instance.

---

### deleteBlock
Deletes a block and all its children from the editor.

- **Parameters:**
  - `blockID: string` — The ID of the block to delete.

---

### getBlock
Retrieves the block data for a given block ID.

- **Parameters:**
  - `blockID: string` — The ID of the block to retrieve.
- **Returns:** The block data if found, otherwise `undefined`.

---

### setBlockStyles
Updates the entire style object for a specific block.

- **Parameters:**
  - `blockID: string` — The ID of the block to update.
  - `styles: BlockStyleDefinition` — The new style object.

---

### setBlockStyle
Sets a specific style property for a specific block, device, orientation, and pseudo-state.

- **Parameters:**
  - `blockID: string` — The ID of the block to update.
  - `device: string` — Device type (e.g., 'desktop', 'mobile').
  - `orientation: string` — Orientation (e.g., 'portrait', 'landscape').
  - `pseudo: string` — Pseudo-class (e.g., 'all', 'hover').
  - `property: string` — CSS property name.
  - `value: string` — CSS property value.

---

### setBlockAttribute
Sets a specific attribute for a specific block.

- **Parameters:**
  - `blockID: string` — The ID of the block to update.
  - `attribute: string` — Attribute name.
  - `value: any` — Attribute value.

---

## Example Usage

```ts
import useBlockStore from "@/stores/block/store";

// Add a new block
useBlockStore.getState().addBlock("container");

// Select a block
useBlockStore.getState().selectBlock("block-id");

// Update a block's style
useBlockStore.getState().setBlockStyle("block-id", "desktop", "portrait", "all", "background-color", "#fff");
```

---

## Notes

- The store uses [Zustand](https://zustand-demo.pmnd.rs/) for state management.
- Block styles are deeply nested to support device, orientation, and pseudo-state variations.
- All block operations are immutable and safe for concurrent