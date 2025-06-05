# Project Best Practices

## Lazy Evaluation with Getters for Computed Properties

When defining objects with properties that are expensive to compute, depend on other modules, or may not always be needed, use JavaScript/TypeScript getters (`get ...`) to implement **lazy evaluation** and **caching**. This is especially important for properties like `syntax-expanded` and `syntax-parsed` in CSS property and data type definitions.

### Why Use Getters?
- **Avoids module initialization errors:** Defers computation until all modules are loaded, preventing issues with import order or circular dependencies.
- **Performance:** Expensive computations are only performed if/when the property is accessed.
- **Caching:** The result is stored after the first computation, so future accesses are fast.
- **Consistency:** This pattern is widely used and respected in professional TypeScript/JavaScript codebases.

### Example Pattern
```ts
const createProperty = (name, syntax, description, category) => {
  let _expanded;
  let _parsed;
  return {
    name,
    description,
    category,
    'syntax-raw': syntax,
    get 'syntax-expanded'() {
      if (_expanded === undefined) _expanded = expandDataTypes(syntax);
      return _expanded!;
    },
    get 'syntax-parsed'() {
      if (_parsed === undefined) _parsed = parse(this['syntax-expanded']!);
      return _parsed;
    },
  };
};
```

### When to Use
- Any property that is expensive to compute or depends on other modules/utilities.
- Properties that may not always be needed (avoid unnecessary work at startup).
- When you want to avoid problems with module load order or circular dependencies.

---

## Other Best Practices

- Keep all documentation in the `docs/` folder for easy discovery.
- Use clear, descriptive names for all files, types, and functions.
- Add JSDoc comments to all major types, constants, and helpers.
- Avoid logging expected input validation failures in low-level utilities.
- Use lookup tables for CSS syntax, data types, and units to enable robust parsing and validation.

