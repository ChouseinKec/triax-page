# Blocks Component

The `Blocks` component is responsible for rendering all root blocks in the block editor. It acts as the top-level container for the block tree, displaying each root block (a block without a parent) using the `Block` component.

## What is Blocks?

- `Blocks` is a React functional component that retrieves all blocks from the block manager.
- It filters out root blocks (blocks that do not have a `parentID`) and renders each one as a `Block` component.
- This component is typically used as the main entry point for rendering the block structure in the editor Workbench.

## Props

| Prop   | Type        | Description                        |
|--------|-------------|------------------------------------|
| _none_ |             | The component does not use props.  |

## Usage

```tsx
import Blocks from "@/modules/editors/block/components/blocks/component";

<Blocks />
```

## Example

```tsx
// Renders all root blocks in the editor
<Blocks />
```

## How it Works

- Uses the `useBlockManager` hook to access the `getAllBlocks` function.
- Memoizes the list of all blocks and filters for root blocks (those without a `parentID`).
- Maps over the root blocks and renders each one using the `Block` component, passing the block's ID as a prop.
- The component is memoized with `React.memo` for performance.

