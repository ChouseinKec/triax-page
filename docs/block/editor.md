# Block Editor

The block editor is a modular, context-aware system for visually building, managing, and editing block-based layouts. It provides a drag-and-drop interface for composing blocks, supports nested structures, and integrates with style and property editors for a complete visual editing experience.

## Table of Contents

| Section             | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| [Overview](#overview)         | High-level summary of the block editor's purpose and features      |
| [Block List](#block-library)     | Browsing, searching, and adding new blocks                        |
| [Blocks](#blocks)             | Rendering and managing the block tree structure                  |
| [Block](#block)               | Rendering individual blocks and handling block actions           |
| [LayoutPanels & Context](#LayoutPanels--context) | Integration with side LayoutPanels and context management         |

---

## Overview

The block editor enables users to visually compose layouts using a system of reusable, nestable blocks. Each block represents a UI component or layout element, and blocks can be added, removed, selected, and rearranged. The editor integrates with style and inspector LayoutPanels, allowing for rich editing of both structure and appearance.

- **Block List:** Browse and search all available block types, grouped by category, and add them to the layout.
- **Blocks:** Render and manage the tree of blocks, supporting nesting and drag-and-drop.
- **Block:** Render individual block instances, handle selection, deletion, and custom actions.
- **LayoutPanels:** Register block list and style editor LayoutPanels for quick access and editing.

---

## Block List

The Block List component displays all registered block types as buttons, grouped by category. Users can search for blocks and add them to the layout by clicking a button. If a block is selected, new blocks can be nested inside it.

- **Search:** Filter blocks by type using a search input.
- **Grouping:** Blocks are grouped by category for easier navigation.
- **Add Block:** Clicking a block button adds it to the layout, optionally as a child of the selected block.

**See also:**  
- `editors/block/components/blocks-list/component.tsx`

---

## Blocks

The Blocks component renders all root blocks in the editor. It uses context to manage block actions and state, and recursively renders nested blocks using the Block component.

- **Root Blocks:** Only blocks without a parent are rendered at the top level.
- **Nesting:** Child blocks are rendered recursively within their parent block.
- **Context:** Uses the block manager context for state and actions.

**See also:**  
- `editors/block/components/blocks/component.tsx`

---

## Block

The Block component renders a single block instance, using its definition's render function. It handles selection, deletion, and error handling for unknown block types. Child blocks are rendered recursively.

- **Render Function:** Each block type defines its own render logic.
- **Actions:** Provides UI for block actions (e.g., delete).
- **Selection:** Integrates with selection and LayoutPanel context for editing.
- **Error Handling:** Displays a warning if the block type is unknown.

**See also:**  
- `editors/block/components/block/component.tsx`

---

## LayoutPanels & Context

The block editor registers its LayoutPanels (block list, style editor) with the layout context, allowing for flexible UI arrangement. LayoutPanels can be shown, hidden, or reordered as needed.

- **BlocksLayoutPanel:** Registers the block list for quick block insertion.
- **InspectorLayoutPanel:** Registers the style editor for editing block styles.
- **Context Integration:** Uses context providers to manage LayoutPanel state and actions.

**See also:**  
- `editors/block/component.tsx`

---

## Example Usage

```tsx
import BlockEditor from "@/modules/editors/block/component";

export default function Page() {
  return <BlockEditor />;
}
```

---

