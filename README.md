# Triax Page Builder

![version](https://img.shields.io/badge/version-0.2.0-blue)

> 🚀 **Ambitious, extensible page builder for React**

Triax Page is an ambitious, extensible page builder for React, designed to provide a complete visual editing experience—including a block editor, style editor, and logic editor. While the long-term goal is a full-featured page builder, the current focus is on the advanced style editor and foundational block editor.

---

## ✨ Features

### 🧩 Block Editor

- 🏗️ Block-based layout system (planned for future releases)
- ⚡ Initial implementation for managing block structure and state
- 🗂️ Roadmap: drag-and-drop, nesting, and block-level controls

### 🎨 Style Editor

- 🎛️ **Slot-based CSS Value Editor:** Incremental, context-aware editing for complex CSS value patterns
- 🏷️ **Token System:** All CSS data types, keywords, and functions are represented as tokens for robust parsing and validation
- 💤 **Lazy Evaluation:** Syntax parsing and expansion are performed on-demand for performance and circular dependency safety
- 📚 **Comprehensive Lookup Tables:** Centralized definitions for CSS properties, tokens, and units
- 🧪 Robust parsing, validation, and UI generation
- 📱 **Device, Orientation, and Pseudo Selection:** Style editor supports device-specific, orientation-specific, and pseudo-class styling and selection for advanced responsive and stateful layouts.

### ⚙️ Logic Editor

- 🧠 Visual logic and workflow editor (planned for future releases)
- 🛣️ Roadmap: conditional logic, event handling, and data flow

---

## 📚 Documentation

All documentation is in the [`docs/`](docs/) folder. Key topics are organized by editor:

### 🧩 Block Editor

- (Coming soon)

### 🎨 Style Editor

**Constants:**
- [`property.md`](docs/style/constants/property.md): CSS property definitions, structure, and usage
- [`token.md`](docs/style/constants/token.md): Token system (formerly "data types"), canonical forms, and usage
- [`unit.md`](docs/style/constants/unit.md): Supported CSS units, categories, and metadata
- [`value.md`](docs/style/constants/value.md): Value parsing, slotting, and editor logic
- [`parse.md`](docs/style/constants/parse.md): CSS value definition syntax parsing, combinators, and multipliers

**Utilities:**
- [`dimension.md`](docs/style/utilities/dimension.md): Dimension parsing and validation helpers
- [`function.md`](docs/style/utilities/function.md): CSS function parsing helpers
- [`option.md`](docs/style/utilities/option.md): Option parsing and normalization helpers
- [`parse.md`](docs/style/utilities/parse.md): Main parser for CSS value definition syntax, combinators, and multipliers
- [`token.md`](docs/style/utilities/token.md): Token helpers for type checks, canonicalization, and conversion
- [`value.md`](docs/style/utilities/value.md): Value parsing, slotting, and normalization helpers

### ⚙️ Logic Editor

- (Coming soon)

---

## 🧪 Testing

All tests are located in the [`tests/`](tests/) folder.

- **Style tests:**
  - Located in [`tests/style/`](tests/style/)
  - Currently includes: `parse.test.ts`
- **Global utility tests:**
  - Located in [`tests/`](tests/)
  - Currently includes: `array.test.ts`, `string.test.ts`
- **Component tests:**
  - Will be written when the UI is stabilized

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
