# Block Component

The `Block` component is responsible for rendering a single block instance in the block editor. It uses the block's definition to render its content, manages child blocks recursively, and provides contextual actions such as deleting the block.

## What is Block?

- `Block` is a React functional component that receives a `blockID` prop.
- It retrieves the block instance and its definition, and renders the block using the definition's `render` function.
- If the block type is unknown, it displays an error message.
- The component also registers block-specific actions (like delete) in the bottom LayoutPanel when the block is selected.
- Child blocks are rendered recursively, allowing for nested block structures.

## Props

| Prop      | Type     | Description                        |
|-----------|----------|------------------------------------|
| `blockID` | `string` | The ID of the block to render.     |

## Usage

```tsx
import Block from "@/modules/editors/block/components/block/component";

<Block blockID="block-123" />
```

## Example

```tsx
// Renders a block and all its children recursively
<Block blockID={rootBlockID} />
```

## How it Works

- Uses the `useBlockManager` hook to access block data and actions.
- Retrieves the block instance and its definition from the registry.
- If the block type is unknown, displays a warning.
- Registers a delete action in the bottom LayoutPanel when the block is selected.
- Renders all child blocks recursively by mapping over `block.contentIDs`.
- Uses the definition's `render` function to render the block, passing the block instance and its children.
- The component is memoized with `React.memo` for performance.

