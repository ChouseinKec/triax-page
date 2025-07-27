# Triax Page Builder

![version](https://img.shields.io/badge/version-0.4.1-blue) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?logo=google-chrome&logoColor=white)](https://demo.chouseinkechagia.com/)


> 🚀 **Extensible page builder for React**

![Triax Page Builder Screenshot](screenshot.png)

Triax is an extensible page builder for React, designed to provide a complete visual editing experience—including a block editor, style editor, and logic editor. The current focus is on the advanced style editor and foundational block editor, with a roadmap toward a full-featured, production-ready builder.

---

## 🖼️ Application Layout

Triax uses a **panel-based layout**. Each panel is responsible for a specific part of the editing experience, and components can assign their own controls or even their own sections.

**Main Panels:**
- **Blocks Panel:** Add new blocks to the page. Provides a searchable, categorized list of all available blocks.
- **Inspector Panel:** Manage block settings, including attributes and style values. Edit the details of the selected block.
- **Action Panel:** Each block can register its own controls here (e.g., order, rename, or any block-specific actions). This panel is context-aware and adapts to the selected block.

**Panel Layout Features:**
- Each panel can be **dragged** and **resized** from any corner or side.
- Panels can be **locked in place** to prevent accidental movement or resizing.
- *(Planned)* Ability to **save and load custom layouts**, enabling users to create and switch between personalized workspace arrangements.

This modular and flexible panel system makes the editor highly extensible and customizable for different workflows and plugins.

---

## ✨ Features

### 🧩 Block Editor

- **Plugin Support:** All blocks are registered in a central `BlocksRegistry`, allowing plugins to register their own custom blocks.
- **Current Blocks:** Includes container and text blocks.
- **Upcoming Blocks:** Future support for input, button, rich-text, and more.
- **Block Nesting:** Blocks can be nested to create complex layouts.
- **Add/Delete Blocks:** Easily add or delete blocks in the editor.
- **Block-Level Controls:** Each block can add its own actions to the BlockActionPanel.
- **Ordering & Drag-and-Drop:** (Planned) Reordering and drag-and-drop support for blocks.
- **Extensible Block Registry:** Register custom block types and definitions via plugins.

### 🎨 Style Editor

- **Slot-based CSS Value Editor:** Incremental, context-aware editing for complex CSS value patterns.
- **Token System:** All CSS data types, keywords, and functions are represented as tokens for robust parsing and validation.
- **Lazy Evaluation:** Syntax parsing and expansion are performed on-demand for performance and circular dependency safety.
- **Comprehensive Lookup Tables:** Centralized definitions for CSS properties, tokens, and units.
- **Robust Parsing & Validation:** All value editing is validated against the CSS spec, with error feedback.
- **Device, Orientation, and Pseudo Selection:** Style editor supports device-specific, orientation-specific, and pseudo-class styling and selection for advanced responsive and stateful layouts.
- **Componentized Value Editors:** Modular editors for color, dimension, keyword, function, and more.

### ⚙️ Logic Editor

- **Visual Logic and Workflow Editor:** (Planned) Compose conditional logic, event handling, and data flow visually.
- **Roadmap:** Integrate logic with blocks and styles for dynamic, interactive pages.

---

## 📚 Documentation Structure

All documentation is in the [`docs/`](docs/) folder. Key topics are organized by editor and component:

### Block Editor

- [`editor.md`](docs/block/editor.md): Overview of the block editor system and its architecture.
- [`store.md`](docs/block/store.md): Zustand store for block state management.
- [`hook.md`](docs/block/hook.md): Block manager hook for actions and selectors.
- [`components/blocks.md`](docs/block/components/blocks.md): Renders all root blocks in the editor.
- [`components/block.md`](docs/block/components/block.md): Renders a single block instance.
- [`components/block-list.md`](docs/block/components/block-list.md): Searchable, categorized block list panel.

### Style Editor

- [`editor.md`](docs/style/editor.md): Overview of the style editor, slot-based value editing, and context.
- [`hooks/manager.md`](docs/style/hooks/manager.md): Style manager hook for getting, setting, copying, and resetting styles.
- [`hooks/factory.md`](docs/style/hooks/factory.md): Factory hook for rendering style-related UI components.
- [`components/layout.md`](docs/style/components/layout.md): Layout container for style editor categories.
- [`components/category.md`](docs/style/components/category.md): Renders a list of property groups.
- [`components/group.md`](docs/style/components/group.md): Renders a grid of property editors.
- [`components/property.md`](docs/style/components/property.md): Renders an individual property editor with actions.
- [`components/value.md`](docs/style/components/value.md): Modular editors for all CSS value types (dimension, color, keyword, function, etc.).

### Page Context

- [`store.md`](docs/page/store.md): Zustand store for page-level device, orientation, and pseudo-state.
- [`hooks/manager.md`](docs/page/hooks/manager.md): Page manager hook for device context.
- [`hooks/factory.md`](docs/page/hooks/factory.md): Factory hook for rendering page-level UI controls (e.g., device selector).

---

## 🧪 Testing

All tests are located in the [`tests/`](tests/) folder.

- **Utility tests:** [`tests/utilities/`](tests/utilities/)
- **Component tests:** Will be written when the UI is stabilized

---

## 🚀 Getting Started

1. **Download the repository:**  
   ```sh
   git clone https://github.com/ChouseinKec/triax-page.git
   ```

2. **Navigate to the project directory:**  
   ```sh
   cd triax-page
   ```

3. **Install dependencies:**  
   ```sh
   npm install
   ```

4. **Run the development server:**  
   ```sh
   npm run dev
   ```

5. **Run tests:**  
   ```sh
   npm test
   ```

---

## 📝 License

MIT License

Copyright (c) 2025 Chousein Kechagia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
