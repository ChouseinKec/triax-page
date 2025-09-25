# List Component

The `List` component provides a searchable, categorized list of all registered block types in the editor. It allows users to quickly browse, filter, and add new blocks to the layout, either as root blocks or as children of the currently selected block.

## What is List?

- `List` is a React functional component that displays all available block types as buttons.
- Users can search for blocks by type, and the list updates in real time.
- Blocks are grouped by category for easier navigation.
- Clicking a block button adds it to the editor, optionally as a child of the currently selected block.

## Props

| Prop   | Type | Description                  |
|--------|------|------------------------------|
| _none_ |      | This component takes no props.|


## Features

- **Search:** Filter blocks by typing in the search input.
- **Grouping:** Blocks are grouped by their `category` property.
- **Add Block:** Click a block button to add it to the editor.
- **Context Awareness:** If a block is selected, new blocks are nested inside it.

## Usage

```tsx
import List from "@/modules/editors/block/components/blocks-list/component";

<List />
```

## Example

```tsx
<List />
```

## How it Works

- Uses `getRegisteredBlocks()` to retrieve all block definitions.
- Uses `useBlockManager()` to access the `addBlock` and `getSelectedBlock` functions.
- Maintains a `search` state to filter blocks by type.
- Groups filtered blocks by their `category` property using `Object.groupBy`.
- Renders a button for each block type, displaying its icon and name.
- When a block button is clicked, it calls `addBlock`, optionally passing the selected block's ID as the parent.

