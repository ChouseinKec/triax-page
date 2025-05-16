# Triax Page-Builder

Triax is a modular page builder built with **Next.js**, **React**, and **Zustand**, focused on clean abstractions and real-world CSS logic. Each block behaves like a real HTML element with cascading styles, rich inputs, and eventual behavior support.

- Structure (HTML) - Semantic blocks with clean output
- Style (CSS) - Visual controls with raw code access
- Logic (JS) - Behavior triggers with zero boilerplate

## 🎨 Style Editor (Under Active Development) [Hooks](editors/style/hooks/), [Store](stores/style/), [Properties & Lengths](editors/style/constants/)

Cascading CSS-like structure for every block:

- Based on device, orientation, and pseudo-class (e.g., `hover`, `active`)
- Fully dynamic input system supporting:
  - **Scalable values**: `10px`, `50%`, `1.5rem`
  - **Keyword values**: `auto`, `min-content`, `max-content` (property-specific)
  - **CSS variables**: `var(--font-size-sm)`
  - **Functions**: `fit-content(10px)`, `repeat(2, var(--gap))`, nested functions
- **Property validation**:
  - Defined syntax map per function/property
  - Validates structure like `function(length, length)`
- **GUI-based editor**: buttons, inputs, dropdowns, etc.

---

## 🧩 Block Editor (Under Active Development) [Hooks](editors/block/hooks/), [Store](stores/block/)

Mimics HTML5 standards with strict hierarchy, attributes, and content rules for every element.

---

## 🧪 Testing

- Using **Jest** for utility-level testing (e.g., value validation and parsing)
- Component testing will be added as UI stabilizes

---

## 🛠️ How to Run It Locally

- **(1)** **Clone the repo**

   ```bash
   git clone https://github.com/ChouseinKec/triax-page.git
   ```

- **(2)** **Go to folder**

  ```bash
   cd triax-page
   ```

- **(3)** **Install dependencies**

   ```bash
   npm install
   ```

- **(4)** **Run the development server**

   ```bash
   npm run dev
   ```

- **(5)** **Open <http://localhost:3000> in your browser.**

---

## 🧰 Stack

- **Framework**: Next.js
- **UI**: React
- **State**: Zustand
- **Testing**: Jest
- **Styling**: Vanilla CSS Modules
- **Validation Logic**: Custom parser using structured syntax definitions
