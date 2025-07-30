# Group Component

The `Group` component is responsible for rendering a grid layout of style property editors within a style editor group. Each property is rendered as a separate component, and the group can be optionally expandable, hidden, or display a divider title.

## What is Group?

- `Group` is a React functional component that receives a set of properties and layout options, and renders them in a grid.
- It supports expand/collapse functionality, custom styles, and optional horizontal dividers with titles.
- Used to organize related style properties into logical groups within a category.

## Props

| Prop           | Type           | Default      | Description                                                      |
|----------------|----------------|--------------|------------------------------------------------------------------|
| `properties`   | `LayoutProps[]`| `[]`         | The properties to render in the group.                           |
| `hidden`       | `boolean`      | `false`      | If `true`, the group is not rendered.                            |
| `isExpandable` | `boolean`      | `false`      | If `true`, the group can be expanded/collapsed.                  |
| `dividerTitle` | `string`       | `undefined`  | Optional title for a horizontal divider above the group.         |
| `styles`       | `object`       | `{}`         | Custom styles for the group container and expandable content.     |

## Usage

```tsx
import Group from "@/editors/style/components/group/component";

<Group
  properties={[
    { property: "padding-top" },
    { property: "padding-bottom" }
  ]}
  isExpandable={true}
  dividerTitle="Padding"
  styles={{ marginBottom: "16px" }}
/>
```

## Example

```tsx
<Group
  properties={[
    { property: "background-color" },
    { property: "border-radius" }
  ]}
  hidden={false}
  isExpandable={false}
  dividerTitle="Background"
  styles={{}}
/>
```

## How it Works

- If `hidden` is `true`, the group is not rendered.
- If `isExpandable` is `true`, the group is wrapped in an `DividerReveal` component, allowing it to be expanded or collapsed.
- If `dividerTitle` is provided, a `HorizontalDivider` with the title is rendered above the group.
- Each property in the `properties` array is rendered using the `Property` component.
- The group container uses a CSS module for styling and accepts custom styles via the `styles` prop.
- The component is memoized with `React.memo` for performance.

## See Also

- [Category Component](./category.md)
- [Property Component](../property/components.md)