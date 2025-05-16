# 🎨 Supported Style Properties

## 🧩 Property Reference

| **Category**           | **Property**                                                                               | [Scalable Units](#scalable-units) | [Keywords](#keywords)                                                   | [Functions](#functions)                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Display**            | display                                                                                    |                                   | block, flex, grid, none                                                 |                                                                                                         |
|                        | flexDirection                                                                              |                                   | row, column, row-reverse, column-reverse                                |                                                                                                         |
|                        | flexWrap                                                                                   |                                   | wrap, nowrap, wrap-reverse                                              |                                                                                                         |
|                        | justifyItems                                                                               |                                   | start, center, end, stretch                                             |                                                                                                         |
|                        | justifyContent                                                                             |                                   | flex-start, center, flex-end, space-between, space-evenly, space-around |                                                                                                         |
|                        | alignItems                                                                                 |                                   | flex-start, center, flex-end, stretch, baseline                         |                                                                                                         |
|                        | alignContent                                                                               |                                   | flex-start, center, flex-end, space-between, space-evenly, stretch      |                                                                                                         |
|                        | gridAutoFlow                                                                               |                                   | row, column, row dense, column dense                                    |                                                                                                         |
|                        | gridTemplateColumns                                                                        | ✓                                 | auto, min-content, max-content, fit-content, subgrid, masonry           | min(), max(), clamp(), calc(), minmax(), fit-content(), repeat()                                        |
|                        | gridTemplateRows                                                                           | ✓                                 | auto, min-content, max-content, fit-content, subgrid, masonry           | min(), max(), clamp(), calc(), minmax(), fit-content(), repeat()                                        |
|                        | gridAutoColumns                                                                            | ✓                                 | auto, min-content, max-content, fit-content                             | min(), max(), clamp(), calc(), minmax(), fit-content()                                                  |
|                        | gridAutoRows                                                                               | ✓                                 | auto, min-content, max-content, fit-content                             | min(), max(), clamp(), calc(), minmax(), fit-content()                                                  |
|                        | rowGap, columnGap                                                                          | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
| **Size & Overflow**    | width, height                                                                              | ✓                                 | auto, min-content, max-content, fit-content                             | min(), max(), clamp(), calc()                                                                           |
|                        | minWidth, minHeight                                                                        | ✓                                 | auto, min-content, max-content, fit-content                             | min(), max(), clamp(), calc()                                                                           |
|                        | maxWidth, maxHeight                                                                        | ✓                                 | auto, min-content, max-content, fit-content                             | min(), max(), clamp(), calc()                                                                           |
|                        | overflow                                                                                   |                                   | visible, hidden, scroll, auto                                           |                                                                                                         |
|                        | objectFit                                                                                  |                                   | fill, contain, cover, scale-down, none                                  |                                                                                                         |
|                        | boxSizing                                                                                  |                                   | border-box, content-box                                                 |                                                                                                         |
|                        | aspectRatio                                                                                |                                   |                                                                         | number, number/number                                                                                   |
| **Position & Spacing** | position                                                                                   |                                   | static, relative, absolute, fixed, sticky                               |                                                                                                         |
|                        | top, right, bottom, left                                                                   | ✓                                 | auto                                                                    | min(), max(), clamp(), calc()                                                                           |
|                        | paddingTop, paddingRight, paddingBottom, paddingLeft                                       | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | marginTop, marginRight, marginBottom, marginLeft                                           | ✓                                 | auto                                                                    | min(), max(), clamp(), calc()                                                                           |
|                        | float                                                                                      |                                   | none, left, right                                                       |                                                                                                         |
|                        | clear                                                                                      |                                   | none, left, right, both                                                 |                                                                                                         |
|                        | transform                                                                                  | ✓                                 |                                                                         | translateX(), translateY(), translateZ(), rotateX(), rotateY(), rotateZ(), scaleX(), scaleY(), scaleZ() |
| **Font & Text**        | fontFamily                                                                                 |                                   | Arial, "Times New Roman", "Courier New"                                 |                                                                                                         |
|                        | fontWeight                                                                                 |                                   | 100–900                                                                 |                                                                                                         |
|                        | fontSize, lineHeight                                                                       | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | color, strokeColor                                                                         |                                   | (color value)                                                           |                                                                                                         |
|                        | textShadow                                                                                 | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | letterSpacing, textIndent                                                                  | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | strokeWidth                                                                                | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | textAlign                                                                                  |                                   | left, center, right, justify                                            |                                                                                                         |
|                        | fontStyle                                                                                  |                                   | normal, italic                                                          |                                                                                                         |
|                        | direction                                                                                  |                                   | ltr, rtl                                                                |                                                                                                         |
|                        | textTransform                                                                              |                                   | none, uppercase, lowercase, capitalize                                  |                                                                                                         |
|                        | textDecorationLine                                                                         |                                   | none, line-through, underline, overline                                 |                                                                                                         |
|                        | textDecorationStyle                                                                        |                                   | solid, dotted, dashed                                                   |                                                                                                         |
|                        | textDecorationColor                                                                        |                                   | (color value)                                                           |                                                                                                         |
|                        | textDecorationThickness                                                                    | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | wordBreak                                                                                  |                                   | normal, break-all, keep-all                                             |                                                                                                         |
|                        | lineBreak                                                                                  |                                   | auto, loose, normal, strict                                             |                                                                                                         |
|                        | whiteSpace                                                                                 |                                   | normal, nowrap, pre, pre-wrap, pre-line, break-spaces                   |                                                                                                         |
|                        | textOverflow                                                                               |                                   | clip, ellipsis                                                          |                                                                                                         |
|                        | writingMode                                                                                |                                   | horizontal-tb, vertical-rl, vertical-lr                                 |                                                                                                         |
|                        | textOrientation                                                                            |                                   | mixed, upright, sideways                                                |                                                                                                         |
|                        | columnWidth                                                                                | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | columnRuleWidth                                                                            | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | columnRuleStyle                                                                            |                                   | dotted, dashed, solid                                                   |                                                                                                         |
|                        | columnRuleColor                                                                            |                                   | (color value)                                                           |                                                                                                         |
|                        | breakBefore, breakInside, breakAfter                                                       |                                   | auto, avoid, always, column                                             |                                                                                                         |
|                        | columnSpan                                                                                 |                                   | none, all                                                               |                                                                                                         |
|                        | columnFill                                                                                 |                                   | auto, balance, balance-all                                              |                                                                                                         |
|                        | widows, orphans                                                                            | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
| **Border & Shadow**    | borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth                       | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle                       |                                   | none, solid, dashed, dotted                                             |                                                                                                         |
|                        | borderTopColor, borderRightColor, borderBottomColor, borderLeftColor                       |                                   | (color value)                                                           |                                                                                                         |
|                        | borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | boxShadow                                                                                  | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |
|                        | outlineColor                                                                               |                                   | (color value)                                                           |                                                                                                         |
|                        | outlineStyle                                                                               |                                   | none, solid, dotted, dashed                                             |                                                                                                         |
|                        | outlineWidth                                                                               | ✓                                 |                                                                         | min(), max(), clamp(), calc()                                                                           |

---

## 📏 Scalable Units

| Unit | Description                 |
| ---- | --------------------------- |
| px   | Pixels                      |
| %    | Percentage                  |
| em   | Relative to font-size       |
| rem  | Relative to root font-size  |
| ch   | Width of the "0" character  |
| vw   | Viewport width              |
| vh   | Viewport height             |
| vmin | Smaller of vw and vh        |
| vmax | Larger of vw and vh         |
| fr   | Fractional unit (grid only) |

---

## 📐 Angle Units

| Unit | Description |
| ---- | ----------- |
| deg  | Degrees     |
| rad  | Radians     |
| turn | Turns       |
| grad | Gradians    |

---

## 🔡 Keywords

Common universal keywords:

- `auto`
- `min-content`, `max-content`, `fit-content`
- `subgrid`, `masonry`
- `initial`, `inherit`, `unset`, `revert`, `revert-layer`

---

## 🧮 Math Functions

| Function  | Accepted Values                                      |
| --------- | ---------------------------------------------------- |
| `min()`   | [Scalable Units](#scalable-units), `var()`           |
| `max()`   | [Scalable Units](#scalable-units), `var()`           |
| `clamp()` | min, preferred, max values (`min()`, `max()`, units) |
| `calc()`  | Any combinable units (e.g., `100% - 10px`)           |

---

## 🧱 Grid Functions

| Function        | Accepted Values                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `minmax()`      | [Scalable Units](#scalable-units), `min-content`, `max-content`, `auto`, `min()`, `max()`, `clamp()`, `calc()`, `var()` |
| `fit-content()` | [Scalable Units](#scalable-units)                                                                                       |
| `repeat()`      | Numeric or `auto-fill`, `auto-fit` + value(s)                                                                           |

---

## 🎯 Transform Functions

| Function       | Accepted Units                             |
| -------------- | ------------------------------------------ |
| `translateX()` | [Scalable Units](#scalable-units), `var()` |
| `translateY()` | [Scalable Units](#scalable-units), `var()` |
| `translateZ()` | [Scalable Units](#scalable-units), `var()` |
| `rotateX()`    | [Angle Units](#angle-units), `var()`       |
| `rotateY()`    | [Angle Units](#angle-units), `var()`       |
| `rotateZ()`    | [Angle Units](#angle-units), `var()`       |
| `scaleX()`     | number (e.g. 1, 1.2)                       |
| `scaleY()`     | number                                     |
| `scaleZ()`     | number                                     |
