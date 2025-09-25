# Category Component

The `Category` component is responsible for rendering a list of property groups within a style editor category layout. Each group represents a set of related style properties and can be configured for visibility, expandability, divider titles, and custom styles.

## What is Category?

- `Category` is a React functional component that receives an array of layout groups and renders each group using the `Group` component.
- It is used to organize style properties into logical sections within the style editor, improving clarity and usability.

## Props

| Prop     | Type            | Description                                 |
|----------|-----------------|---------------------------------------------|
| `groups` | `LayoutGroup[]` | The array of groups to render in the category. |

## Usage

```tsx
import Category from "@/modules/editors/style/components/category/component";

<Category groups={groupsArray} />
```

## Example

```tsx
<Category
  groups={[
    {
      properties: ["margin-top", "margin-bottom"],
      hidden: false,
      isExpandable: true,
      dividerTitle: "Spacing",
      styles: { marginBottom: "16px" }
    },
    {
      properties: ["background-color"],
      hidden: false,
      isExpandable: false,
      dividerTitle: "Background",
      styles: {}
    }
  ]}
/>
```

## How it Works

- The component maps through the `groups` array and renders a `Group` component for each group.
- Each `Group` receives its properties, visibility, expandability, divider title, and custom styles as props.
- The component is memoized for performance using `React.memo`.

## See Also

- [Group Component](./group.md)
