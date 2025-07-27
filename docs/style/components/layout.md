# Layout Component

The `Layout` component is responsible for rendering the overall layout of grouped style property editors within the style editor. It typically organizes multiple `Category` components, each of which contains one or more property groups.

## What is Layout?

- `Layout` is a React functional component that serves as a container for style editor categories.
- It receives an array of category definitions and renders each one using the `Category` component.
- This structure allows for modular, organized, and easily navigable style editing interfaces.

## Typical Props

| Prop         | Type               | Description                                         |
|--------------|--------------------|-----------------------------------------------------|
| `categories` | `LayoutCategory[]` | Array of category objects to render in the layout.  |

## Usage

```tsx
import Layout from "@/editors/style/components/layout/component";

<Layout categories={categoriesArray} />
```

## Example

```tsx
<Layout
  categories={[
    {
      groups: [
        {
          properties: ["padding-top", "padding-bottom"],
          dividerTitle: "Padding",
          isExpandable: true,
        },
        {
          properties: ["margin-top", "margin-bottom"],
          dividerTitle: "Margin",
          isExpandable: false,
        }
      ]
    },
    {
      groups: [
        {
          properties: ["background-color"],
          dividerTitle: "Background",
        }
      ]
    }
  ]}
/>
```

## How it Works

- The `Layout` component maps through the `categories` array and renders a `Category` component for each category.
- Each `Category` then renders its own groups of style properties.
- This approach enables a flexible and scalable UI for editing complex sets of CSS properties.

## See Also

- [Category Component](./category.md)
- [Group Component](./group.md)