# Block Manager Hook

The `hooks/block/manager.tsx` file provides the main React hook for block management in the editor. It centralizes all actions and selectors for working with blocks, including adding, deleting, selecting, and retrieving blocks, as well as managing block styles, attributes, and rendering CSS.

## What is manager.tsx?

- `manager.tsx` exports the `useBlockManager` hook, which returns a unified interface (`BlockManager`) for all block-related operations.
- The hook combines state and actions from the block store and page store, and provides utility methods for working with blocks in a context-aware way.

## What is it used for?

- **Block Actions:**  
  Add, delete, and select blocks in the editor.
- **Selectors:**  
  Retrieve all blocks, a single block, the selected block, block styles, tags, children, and attributes.
- **Style Rendering:**  
  Resolve and generate CSS for a block based on the current device, orientation, and pseudo-state.
- **Attribute Management:**  
  Set and get custom attributes on block instances.
- **Context Awareness:**  
  All selectors and style rendering are aware of the current device, orientation, and pseudo-state.

## Main Functions

### addBlock
Adds a new block to the editor, optionally as a child of another block.

- **Parameters:**
  - `type: BlockType` — The type of block to add.
  - `parentID?: string` — Optional parent block ID.

---

### deleteBlock
Deletes a block by its ID.

- **Parameters:**
  - `blockID: string` — The ID of the block to delete.

---

### selectBlock
Sets the currently selected block by ID.

- **Parameters:**
  - `blockID: string | null` — The ID of the block to select, or `null` to clear selection.

---

### getAllBlocks
Retrieves all blocks as an object keyed by block ID.

- **Returns:** `Record<string, BlockInstance>`

---

### getBlock
Retrieves a block by its ID.

- **Parameters:**
  - `blockID: string` — The ID of the block to retrieve.
- **Returns:** `BlockInstance | null`

---

### getSelectedBlock
Retrieves the currently selected block.

- **Returns:** `BlockInstance | null`

---

### getBlockStyles
Retrieves the style data for a block.

- **Parameters:**
  - `blockID: string` — The ID of the block.
- **Returns:** `BlockStyleData | null`

---

### getBlockTag
Retrieves the tag of a block.

- **Parameters:**
  - `blockID: string` — The ID of the block.
- **Returns:** `BlockTag | undefined`

---

### getBlockContentIDs
Retrieves the child block IDs for a block.

- **Parameters:**
  - `blockID: string` — The ID of the block.
- **Returns:** `string[] | undefined`

---

### hasBlockSelectedContent
Checks if the currently selected block is a descendant of the given block.

- **Parameters:**
  - `blockID: string` — The ID of the block to check.
- **Returns:** `boolean`

---

### renderBlockStyles
Resolves and generates the CSS rule for a block based on the current device, orientation, and pseudo-state.

- **Parameters:**
  - `blockID: string` — The ID of the block.
- **Returns:** `string | undefined` — The generated CSS rule.

---

### setBlockAttribute
Sets a custom attribute on a block.

- **Parameters:**
  - `blockID: string` — The ID of the block.
  - `attribute: string` — The attribute name.
  - `value: BlockAttributeValue` — The value to set.

---

### getBlockAttribute
Retrieves a custom attribute from a block.

- **Parameters:**
  - `blockID: string` — The ID of the block.
  - `attribute: string` — The attribute name.
- **Returns:** `BlockAttributeValue | undefined`

---

## Example Usage

```tsx
import { useBlockManager } from "@/hooks/block/manager";

const {
  addBlock,
  deleteBlock,
  selectBlock,
  getAllBlocks,
  getBlock,
  getSelectedBlock,
  getBlockStyles,
  renderBlockStyles,
  setBlockAttribute,
  getBlockAttribute,
} = useBlockManager();
```

---

## Notes

- The hook is context-aware and integrates with both the block and page stores.
- All actions and selectors are memoized for performance.
- Use this hook in any component that needs to interact with blocks