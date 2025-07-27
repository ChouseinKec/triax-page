# Property Component

The `Property` component is responsible for rendering an individual style property input field within a group in the style editor. It provides a label, a user input component (such as an input or dropdown), and contextual actions like copy, paste, and reset for the property value.

## What is Property?

- `Property` is a React functional component that receives props describing the property to render, its label, visibility, and custom styles.
- It displays the property label, a tooltip with the property name and description, and action buttons for copying, pasting, and resetting the property value.
- The actual input or editor for the property is passed as a `component` prop and rendered inside the property container.

## Props

| Prop         | Type                | Default      | Description                                               |
|--------------|---------------------|--------------|-----------------------------------------------------------|
| `component`  | `() => ReactNode`   | **required** | The input or editor component to render for the property.  |
| `label`      | `string \| null`    | `null`       | The label to display for the property.                    |
| `hidden`     | `boolean`           | `false`      | If `true`, the property is not rendered.                  |
| `disabled`   | `boolean`           | `false`      | If `true`, disables the property input.                   |
| `property`   | `string`            | **required** | The property key (used for actions and tooltips).         |
| `styles`     | `object`            | `{}`         | Custom styles for the property container.                 |

## Usage

```tsx
import Property from "@/editors/style/components/property/components";

<Property
  property="background-color"
  label="Background Color"
  component={() => <input type="color" />}
  styles={{ marginBottom: "8px" }}
/>
```

## Example

```tsx
<Property
  property="font-size"
  label="Font Size"
  component={() => <input type="number" />}
  hidden={false}
  disabled={false}
  styles={{}}
/>
```

## How it Works

- If `hidden` is `true`, the property is not rendered.
- The property label is displayed, and hovering over it shows a tooltip with the property name and description.
- Action buttons allow the user to:
  - **Copy** the property value to the clipboard.
  - **Paste** a value from the clipboard into the property.
  - **Reset** the property value to its default (empty) state.
- The actual property editor (input, dropdown, etc.) is rendered by calling the `component` prop.
- The component uses a CSS module for styling and is memoized with `React.memo` for performance.

## See Also

- [Group Component](../group.md)